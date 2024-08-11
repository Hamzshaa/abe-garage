const express = require("express");
const installRoutes = require("./install.routes");
// Import the employee routes
const employeeRouter = require("./employee.routes");
// Import the login routes
const loginRoutes = require("./login.routes");
// Import vehicle login routes
const vehicleRoutes = require("./vehicle.routes");
// Import the service routes
const serviceRoutes = require("./service.routes");
// Import the customer routes
const customerRoute = require("./customer.routes");
// Import the order routes
const orderRoute = require("./order.routes");

const chartsRoute = require("./chart.routes");

const router = express.Router();

// Add the install routes to the main router
router.use(installRoutes);
// Add the employee routes to the main router
router.use(employeeRouter);
// Add the login routes to the main router
router.use(loginRoutes);
// Add the vehicle routes to the main router
router.use(vehicleRoutes);
router.use(chartsRoute);
// Add the service routes to the main router
router.use(serviceRoutes);
// Add the customer routes to the main router
router.use(customerRoute);
// Add the order routes to the main router
router.use(orderRoute);

module.exports = router;
