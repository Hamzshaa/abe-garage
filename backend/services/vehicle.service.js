// Import db connection
const conn = require("../config/db.config");

// 1. A function to check if vehicle exists in the database
async function checkIfVehicleExists(vehicleData) {
	try {
		const query =
			"SELECT * FROM customer_vehicle_info WHERE vehicle_serial = ?";
		const [rows] = await conn.query(query, [vehicleData.vehicle_serial]);
		return rows.length > 0;
	} catch (error) {
		console.error("Error checking if vehicle exists:", error);
		throw error;
	}
}

// 2. A function to create a new vehicle by customer id
async function createVehicle(vehicleData) {
	try {
		const {
			customer_id,
			vehicle_year,
			vehicle_make,
			vehicle_model,
			vehicle_type,
			vehicle_mileage,
			vehicle_tag,
			vehicle_serial,
			vehicle_color,
		} = vehicleData;

		const query = `
			INSERT INTO customer_vehicle_info 
			(customer_id, vehicle_year, vehicle_make, vehicle_model, vehicle_type, vehicle_mileage, vehicle_tag, vehicle_serial, vehicle_color) 
			VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

		const [result] = await conn.query(query, [
			customer_id,
			vehicle_year,
			vehicle_make,
			vehicle_model,
			vehicle_type,
			vehicle_mileage,
			vehicle_tag,
			vehicle_serial,
			vehicle_color,
		]);

		return result.affectedRows === 1;
	} catch (error) {
		console.error("Error creating vehicle:", error);
		throw error;
	}
}

// 3. Function to retrieve all vehicles for a single customer
async function getAllVehicles(customerId) {
	try {
		const query = `
			SELECT * FROM customer_vehicle_info cvi
			INNER JOIN customer_identifier ci ON ci.customer_id = cvi.customer_id
			WHERE cvi.customer_id = ?`;

		const [results] = await conn.query(query, [customerId]);
		return results;
	} catch (error) {
		console.error("Error retrieving vehicles:", error);
		throw error;
	}
}

// 4. Function to get a vehicle by ID
async function getVehicleById(vehicle_id) {
	try {
		const query = "SELECT * FROM customer_vehicle_info WHERE vehicle_id = ?";
		const [rows] = await conn.query(query, [vehicle_id]);
		return rows[0];
	} catch (error) {
		console.error("Error getting vehicle by ID:", error);
		throw error;
	}
}

// 5. Function to delete a vehicle by its ID
async function deleteVehicle(vehicleId) {
	try {
		if (!vehicleId) {
			throw new Error("Vehicle ID must be provided");
		}

		const query = "DELETE FROM customer_vehicle_info WHERE vehicle_id = ?";
		const [result] = await conn.query(query, [vehicleId]);

		return result.affectedRows === 1;
	} catch (error) {
		console.error("Error deleting vehicle:", error);
		throw error;
	}
}

// 6. Function to edit a vehicle by its ID
async function editVehicleById(vehicleData) {
	try {
		const {
			vehicle_id,
			vehicle_year,
			vehicle_make,
			vehicle_model,
			vehicle_type,
			vehicle_mileage,
			vehicle_tag,
			vehicle_serial,
			vehicle_color,
		} = vehicleData;

		// Construct the SQL query dynamically
		const fields = [];
		const values = [];

		if (vehicle_year != null) {
			fields.push("vehicle_year = ?");
			values.push(vehicle_year);
		}
		if (vehicle_make != null) {
			fields.push("vehicle_make = ?");
			values.push(vehicle_make);
		}
		if (vehicle_model != null) {
			fields.push("vehicle_model = ?");
			values.push(vehicle_model);
		}
		if (vehicle_type != null) {
			fields.push("vehicle_type = ?");
			values.push(vehicle_type);
		}
		if (vehicle_mileage != null) {
			fields.push("vehicle_mileage = ?");
			values.push(vehicle_mileage);
		}
		if (vehicle_tag != null) {
			fields.push("vehicle_tag = ?");
			values.push(vehicle_tag);
		}
		if (vehicle_serial != null) {
			fields.push("vehicle_serial = ?");
			values.push(vehicle_serial);
		}
		if (vehicle_color != null) {
			fields.push("vehicle_color = ?");
			values.push(vehicle_color);
		}

		// Ensure we have fields to update
		if (fields.length === 0) {
			throw new Error("No fields to update");
		}

		const query = `
			UPDATE customer_vehicle_info 
			SET ${fields.join(", ")} 
			WHERE vehicle_id = ?`;

		values.push(vehicle_id);

		const [result] = await conn.query(query, values);

		return result.affectedRows === 1;
	} catch (error) {
		console.error("Error editing vehicle:", error);
		throw error;
	}
}

// Export the vehicle service
module.exports = {
	checkIfVehicleExists,
	createVehicle,
	getAllVehicles,
	getVehicleById,
	deleteVehicle,
	editVehicleById,
};
