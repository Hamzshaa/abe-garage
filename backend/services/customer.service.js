// Import the database configuration
const db = require("../config/db.config");

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

/**
 * Create a new customer.
 * @param {object} customer - The customer data to create.
 * @returns {object|boolean} - The new customer ID if successful, false otherwise.
 */
async function createCustomer(customer) {
	try {
		const query =
			"INSERT INTO customer_identifier (customer_email, customer_phone_number) VALUES (?, ?)";
		const result = await db.query(query, [
			customer.customer_email,
			customer.customer_phone_number,
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

/**
 * Retrieve all customers.
 * @returns {Array} - An array of all customers.
 */
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

/**
 * Retrieve a customer by their ID.
 * @param {number} customerId - The ID of the customer to retrieve.
 * @returns {object|null} - The customer data if found, null otherwise.
 */
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

/**
 * Update a customer by their ID.
 * @param {number} customerId - The ID of the customer to update.
 * @param {object} updatedData - The updated customer data.
 * @returns {boolean} - True if the update was successful, false otherwise.
 */
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
  let connection;

  try {
    // Get a connection from the pool
    connection = await db.getConnection();

    // Begin transaction
    await connection.beginTransaction();

    // Delete from customer_info table
    const deleteCustomerInfoQuery = "DELETE FROM customer_info WHERE customer_id = ?";
    const [result1] = await connection.query(deleteCustomerInfoQuery, [customerId]);

    if (result1.affectedRows !== 1) {
      await connection.rollback();
      return false;
    }

    // Delete from customer_identifier table
    const deleteCustomerIdentifierQuery = "DELETE FROM customer_identifier WHERE customer_id = ?";
    const [result2] = await connection.query(deleteCustomerIdentifierQuery, [customerId]);

    if (result2.affectedRows !== 1) {
      await connection.rollback();
      return false;
    }

    // Commit transaction
    await connection.commit();
    return true;
  } catch (err) {
    if (connection) await connection.rollback();
    console.error("Error in deleteCustomer service:", err);
    throw err;
  } finally {
    if (connection) connection.release();
  }
}



// Export the service functions to be used in controllers
module.exports = {
	checkIfCustomerExists,
	createCustomer,
	getAllCustomers,
	getCustomerById,
	updateCustomer,
	deleteCustomer, // Add this line to export the deleteCustomer function
};
