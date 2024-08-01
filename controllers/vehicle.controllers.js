// Import the vehicle service
const vehicleService = require("../services/vehicle.service");

// 1. Create the add vehicle controller
const createVehicle = async (req, res, next) => {
	const vehicleData = req.body;
	try {
		// Check if vehicle exists
		const vehicleExists = await vehicleService.checkIfVehicleExists(
			vehicleData
		);

		// If vehicle exists, send a response to the client
		if (vehicleExists) {
			return res.status(400).json({
				error:
					"This vehicle registration number is already associated with another vehicle!",
			});
		}

		// Validate vehicle data
		if (!vehicleData) {
			return res.status(400).json({
				error: "Please provide vehicle details!",
			});
		}

		// Create the vehicle
		const vehicle = await vehicleService.createVehicle(vehicleData);
		if (!vehicle) {
			return res.status(400).json({
				error: "Failed to add the vehicle!",
			});
		}

		res.status(200).json({
			success: "Vehicle added successfully!",
			status: "true",
		});
	} catch (error) {
		console.error("Error creating vehicle:", error);
		res.status(500).json({
			error: "Something went wrong!",
		});
	}
};

// 2. Create the get all vehicles controller
async function getAllVehicles(req, res, next) {
	const customerId = req.params.customer_id;
	try {
		// Call the getAllVehicles method from the vehicle service
		const vehicles = await vehicleService.getAllVehicles(customerId);
		if (!vehicles) {
			return res.status(404).json({
				error: "No vehicles found for the provided customer ID!",
			});
		}

		// Success response
		res.status(200).json({
			status: "success",
			vehicles,
		});
	} catch (error) {
		console.error("Error retrieving vehicles:", error);
		res.status(500).json({
			error: "Something went wrong!",
		});
	}
}

// 3. Create the get vehicle by ID controller
async function getVehicleById(req, res, next) {
	const vehicleId = req.params.vehicle_id; // Using req.params.vehicle_id to get the vehicle_id from the route URL
	try {
		const vehicle = await vehicleService.getVehicleById(vehicleId);
		if (!vehicle || vehicle.length === 0) {
			return res.status(404).json({
				error: "Vehicle not found with the provided ID!",
			});
		}

		res.status(200).json({
			status: "success",
			vehicle,
		});
	} catch (error) {
		console.error("Error getting vehicle by ID:", error);
		res.status(500).json({
			error: "Something went wrong!",
		});
	}
}

// 4. Create the delete vehicle controller
async function deleteVehicle(req, res, next) {
	try {
		// Extract vehicle ID from request parameters
		const vehicleId = req.params.vehicle_id;

		// Call the service function to delete the vehicle
		const deleted = await vehicleService.deleteVehicle(vehicleId);

		// Check if the vehicle was deleted successfully
		if (!deleted) {
			return res
				.status(404)
				.json({ message: "No vehicle found with the provided ID." });
		}

		// Vehicle successfully deleted
		return res.status(200).json({ message: "Vehicle deleted successfully." });
	} catch (error) {
		console.error("Error deleting vehicle:", error);
		return res.status(500).json({ message: "Something went wrong!" });
	}
}

// 5. Create the edit vehicle controller
async function editVehicleById(req, res, next) {
	const vehicle = req.body;
	try {
		const updatedVehicle = await vehicleService.editVehicleById(vehicle);
		if (!updatedVehicle) {
			return res.status(400).json({
				error: "Failed to edit vehicle info!",
			});
		}

		res.status(200).json({
			message: "Vehicle data updated successfully",
			updatedVehicle,
		});
	} catch (error) {
		console.error("Error editing vehicle:", error);
		res.status(500).json({
			error: "Something went wrong!",
		});
	}
}

// Export the vehicle controllers
module.exports = {
	createVehicle, // 1
	getAllVehicles, // 2
	getVehicleById, // 3
	deleteVehicle, // 4
	editVehicleById, // 5
};
