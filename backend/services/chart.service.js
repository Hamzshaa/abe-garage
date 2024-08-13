const db = require("../config/db.config");
const { get } = require("../routes/chart.routes");

async function getBarChartData() {
  const currentDate = new Date(
    new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" })
  );

  const startDateBefore30Days = new Date(currentDate);
  startDateBefore30Days.setDate(startDateBefore30Days.getDate() - 30);

  const customerQuery = `
            SELECT DATE_FORMAT(customer_added_date, '%Y-%m-%d') AS date,
                 COUNT(customer_id) AS count
            FROM customer_identifier
            WHERE DATE(customer_added_date) BETWEEN ? AND ?
            GROUP BY DATE(customer_added_date)
        `;

  const customerRows = await db.query(customerQuery, [
    startDateBefore30Days,
    currentDate,
  ]);

  const vehicleQuery = `
            SELECT DATE_FORMAT(vehicle_added_date, '%Y-%m-%d') AS date, 
                COUNT(vehicle_id) AS count

            FROM customer_vehicle_info
            WHERE DATE(vehicle_added_date) BETWEEN ? AND ?
            GROUP BY DATE(vehicle_added_date)
        `;
  const vehicleRows = await db.query(vehicleQuery, [
    startDateBefore30Days,
    currentDate,
  ]);

  const orderQuery = `
            SELECT DATE_FORMAT(order_date, '%Y-%m-%d') AS date,
                COUNT(order_id) AS count
            FROM orders 
            WHERE DATE(order_date) BETWEEN ? AND ?
            GROUP BY DATE(order_date)
        `;

  const orderRows = await db.query(orderQuery, [
    startDateBefore30Days,
    currentDate,
  ]);

  let data = [];

  let startingDate = new Date(startDateBefore30Days);

  while (startingDate <= currentDate) {
    const date = new Date(startingDate);
    const dateStr = date.toISOString().split("T")[0];
    const customers =
      customerRows.find((row) => row.date === dateStr)?.count || 0;
    const vehicles =
      vehicleRows.find((row) => row.date === dateStr)?.count || 0;
    const orders = orderRows.find((row) => row.date === dateStr)?.count || 0;
    data.push({
      date: date.toLocaleDateString("en-US", { month: "long", day: "numeric" }),
      customers,
      vehicles,
      orders,
    });
    startingDate.setDate(startingDate.getDate() + 1);
  }

  return data;
}

// async function getCustomerLineChartData() {
//   const currentDate = new Date(
//     new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" })
//   );

//   const startDateBefore30Days = new Date(currentDate);
//   startDateBefore30Days.setDate(startDateBefore30Days.getDate() - 30);

//   const query = `
//             SELECT DATE_FORMAT(customer_added_date, '%Y-%m-%d') AS date,
//                  COUNT(customer_id) AS count
//             FROM customer_identifier
//             WHERE DATE(customer_added_date) BETWEEN ? AND ?
//             GROUP BY DATE(customer_added_date)
//         `;

//   const rows = await db.query(query, [startDateBefore30Days, currentDate]);

//   let data = [];

//   let startingDate = new Date(startDateBefore30Days);

//   while (startingDate <= currentDate) {
//     const date = new Date(startingDate);
//     const dateStr = date.toISOString().split("T")[0];
//     const count = rows.find((row) => row.date === dateStr)?.count || 0;
//     data.push({
//       date: date.toLocaleDateString("en-US", { month: "long", day: "numeric" }),
//       count,
//     });
//     startingDate.setDate(startingDate.getDate() + 1);
//   }

//   return data;
// }

async function getCustomerAreaChartData() {
  const result = [];

  try {
    for (let i = 29; i >= 0; i--) {
      const currentDate = new Date();
      currentDate.setDate(currentDate.getDate() - i);

      const formattedDate = currentDate.toISOString().split("T")[0];

      const customerQuery = `
        SELECT COUNT(customer_id) AS totalCustomers
        FROM customer_identifier
        WHERE DATE(customer_added_date) <= ?;
      `;

      const params = [formattedDate];
      let customers = await db.query(customerQuery, params);

      const vehicleQuery = `
       SELECT COUNT(vehicle_id) AS totalVehicles
        FROM customer_vehicle_info
        WHERE DATE(vehicle_added_date) <= ?;
        `;

      let vehicles = await db.query(vehicleQuery, params);

      const orderQuery = `
        SELECT COUNT(order_id) AS totalOrders 
        FROM orders
        WHERE DATE(order_date) <= ?;
      `;

      let orders = await db.query(orderQuery, params);

      result.push({
        date: currentDate.toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
        }),
        "Total customers": parseInt(customers[0].totalCustomers),
        "Total vehicles": parseInt(vehicles[0].totalVehicles),
        "Total orders": parseInt(orders[0].totalOrders),
      });
    }
  } catch (err) {
    console.error(err);
  }

  return result;
}

async function getOrderRadarChartData() {
  // const query = `
  //     SELECT service_name,
  //           COUNT(order_id) AS total_orders
  //     FROM order_services
  //     INNER JOIN common_services
  //     ON order_services.service_id = common_services.service_id
  //     GROUP BY service_name;
  // `;

  // also add the completed and inprogress orders separately. so the output format will be like this: {service_name: "service_name", total_orders: 10, completed_orders: 5, inprogress_orders: 5}. if the service_completed is 1, then it is completed, if it is 0, then it is inprogress.
  // I want you not to sum service_completed, but to count the number of completed orders and inprogress orders. so the query will be like this: if service_completed is 1, then count for completed orders, if it is not 1, then count for inprogress orders. don't use sum, use count instead

  const query = `
      SELECT service_name,  
            COUNT(order_id) AS total_orders,
            COUNT(CASE WHEN service_completed = 1 THEN 1 END) AS completed_orders,
            COUNT(CASE WHEN service_completed != 1 THEN 1 END) AS inprogress_orders
      FROM order_services
      INNER JOIN common_services
      ON order_services.service_id = common_services.service_id
      GROUP BY service_name;
    `;

  const rows = await db.query(query);

  const data = rows.map((row, index) => {
    return {
      index: index + 1,
      service_name: row.service_name,
      total_orders: row.total_orders,
      completed_orders: row.completed_orders,
      inprogress_orders: row.inprogress_orders,
    };
  });

  return data;
}

async function getOrderPieChartData() {
  const query = `
      SELECT
          CASE
              WHEN order_status = 1 THEN 'Declined'
              WHEN order_status = 2 THEN 'Pending'
              WHEN order_status = 3 THEN 'completed'
          END AS status,
          COUNT(order_id) AS count
      FROM order_status
      GROUP BY order_status;
    `;
  const rows = await db.query(query);

  const data = rows.map((row) => {
    let color = "";
    switch (row.status) {
      case "Declined":
        color = "#ff0000";
        break;
      case "Pending":
        color = "#ffff00";
        break;
      case "completed":
        color = "#008000";
        break;
      default:
        color = "black";
    }

    return {
      status: row.status,
      count: row.count,
      color,
    };
  });

  return data;
}

module.exports = {
  // getCustomerLineChartData,
  getBarChartData,
  getCustomerAreaChartData,
  getOrderRadarChartData,
  getOrderPieChartData,
};
