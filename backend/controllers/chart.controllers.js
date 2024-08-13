const chartService = require("../services/chart.service");

async function barChart(req, res, next) {
  const data = await chartService.getBarChartData();

  try {
    return res.status(200).json({
      status: "success",
      data: data,
    });
  } catch (error) {
    console.error("Error in customerLineChart controller:", error);
    return res.status(500).json({
      error: "Something went wrong!",
    });
  }
}

// async function customerLineChart(req, res, next) {
//   const data = await chartService.getCustomerLineChartData();

//   try {
//     return res.status(200).json({
//       status: "success",
//       data: data,
//     });
//   } catch (error) {
//     console.error("Error in customerLineChart controller:", error);
//     return res.status(500).json({
//       error: "Something went wrong!",
//     });
//   }
// }

async function customerAreaChart(req, res, next) {
  const data = await chartService.getCustomerAreaChartData();

  try {
    return res.status(200).json({
      status: "success",
      data: data,
    });
  } catch (error) {
    console.error("Error in customerLineChart controller:", error);
    return res.status(500).json({
      error: "Something went wrong!",
    });
  }
}

async function orderRadarChart(req, res, next) {
  const data = await chartService.getOrderRadarChartData();

  try {
    return res.status(200).json({
      status: "success",
      data: data,
    });
  } catch (error) {
    console.error("Error in customerLineChart controller:", error);
    return res.status(500).json({
      error: "Something went wrong!",
    });
  }
}

async function orderPieChart(req, res, next) {
  const data = await chartService.getOrderPieChartData();

  try {
    return res.status(200).json({
      status: "success",
      data: data,
    });
  } catch (error) {
    console.error("Error in customerLineChart controller:", error);
    return res.status(500).json({
      error: "Something went wrong!",
    });
  }
}

module.exports = {
  // customerLineChart,
  barChart,
  customerAreaChart,
  orderRadarChart,
  orderPieChart,
};
