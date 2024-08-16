// Import the query function from the db.config.js file
const conn = require("../config/db.config");
// Import bcrypt module
const bcrypt = require("bcrypt");
const crypto = require("crypto");
//  A function to add a new order
async function addOrder(order) {
	const order_hash = crypto.randomBytes(16).toString("hex").slice(0, 32);
	let createdOrder = {};
	try {
		// Generate a salt and hash the order number
		const salt = await bcrypt.genSalt(10);
		// Hash the order
		// const order_hash = await bcrypt.hash();
		const query =
			"INSERT INTO orders (employee_id, customer_id, vehicle_id, active_order, order_hash) VALUES (?, ?, ?, ?, ?)";
		console.log(
			`check for hammza ${order.employee_id}, ${order.customer_id} ${order.vehicle_id}, ${order.active_order}, ${order_hash}`
		);
		const row = await conn.query(query, [
			order.employee_id,
			order.customer_id,
			order.vehicle_id,
			order.active_order,
			order_hash,
		]);
		// Get the order_id from the insert
		const order_id = row.insertId;
		// Insert the remaining data in to the order_info and order_status tables
		const query2 =
			"INSERT INTO order_info (order_id, order_total_price, completion_date, additional_request, notes_for_internal_use, notes_for_customer, additional_requests_completed) VALUES (?, ?, ?, ?, ?, ?, ?)";
		// console.log(
		// 	`check for undefined columns total price${order.order_total_price}, completion date ${order.completion_date}, additional request${order.additional_request}, notes for internal use${order.notes_for_internal_use}, notes for customer${order.notes_for_customer}, additional request completed${order.additional_request_completed}, order id${order.order_id}`
		// );
		await conn.query(query2, [
			order_id,
			order.order_total_price,
			// order.estimated_completion_date,
			order.completion_date || null,
			order.additional_request || null,
			order.notes_for_internal_use || null,
			order.notes_for_customer || null,
			order.additional_requests_completed,
		]);
		const order_services = order.order_services;
		order_services.forEach(async (value) => {
			const query3 =
				"INSERT INTO order_services (order_id, service_id, service_completed) VALUES (?, ?, ?)";
			await conn.query(query3, [
				order_id,
				value.service_id,
				value.service_completed,
			]);
		});
		const query4 =
			"INSERT INTO order_status (order_id, order_status) VALUES (?, ?)";
		await conn.query(query4, [order_id, order.order_status || 3]);
		createdOrder = {
			order_id: order_id,
		};
	} catch (error) {
		console.error(error);
	}
	return createdOrder;
}
// A function to get all orders
async function getOrders() {
	const query =
		"SELECT * FROM orders INNER JOIN order_info ON orders.order_id = order_info.order_id INNER JOIN order_services ON orders.order_id = order_services.order_id INNER JOIN order_status ON orders.order_id = order_status.order_id ORDER BY orders.order_id DESC limit 10";
	const rows = await conn.query(query);
	return rows;
}

// A function to get single order
async function getOrderById(req, res) {
	const { id } = req.params;
	// console.log(`robelooooo${id}`)
	const query =
		"SELECT * FROM orders INNER JOIN order_info ON orders.order_id = order_info.order_id INNER JOIN order_services ON orders.order_id = order_services.order_id INNER JOIN order_status ON orders.order_id = order_status.order_id WHERE orders.order_id = ?";
	try {
		const rows = await conn.query(query, [id]);
		if (rows.length === 0) {
			return null;
		}
		return rows;
	} catch (error) {
		console.log("Error executing query: ", error);
		throw error;
	}
}

// A function to update order
async function updateOrder(order) {
	const order_hash = crypto.randomBytes(16).toString("hex").slice(0, 32);
	try {
		const query = `
		UPDATE orders
		SET employee_id = ?, customer_id = ?, vehicle_id = ?, active_order = ?, order_hash = ?
		WHERE order_id = ?`;
		// console.log(`robel ${order.active_order}`);
		// console.log(
		// 	`check for hammza ${order.employee_id}, ${order.customer_id}, ${order.vehicle_id}, ${order.active_order}, ${order_hash},${order.order_id}`
		// );
		await conn.query(query, [
			order.employee_id,
			order.customer_id,
			order.vehicle_id,
			order.active_order,
			order_hash,
			order.order_id,
		]);
		const query2 = `
		UPDATE order_info
		SET order_total_price = ?, completion_date = ?, additional_request = ?, notes_for_internal_use = ?, notes_for_customer = ?, additional_requests_completed = ?
		WHERE order_id = ?`;
		console.log(
			`check for undefined columns total price${order.order_total_price}, completion date ${order.completion_date}, additional request${order.additional_request}, notes for internal use${order.notes_for_internal_use}, notes for customer${order.notes_for_customer}, additional request completed${order.additional_requests_completed}, order id${order.order_id}`
		);
		await conn.query(query2, [
			order.order_total_price,
			order.completion_date || null,
			order.additional_request || null,
			order.notes_for_internal_use || null,
			order.notes_for_customer || null,
			order.additional_requests_completed,
			order.order_id,
		]);
		const order_services = order.order_services;
		order_services.forEach(async (value) => {
			const query3 = `
			UPDATE order_services
			SET service_completed = ?
			WHERE order_id = ?`;
			console.log(`${order.service_completed}, ${order.order_id}`);
			await conn.query(query3, [value.service_completed, order.order_id]);
		});
		const query4 = `
		UPDATE order_status
		SET order_status = ?
		WHERE order_id = ?`;
		await conn.query(query4, [order.order_status || 3, order.order_id]);
		return true;
	} catch (error) {
		console.log("Error updating order: ", error);
		throw error;
	}
}

// Export the functions
module.exports = {
	addOrder,
	getOrders,
	getOrderById,
	updateOrder,
};
