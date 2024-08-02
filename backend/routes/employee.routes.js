// Import the express module
const express = require("express");
// Call the router method from express to create the router
const router = express.Router();
// Import the employee controller
const employeeController = require("../controllers/employee.controllers");
// Import middleware
const authMiddleware = require("../middlewares/auth.middleware");
// Create a route to handle the add new employee request on post
router.post(
  "/api/employee",
  [authMiddleware.verifyToken, authMiddleware.isAdmin],
  employeeController.createEmployee
);
// Create a route to handle the get All employees request on get
router.get(
  "/api/employees",
  [authMiddleware.verifyToken, authMiddleware.isAdmin],
  employeeController.getAllEmployees
);
// Create a route to handle the get single employee request on get
router.get(
  "/api/employee/:id",
  [authMiddleware.verifyToken, authMiddleware.isAdmin],
  employeeController.getEmployeeById
);
// Create a route to handle the update employee request on put
router.put(
  "/api/employee",
  [authMiddleware.verifyToken, authMiddleware.isAdmin],
  employeeController.updateEmployee
)
// Create a route to handle the delete employee request on delete
router.delete(
  "/api/employee/:id",
  [authMiddleware.verifyToken, authMiddleware.isAdmin],
  employeeController.deleteEmployee
)
// Export the router
module.exports = router;
