const express = require("express");
const router = express.Router();
const customerController = require("../controllers/customer.controllers");
const authMiddleware = require("../middlewares/auth.middleware");

// Create a customer
router.post(
  "/api/customer",
  [authMiddleware.verifyToken, authMiddleware.isAdmin],
  customerController.createCustomer
);

// Get all customers
router.get(
  "/api/customers",
  [authMiddleware.verifyToken, authMiddleware.isAdmin],
  customerController.getAllCustomers
);

// Get a single customer by ID
router.get(
  "/api/customer/:id",
  [authMiddleware.verifyToken, authMiddleware.isAdmin],
  customerController.getCustomerById
);

// Update a customer by ID
router.put(
  "/api/customer/:id",
  [authMiddleware.verifyToken, authMiddleware.isAdmin],
  customerController.updateCustomer
);

// **Delete a customer by ID**
router.delete(
  "/api/customer/:id",
  [authMiddleware.verifyToken, authMiddleware.isAdmin],
  customerController.deleteCustomer
);

module.exports = router;
