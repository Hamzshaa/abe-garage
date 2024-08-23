// Import the order service
const OrderService = require("../services/order.service");

//  Create the add orders controller
async function addOrder(req, res, next) {
  try {
    const orderData = req.body;
    // create teh order
    const order = await OrderService.addOrder(orderData);
    // return the order
    // res.json(order);
    if (!order?.order_id) {
      res.status(400).json({
        error: "Failed to add the order!",
      });
    } else {
      res.status(200).json({
        // order: order,
        success: "true",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: "Something went wrong!",
    });
  }
}
// Create the get all orders controller
async function getOrders(req, res, next) {
  //  Call the getOrders method from the order service
  const orders = await OrderService.getOrders();
  console.log(orders);
  if (!orders) {
    res.status(400).json({
      error: "Failed to get the orders",
    });
  } else {
    res.status(200).json({
      status: "success",
      data: orders,
    });
  }
}

// Create the get single order controller
async function getOrderById(req, res, next) {
  const order = await OrderService.getOrderById(req, res);
  try {
    if (!order) {
      res.status(400).json({
        error: "Order not found!",
      });
    } else {
      res.status(200).json({
        status: "success",
        data: order,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: "Something went wrong!",
    });
  }
}

// Create the update order controller
async function updateOrder(req, res, next) {
  const updatedOrderData = req.body;
  try {
    const result = await OrderService.updateOrder(updatedOrderData);
    if (!result) {
      return res.status(400).json({
        error: "Failed to update the order!",
      });
    }
    res.status(200).json({
      success: "true",
      message: "Order updated successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
}

// Create the changestatus
async function changeStatus(req, res, next) {
	const order = await OrderService.changeStatus(req, res);
	try {
		if (!order) {
			res.status(400).json({
				error: "Order not found!",
			});
		} else {
			res.status(200).json({
				status: "success",
			});
		}
	} catch (error) {
		console.log(error);
		res.status(400).json({
			error: "Something went wrong!",
		});
	}
}

//  Export the controllers
module.exports = {
	addOrder,
	getOrders,
	getOrderById,
	updateOrder,
	changeStatus,
};
