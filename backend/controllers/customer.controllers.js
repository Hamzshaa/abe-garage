// Import the customer service module
const customerService = require("../services/customer.service");
/**
 * Controller function to create a new customer.
 * It checks if a customer with the given email already exists, and if not, creates a new customer.
 */
async function createCustomer(req, res, next) {
  try {
    // Check if the customer already exists using the provided email
    const customerExists = await customerService.checkIfCustomerExists(req.body.customer_email);
    // If the customer already exists, return a 400 error
    if (customerExists) {
      return res.status(400).json({
        error: "This email address is already associated with another customer!",
      });
    }
    // Get the customer data from the request body
    const customerData = req.body;
    console.log(customerData);
    // Create a new customer
    const customer = await customerService.createCustomer(customerData);
    // If the customer creation failed, return a 400 error
    if (!customer) {
      return res.status(400).json({
        error: "Failed to add the customer!",
      });
    }
    // Return a success response with the new customer's ID
    return res.status(200).json({
      status: "success",
      message: "Customer added successfully",
      customer_id: customer.customer_id,
    });
  } catch (error) {
    // Log the error and return a 500 error response
    console.error('Error in createCustomer controller:', error);
    return res.status(500).json({
      error: "Something went wrong!",
    });
  }
}
/**
 * Controller function to get all customers.
 * It retrieves all customers from the database and returns them.
 */
async function getAllCustomers(req, res, next) {
  try {
    // Get all customers from the service
    const customers = await customerService.getAllCustomers();
    // If no customers are found, return a 400 error
    if (!customers) {
      return res.status(400).json({
        error: "Failed to get all customers!",
      });
    }
    // Return a success response with the list of customers
    return res.status(200).json({
      status: "success",
      data: customers,
    });
  } catch (error) {
    // Log the error and return a 500 error response
    console.error('Error in getAllCustomers controller:', error);
    return res.status(500).json({
      error: "Something went wrong!",
    });
  }
}
/**
 * Controller function to get a single customer by their ID.
 * It retrieves the customer with the specified ID from the database and returns them.
 */
async function getCustomerById(req, res, next) {
  try {
    // Parse the customer ID from the request parameters
    const customerId = parseInt(req.params.id, 10);
    // If the customer ID is not a valid number, return a 400 error
    if (isNaN(customerId)) {
      return res.status(400).json({
        error: "Invalid customer ID!",
      });
    }
    // Get the customer by ID from the service
    const customer = await customerService.getCustomerById(customerId);
    // If the customer is not found, return a 404 error
    if (!customer) {
      return res.status(404).json({
        error: "Customer not found!",
      });
    }
    // Return a success response with the customer data
    return res.status(200).json({
      status: "success",
      data: customer,
    });
  } catch (error) {
    // Log the error and return a 500 error response
    console.error('Error in getCustomerById controller:', error);
    return res.status(500).json({
      error: "Something went wrong!",
    });
  }
}
/**
 * Controller function to update a customer by their ID.
 * It updates the customer with the specified ID using the data provided in the request body.
 */
async function updateCustomer(req, res, next) {
  try {
    // Parse the customer ID from the request parameters
    const customerId = parseInt(req.params.id, 10);
    // If the customer ID is not a valid number, return a 400 error
    if (isNaN(customerId)) {
      return res.status(400).json({
        error: "Invalid customer ID!",
      });
    }
    // Get the updated customer data from the request body
    const updatedData = req.body;
    console.log(updatedData);
    // Update the customer using the service
    const result = await customerService.updateCustomer(customerId, updatedData);
    // If the update failed, return a 400 error
    if (!result) {
      return res.status(400).json({
        error: "Failed to update the customer!",
      });
    }
    // Return a success response
    return res.status(200).json({
      status: "success",
      message: "Customer updated successfully",
    });
  } catch (error) {
    // Log the error and return a 500 error response
    console.error('Error in updateCustomer controller:', error);
    return res.status(500).json({
      error: "Something went wrong!",
    });
  }
}
// Export the controller functions to be used in routes
module.exports = {
  createCustomer,
  getAllCustomers,
  getCustomerById,
  updateCustomer,
};
