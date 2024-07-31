// Import the query function from the db.config.js file
const conn = require("../config/db.config");
// Import the bcrypt module
const bcrypt = require("bcrypt");
// A function to check if employee exists in the database
async function getAllServices() {
  const query =
    "SELECT service_id, service_name, service_description FROM common_services WHERE active = 1";
  const rows = await conn.query(query);
  return rows;
}
async function getServiceById(serviceId) {
  const query =
    "SELECT service_id, service_name, service_description FROM common_services WHERE service_id = ? AND active = 1";
  const rows = await conn.query(query, [serviceId]);
  return rows;
}
async function createService(service) {
  try {
    const query =
      "INSERT INTO common_services (service_name, service_description, active) VALUES (?, ?, ?)";
    const result = await conn.query(query, [
      service.service_name,
      service.service_description,
      1,
    ]);
    console.log("Query result:", result);
    return result.insertId;
  } catch (error) {
    console.error("Error creating service:", error);
    throw error; // Re-throw the error after logging it
  }
}

async function updateService(serviceId, serviceName, serviceDescription) {
  const query =
    "UPDATE common_services SET service_name = ?, service_description = ? WHERE service_id = ? AND active = 1";
  const result = await conn.query(query, [
    serviceName,
    serviceDescription,
    serviceId,
  ]);
  return result;
}
async function deactivateService(serviceId) {
  const query = "UPDATE common_services SET active = 0 WHERE service_id = ?";
  const result = await conn.query(query, [serviceId]);
  return result;
}
module.exports = {
  getAllServices,
  createService,
  getServiceById,
  updateService,
  deactivateService,
};
