// Import the database configuration
const db = require("../config/db.config");

const crypto = require("crypto");

async function checkIfCustomerExists(email) {
  try {
    const query = "SELECT * FROM customer_identifier WHERE customer_email = ?";
    const rows = await db.query(query, [email]);
    return rows.length > 0;
  } catch (err) {
    console.error("Error in checkIfCustomerExists service:", err);
    throw err;
  }
}

async function createCustomer(customer) {
  const customer_hash = crypto.randomBytes(16).toString("hex").slice(0, 32);

  try {
    const query =
      "INSERT INTO customer_identifier (customer_email, customer_phone_number, customer_hash) VALUES (?, ?, ?)";
    const result = await db.query(query, [
      customer.customer_email,
      customer.customer_phone_number,
      customer_hash,
    ]);
    // If the insert into customer_identifier table failed, return false
    if (result.affectedRows !== 1) {
      return false;
    }
    const customerId = result.insertId;
    const query2 =
      "INSERT INTO customer_info (customer_id, customer_first_name, customer_last_name, active_customer_status) VALUES (?, ?, ?, ?)";
    await db.query(query2, [
      customerId,
      customer.customer_first_name,
      customer.customer_last_name,
      customer.active_customer_status,
    ]);

    return { customer_id: customerId };
  } catch (err) {
    console.error("Error in createCustomer service:", err);
    throw err;
  }
}

async function getAllCustomers() {
  try {
    const query =
      "SELECT * FROM customer_identifier INNER JOIN customer_info ON customer_identifier.customer_id = customer_info.customer_id ORDER BY customer_identifier.customer_added_date DESC";

    const rows = await db.query(query);
    return rows;
  } catch (err) {
    console.error("Error in getAllCustomers service:", err);
    throw err;
  }
}

async function getCustomerById(customerId) {
  try {
    const query =
      "SELECT * FROM customer_identifier INNER JOIN customer_info ON customer_identifier.customer_id = customer_info.customer_id WHERE customer_identifier.customer_id = ?";
    const rows = await db.query(query, [customerId]);
    return rows.length > 0 ? rows[0] : null;
  } catch (err) {
    console.error("Error in getCustomerById service:", err);
    throw err;
  }
}

async function updateCustomer(customerId, updatedData) {
  try {
    const query =
      "UPDATE customer_identifier SET customer_phone_number = ? WHERE customer_id = ?";
    const result = await db.query(query, [
      updatedData.phone_number,

      customerId,
    ]);
    // If the update in the customer_identifier table failed, return false
    if (result.affectedRows !== 1) {
      return false;
    }
    const query2 =
      "UPDATE customer_info SET customer_first_name = ?, customer_last_name = ? WHERE customer_id = ?";
    await db.query(query2, [
      updatedData.first_name,
      updatedData.last_name,
      customerId,
    ]);
    return true;
  } catch (err) {
    console.error("Error in updateCustomer service:", err);
    throw err;
  }
}

async function deleteCustomer(customerId) {
  try {
    const query = `
	UPDATE customer_info
	SET active_customer_status = 0
	WHERE customer_id = ?;
`;

    const result = await db.query(query, [customerId]);

    if (result.affectedRows !== 1) {
      return false;
    }

    return true;
  } catch (err) {
    console.log(err);
  }
}

// Export the service functions to be used in controllers
module.exports = {
  checkIfCustomerExists,
  createCustomer,
  getAllCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
};
