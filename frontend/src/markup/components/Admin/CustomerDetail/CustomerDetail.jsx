import React, { useState, useEffect } from "react";
import { useAuth } from "../../../../Contexts/AuthContext";
import customerService from "../../../../services/customer.service";
import { useNavigate, Link, useParams } from "react-router-dom";
import vehiclesService from "../../../../services/vehicle.service";
import ordersService from "../../../../services/order.service";

function CustomerDetail() {
	const [customer, setCustomer] = useState("");
	const [vehicles, setVehicles] = useState([]);
	const [orders, setOrders] = useState([]);
	const [loadingCustomer, setLoadingCustomer] = useState(true);
	const [loadingVehicles, setLoadingVehicles] = useState(true);
	const [loadingOrders, setLoadingOrders] = useState(true);
	const [error, setError] = useState(null); // To track any errors
	const navigate = useNavigate();
	const { customerId } = useParams(); // Fetch ID from route params

	const { employee } = useAuth();
	let loggedInEmployeeToken = employee?.employee_token || "";

	useEffect(() => {
		const fetchCustomerAndRelatedData = async () => {
			try {
				// Fetch customer data
				const customerResponse = await customerService.getCustomerById(
					customerId,
					loggedInEmployeeToken
				);
				if (!customerResponse.ok) {
					throw new Error("Failed to fetch customer data");
				}
				const customerData = await customerResponse.json();
				setCustomer(customerData.data);
				setLoadingCustomer(false);

				// Fetch vehicles
				const vehicleResponse = await vehiclesService.getVehicles(
					customerId,
					loggedInEmployeeToken
				);
				if (!vehicleResponse.ok) {
					throw new Error("Failed to fetch vehicle data");
				}
				const vehicleData = await vehicleResponse.json();
				setVehicles(vehicleData.vehicles || []);
				setLoadingVehicles(false);

				// Fetch orders
				const orderResponse = await ordersService.getOrder(
					loggedInEmployeeToken
				);
				if (!orderResponse.ok) {
					throw new Error("Failed to fetch order data");
				}
				const orderData = await orderResponse.json();
				// console.log(orderData.data);
				setOrders(orderData.data || []); // Assuming the API returns an array of orders
				setLoadingOrders(false);
			} catch (error) {
				console.error("Error fetching data:", error);
				setError(error.message);
				setLoadingCustomer(false);
				setLoadingVehicles(false);
				setLoadingOrders(false);
			}
		};
		fetchCustomerAndRelatedData();
	}, [customerId, loggedInEmployeeToken]);
	console.log(orders);
	if (loadingCustomer) {
		return <p>Loading customer details...</p>;
	}

	if (error) {
		return <p>Error: {error}</p>;
	}

	if (!customer) {
		return <p>No customer data found.</p>;
	}

	return (
		<div>
			<main className="content-container">
				<div className="vertical-labels">
					<div className="label info-label">Info</div>
					<div className="vl"></div>
					<div className="label cars-label">Cars</div>
					<div className="vl"></div>
					<div className="label orders-label">Orders</div>
				</div>

				<div className="content">
					<div className="customer-info">
						<h2>Customer: {customer.customer_first_name}</h2>
						<p>Email: {customer.customer_email}</p>
						<p>Phone Number: {customer.customer_phone_number}</p>
						<p>
							Active Customer: {customer.active_customer_status ? "Yes" : "No"}
						</p>
						<button className="edit-customer-btn">
							<Link
								to={`/admin/edit-customer/${customerId}`}
								className="edit-customer-link"
							>
								Edit customer info
							</Link>
						</button>
					</div>

					<div className="vehicle-info">
						<h3>Vehicles of {customer.customer_first_name}</h3>
						{loadingVehicles ? (
							<p>Loading vehicles...</p>
						) : (
							<div className="vehicle-list">
								{vehicles.length > 0 ? (
									vehicles.map((vehicle) => (
										<div key={vehicle.vehicle_id} className="vehicle-item">
											<p>Make: {vehicle.vehicle_make}</p>
											<p>Model: {vehicle.vehicle_model}</p>
											<p>Year: {vehicle.vehicle_year}</p>
										</div>
									))
								) : (
									<p>No vehicles found for this customer.</p>
								)}
							</div>
						)}
						<button className="add-vehicle-btn">Add New Vehicle</button>
					</div>

					<div className="orders-info">
						<h3>Orders of {customer.customer_first_name}</h3>
						{loadingOrders ? (
							<p>Loading orders...</p>
						) : (
							<div className="order-list">
								{/* {orders.length <= 0 ? ( */}
								{orders
									.filter((order) => order.customer_id == customerId)
									.map((order) => (
										<div key={order.order_id} className="order-item">
											<p>Order ID: {order.order_id}</p>
											<p>Order Date: {order.order_date}</p>
											<p>Order Status: {order.order_status}</p>
										</div>
									))}
							</div>
						)}
					</div>
				</div>
			</main>
		</div>
	);
}

export default CustomerDetail;
