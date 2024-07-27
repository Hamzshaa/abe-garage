const express = require("express");
const installRoutes = require("./install.routes");
// Import the employee routes
const employeeRouter = require("./employee.routes");
// Import the login routes
const loginRoutes = require("./login.routes");

const router = express.Router();

router.use(installRoutes);
// Add the employee routes to the main router
router.use(employeeRouter);
// Add the login routes to the main router
router.use(loginRoutes);

module.exports = router;
