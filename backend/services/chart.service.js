const db = require("../config/db.config");

async function getCustomerLineChartData() {
  const currentDate = new Date(
    new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" })
  );

  const startDateBefore30Days = new Date(currentDate);
  startDateBefore30Days.setDate(startDateBefore30Days.getDate() - 30);

  const query = `
            SELECT DATE_FORMAT(customer_added_date, '%Y-%m-%d') AS date,
                 COUNT(customer_id) AS count
            FROM customer_identifier
            WHERE DATE(customer_added_date) BETWEEN ? AND ?
            GROUP BY DATE(customer_added_date)
        `;

  const rows = await db.query(query, [startDateBefore30Days, currentDate]);

  let data = [];

  let startingDate = new Date(startDateBefore30Days);

  while (startingDate <= currentDate) {
    const date = new Date(startingDate);
    const dateStr = date.toISOString().split("T")[0];
    const count = rows.find((row) => row.date === dateStr)?.count || 0;
    data.push({
      date: date.toLocaleDateString("en-US", { month: "long", day: "numeric" }),
      count,
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

      result.push({
        date: currentDate.toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
        }),
        totalCustomers: parseInt(customers[0].totalCustomers),
        totalVehicles: parseInt(vehicles[0].totalVehicles),
      });
    }
  } catch (err) {
    console.error(err);
  }

  return result;
}

async function getOrderRadarChartData() {
  // order_services table has the order_service_id, order_id, service_id and common_services table containes the service_id and service_name, so we need to join these two tables to get the service name and count for each service, I want to know how many orders have been for each service

  // I want the data to be in the following format:
  //  const data = [
  //   {
  //     Service name: 'Math',
  //     completed: 120,
  //     on progress: 110,
  //     total orders: 150,
  //   },
  // ]

  const query = `
      SELECT service_name,
            COUNT(order_id) AS total_orders
      FROM order_services
      INNER JOIN common_services
      ON order_services.service_id = common_services.service_id
      GROUP BY service_name;
    `;

  const rows = await db.query(query);

  return rows;
}

module.exports = {
  getCustomerLineChartData,
  getCustomerAreaChartData,
  getOrderRadarChartData,
};
