const express = require("express");
const installRoutes = require("./install.routes");

const router = express.Router();

router.use(installRoutes);

module.exports = router;
