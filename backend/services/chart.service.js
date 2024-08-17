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

async function getCustomerLineChartData() {
  // get the customer count for the last 28 days in a 4 day gap, so 7 data points. and also the total customer count, in the form of an array of objects like this: {"total customers": 100, data: [{date: "2021-09-01", count: 10}, {date: "2021-09-05", count: 20}, {date: "2021-09-09", count: 30}, {date: "2021-09-13", count: 40}, {date: "2021-09-17", count: 50}, {date: "2021-09-21", count: 60}, {date: "2021-09-25", count: 70}]}

  const currentDate = new Date(
    new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" })
  );

  const result = [];
  let totalCustomers = 0;
  let totalVehicles = 0;
  let totalOrders = 0;
  let totalEmployees = 0;

  const startDateBefore30Days = new Date(currentDate);
  startDateBefore30Days.setDate(startDateBefore30Days.getDate() - 30);

  for (let i = 28; i >= 0; i -= 4) {
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

    const employeeQuery = `
        SELECT COUNT(employee_id) AS totalEmployees
        FROM employee
        WHERE DATE(added_date) <= ?;

      `;

    let employees = await db.query(employeeQuery, params);

    result.push({
      date: currentDate.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
      }),
      "Total customers": parseInt(customers[0].totalCustomers),
      "Total vehicles": parseInt(vehicles[0].totalVehicles),
      "Total orders": parseInt(orders[0].totalOrders),
      "Total employees": parseInt(employees[0].totalEmployees),
    });
  }

  function getPercentChange(oldNumber, newNumber) {
    if (oldNumber === 0) return 100 * newNumber;
    var decreaseValue = oldNumber - newNumber;

    return (decreaseValue / oldNumber) * 100;
  }

  return {
    totalCustomers: result[7]["Total customers"],
    customerPercent: getPercentChange(
      parseInt(result[0]["Total customers"]),
      parseInt(result[7]["Total customers"])
    ),
    totalVehicles: result[7]["Total vehicles"],
    vehiclePercent: getPercentChange(
      parseInt(result[0]["Total vehicles"]),
      parseInt(result[7]["Total vehicles"])
    ),
    totalOrders: result[7]["Total orders"],
    orderPercent: getPercentChange(
      parseInt(result[0]["Total orders"]),
      parseInt(result[7]["Total orders"])
    ),
    totalEmployees: result[7]["Total employees"],
    employeePercent: getPercentChange(
      parseInt(result[0]["Total employees"]),
      parseInt(result[7]["Total employees"])
    ),
    data: result,
  };
}

module.exports = {
  getCustomerLineChartData,
  getBarChartData,
  getCustomerAreaChartData,
  getOrderRadarChartData,
  getOrderPieChartData,
};
