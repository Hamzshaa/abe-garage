// Import the express module
const express = require("express");
// Call the router method from express to create the router
const router = express.Router();
// Import the employee controller
const serviceController = require("../controllers/service.controllers");
// Import middleware
const authMiddleware = require("../middlewares/auth.middleware");
router.get(
  "/api/services",
  [authMiddleware.verifyToken, authMiddleware.isAdmin],
  serviceController.getAllServices
);
router.get(
  "/api/service/:id",
  [authMiddleware.verifyToken, authMiddleware.isAdmin],
  serviceController.getServiceById
);
router.post(
  "/api/service",
  [authMiddleware.verifyToken, authMiddleware.isAdmin],
  serviceController.createService
);
router.put(
  "/api/service",
  [authMiddleware.verifyToken, authMiddleware.isAdmin],
  serviceController.updateService
);
router.delete(
  "/api/service",
  [authMiddleware.verifyToken, authMiddleware.isAdmin],
  serviceController.deactivateService
);
// Export the router
module.exports = router;
