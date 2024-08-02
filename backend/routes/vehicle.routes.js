// Import the express module
const express = require("express");
// Create a new router
const router = express.Router();
// Import authMiddleware
const authMiddleware = require("../middlewares/auth.middleware");
// Import the vehicle controller
const vehicleController = require("../controllers/vehicle.controllers");

// Route to add a new vehicle
router.post(
  "/api/vehicle",
  [authMiddleware.verifyToken, authMiddleware.isAdmin],
  vehicleController.createVehicle
);

// Route to get a vehicle by ID
router.get(
  "/api/vehicle/:vehicle_id",
  [authMiddleware.verifyToken, authMiddleware.isAdmin],
  vehicleController.getVehicleById
);

// Route to delete a vehicle by its ID
router.delete(
  "/api/vehicle/delete/:vehicle_id",
  [authMiddleware.verifyToken, authMiddleware.isAdmin],
  vehicleController.deleteVehicle
);

// Route to edit a vehicle by its ID
router.put(
  "/api/vehicle",
  [authMiddleware.verifyToken, authMiddleware.isAdmin],
  vehicleController.editVehicleById
);

// Route to get all vehicles by customer ID
router.get(
  "/api/vehicles/:customer_id",
  [authMiddleware.verifyToken, authMiddleware.isAdmin],
  vehicleController.getAllVehicles
);

module.exports = router;
