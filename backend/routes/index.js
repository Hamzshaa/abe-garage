const express = require("express");
const installRoutes = require("./install.routes");
// Import the employee routes
const employeeRouter = require("./employee.routes");
// Import the login routes
const loginRoutes = require("./login.routes");

const vehicleRoutes = require("./vehicle.routes");

const serviceRoutes = require("./service.routes");

const customerRoute = require("./customer.routes");


const router = express.Router();

router.use(installRoutes);
router.use(serviceRoutes);
// Add the employee routes to the main router
router.use(employeeRouter);
// Add the login routes to the main router
router.use(loginRoutes);
router.use(customerRoute);

router.use(vehicleRoutes);

module.exports = router;
