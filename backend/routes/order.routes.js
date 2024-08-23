// Import the express module
const express = require("express");
// Call the router method from express to create the router
const router = express.Router();
// Import the order controller
const orderController = require("../controllers/order.controllers");
//  Import middleware
const authMiddleware = require("../middlewares/auth.middleware");
//  Create a rout to handle the add new order request on post
router.post(
	"/api/order",
	[authMiddleware.verifyToken, authMiddleware.isAdmin],
	orderController.addOrder
);
//  Create a route to handle the Get All Orders request on get
router.get(
	"/api/orders",
	[authMiddleware.verifyToken, authMiddleware.isAdmin],
	orderController.getOrders
);
//  Create a route to handle the Get Single Order request on get
router.get(
	"/api/order/:id",
	[authMiddleware.verifyToken, authMiddleware.isAdmin],
	orderController.getOrderById
);
//  Create a route to handle the Update Order request on post
router.put(
	"/api/order",
	[authMiddleware.verifyToken, authMiddleware.isAdmin],
	orderController.updateOrder
);
//  Create a route to change a status
router.put(
	"/api/orders/status",
	[authMiddleware.verifyToken, authMiddleware.isAdmin],
	orderController.changeStatus
);


//  Export the router
module.exports = router;
