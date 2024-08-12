const express = require("express");
const router = express.Router();
const chartController = require("../controllers/chart.controllers");
const authMiddleware = require("../middlewares/auth.middleware");

router.get(
  "/api/charts/customer/line",
  [authMiddleware.verifyToken, authMiddleware.isAdmin],
  chartController.customerLineChart
);

router.get(
  "/api/charts/customer/area",
  [authMiddleware.verifyToken, authMiddleware.isAdmin],
  chartController.customerAreaChart
);

router.get(
  "/api/charts/order/radar",
  [authMiddleware.verifyToken, authMiddleware.isAdmin],
  chartController.orderRadarChart
);

module.exports = router;
