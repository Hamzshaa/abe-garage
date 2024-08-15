import { useContext, useEffect, useState } from "react";
import { useAuth } from "../../../Contexts/AuthContext";
import { Table, Button } from "react-bootstrap";
import { format } from "date-fns";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { FaHandPointer } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const api_url = import.meta.env.VITE_REACT_APP_API_URL;

function AddOrder() {
	const [order, setOrder] = useState({});
	const [firstName, setFirstName] = useState([]);
	const [lastName, setLastName] = useState([]);
	const [email, setEmail] = useState([]);
	const [phone, setPhone] = useState([]);
	const [customers, setCustomers] = useState([]);
	const [searchTerm, setSearchTerm] = useState("");
	const [vehicles, setVehicles] = useState([]);
	const [step, setStep] = useState(0);
	const [services, setServices] = useState([]);
	const [customerSelected, setCustomerSelected] = useState({});
	const [vehicleSelected, setVehicleSelected] = useState({});
	const [orderServices, setOrderServices] = useState([]);
	const [price, setPrice] = useState("");
	const [serviceDescription, setServiceDescription] = useState("");
	const { employee } = useAuth();
	const navigate = useNavigate()
	let token = null;
	let employee_id = employee?.employee_id
	let customer_id = customerSelected?.customer_id
	let vehicle_id = vehicleSelected?.vehicle_id;
	if (!token) {
		token = employee?.employee_token;
		// const token = localStorage.getItem("token");
		console.log(employee?.employee_token);
		console.log("first");
		// token =
		// 	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbXBsb3llZV9pZCI6MywiZW1wbG95ZWVfZW1haWwiOiJoYW16YUB0ZXN0LmNvbSIsImVtcGxveWVlX3JvbGUiOjMsImVtcGxveWVlX2ZpcnN0X25hbWUiOiJUZXN0IFVwZGF0ZWQiLCJpYXQiOjE3MjM1NTc1NTYsImV4cCI6MTcyMzY0Mzk1Nn0.yYLc2Cifkxf1mXMjMGwSWj6QrFOYwR5VFn5kUAnWRhg";
	}
	console.log(token);

	useEffect(() => {
		const getCustomers = async () => {
			const response = await fetch(`${api_url}/api/customers`, {
				headers: {
					"x-access-token": token,
				},
			});
			const data = await response.json();
			console.log(data.data);
			setCustomers(data.data);
		};
		getCustomers();
	}, [token]);

	const handleSearch = (event) => {
		setSearchTerm(event.target.value);
		if (event.target.value) {
			setStep(1);
		} else {
			setStep(0);
		}
	};
	const handleSelect = (selectedCustomer) => {
		console.log(selectedCustomer);
		setCustomerSelected(selectedCustomer);
		setStep(2);
		fetchCustomerVehicle(selectedCustomer.customer_id);
	};
	const fetchCustomerVehicle = async (customer_id) => {
		const response = await fetch(
			`http://localhost:8080/api/vehicles/${customer_id}`,
			{
				headers: {
					"x-access-token": token,
				},
			}
		);
		const data = await response.json();
		console.log(data.vehicles);
		setVehicles(data.vehicles);
	};

	const handleSelectVehicle = (selectedVehicle) => {
		console.log(selectedVehicle);
		setVehicleSelected(selectedVehicle);
		setStep(3);
		// setVehicleSelected(selectedVehicle.customer_id);
		fetchServices();
	};
	const fetchServices = async () => {
		const response = await fetch(`${api_url}/api/services`, {
			headers: {
				"x-access-token": token,
			},
		});
		const data = await response.json();
		console.log(data.data);
		setServices(data.data);
	};

	const handleSelectService = (selectedService) => {
		setStep(4);
	};
	const handleCheckBox = (service_id, event) => {
		// console.log(event.target.checked)
		// console.log(service_id)
		if (event.target.checked) {
			setOrderServices((prevSelectedOrderServices) => [
				...prevSelectedOrderServices,
				{ service_id, service_completed: 2 },
			]);
		} else {
			setOrderServices((prevSelectedOrderServices) => {
				return prevSelectedOrderServices.filter(
					(service) => service.service_id !== service_id
				);
			});
		}
	};
	console.log(orderServices);

	const handleSubmit = async () => {
		const data = {
			employee_id,
			customer_id,
			vehicle_id,
			// order_description: "Some description about the order",
			estimated_completion_date: "2023-04-28 18:27:02.380",
			completion_date: null,
			// order_completed: 0,
			active_order: 2,
			order_total_price: price,
			additional_requests_completed: 2,
			additional_request: serviceDescription,
			order_status: 2,
			order_services: orderServices
		};
		try {
			const response = await fetch(`${api_url}/api/order`, {
				method: "POST",
				headers: {
					"x-access-token": token,
					"Content-Type": "application/json",
					// "Accept": "application/json"
					},
					body: JSON.stringify(data),
					});
					console.log(response)
					if (response.ok) {
						navigate("/adimin/orders")
					} else {
						const data1 = await response.json()
						console.log(data1)
						console.log(data.error)
					}
		} catch (error) {
			console.log(error)
		}

	};
	// 	{
	//     "employee_id": 1,
	//     "customer_id": 1,
	//     "vehicle_id": 1,
	//     "order_description": "Some description about the order",
	//     "estimated_completion_date": "2023-04-28 18:27:02.380",
	//     "completion_date": null,
	//     "order_completed": 0,
	//     "active_order": 1,
	//     "order_total_price": 500,
	//     "additional_requests_completed": 500,
	//     "order_status": 3,
	//     "order_services": [
	//         {
	//             "service_id": 1,
	//             "service_completed": 2
	//         }
	//     ]
	// }

	return (
		<div>
			<section className="contact-section">
				<div className="auto-container">
					<div className="contact-title">
						<h2>Create a new order</h2>
						{/* <form action="">
							<input
								type="text"
								placeholder="Search for a customer using first name, last name, email address or phone nubmer"
							/>
						</form> */}
						<form>
							<div className="row clearfix">
								{step <= 1 && (
									<div className="form-group col-md-12">
										<input
											style={{
												border: "2px solid gray",
												width: "90%",
												padding: "10px",
											}}
											type="text"
											placeholder="Search for a customer using first name, last name, email address or phone nubmer"
											onChange={handleSearch}
										/>
									</div>
								)}
								{step == 0 && (
									<button className="theme-btn btn-style-one" type="submit">
										<span>ADD NEW CUSTOMER</span>
									</button>
								)}
								{step == 1 && (
									<Table striped bordered hover>
										<tbody>
											{customers
												?.filter((customer) => {
													return (
														customer.customer_first_name
															.toLowerCase()
															.includes(searchTerm.toLowerCase()) ||
														customer.customer_last_name
															.toLowerCase()
															.includes(searchTerm.toLowerCase()) ||
														customer.customer_email
															.toLowerCase()
															.includes(searchTerm.toLowerCase()) ||
														customer.customer_phone_number
															.toLowerCase()
															.includes(searchTerm.toLowerCase())
													);
												})
												.map((customer) => (
													<tr
														key={customer?.customer_id}
														onClick={() => handleSelect(customer)}
													>
														<td>{customer?.customer_first_name}</td>
														<td>{customer?.customer_last_name}</td>
														<td>{customer?.customer_email}</td>
														<td>{customer?.customer_phone_number}</td>
														<td>
															<FaHandPointer />
														</td>
													</tr>
												))}
										</tbody>
									</Table>
								)}
								{step > 1 && (
									<div>
										<h2>
											{customerSelected.customer_first_name}{" "}
											{customerSelected.customer_last_name}
										</h2>
										<h3>{customerSelected.customer_email}</h3>
										<h3>{customerSelected.customer_phone_number}</h3>
										<h3>
											{customerSelected.active_customer_status == 1
												? "Yes"
												: "No"}
										</h3>
										<h3>
											Edit customer info
											<Link
												to={`/admin/customer/edit/${customerSelected.customer_id}`}
											>
												<FaEdit />
											</Link>
										</h3>
									</div>
								)}
								{step == 2 && (
									<Table striped bordered hover>
										<thead>
											<tr>
												<th>Year</th>
												<th>Make</th>
												<th>Model</th>
												<th>Tag</th>
												<th>Serial</th>
												<th>Color</th>
												<th>Mileage</th>
												<th>Choose</th>
											</tr>
										</thead>
										<tbody>
											{vehicles.map((vehicle) => (
												<tr
													key={vehicle.vehicle_id}
													onClick={() => handleSelectVehicle(vehicle)}
												>
													<td>{vehicle.vehicle_year}</td>
													<td>{vehicle.vehicle_make}</td>
													<td>{vehicle.vehicle_model}</td>
													<td>{vehicle.vehicle_tag}</td>
													<td>{vehicle.vehicle_serial}</td>
													<td>{vehicle.vehicle_color}</td>
													<td>{vehicle.vehicle_mileage}</td>
													<td>
														<FaHandPointer />
													</td>
												</tr>
											))}
										</tbody>
									</Table>
								)}
								{step > 2 && (
									<div>
										<h2>
											{vehicleSelected.vehicle_make}{" "}
											{vehicleSelected.vehicle_model}
										</h2>
										<h3>{vehicleSelected.vehicle_color}</h3>
										<h3>{vehicleSelected.vehicle_tag}</h3>
										<h3>{vehicleSelected.vehicle_year}</h3>
										<h3>{vehicleSelected.vehicle_mileage}</h3>
										<h3>{vehicleSelected.vehicle_serial}</h3>
										<h3>
											Edit vehicle info
											<Link
												to={`/admin/vehicle/edit/${vehicleSelected.vehicle_id}`}
											>
												<FaEdit />
											</Link>
										</h3>
									</div>
								)}
								{step > 2 && (
									<div>
										<h2>Choose service</h2>
										{services.map((service) => (
											<div>
												<div
													key={service.service_id}
													onClick={() => handleSelectService(service)}
												>
													<h4>{service.service_name}</h4>
													<small>{service.service_description}</small>
												</div>
												<div>
													<input
														type="checkbox"
														onChange={(e) =>
															handleCheckBox(service.service_id, e)
														}
													/>
												</div>
											</div>
										))}
										<h2>Additional requests</h2>
										<div>
											<textarea
												name=""
												id=""
												placeholder="Service description"
												rows={6}
												cols={150}
												style={{ resize: "none" }}
												onChange={(e) => {
													setServiceDescription(e.target.value);
												}}
												value={serviceDescription}
											></textarea>
										</div>
										<div>
											<textarea
												name=""
												id=""
												placeholder="Price"
												rows={2}
												cols={150}
												style={{ resize: "none" }}
												onChange={(e) => {
													setPrice(e.target.value);
												}}
												value={price}
											></textarea>
										</div>
										<button
											className="theme-btn btn-style-one"
											onClick={handleSubmit}
										>
											SUBMIT ORDER
										</button>
									</div>
								)}
							</div>
						</form>
					</div>
				</div>
			</section>
		</div>
	);
}

export default AddOrder;

// import React from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faSearch } from "@fortawesome/free-solid-svg-icons";

// function AddOrder() {
// 	const handleSearch = () => {
// 		const query = document.getElementById("search-input").value;
// 		alert("You searched for: " + query);
// 		// Add your search logic here
// 	};

// 	return (
// 		<div className="container mt-5">
// 			<div className="input-group">
// 				<input
// 					type="text"
// 					className="form-control"
// 					placeholder="Search for a customer using first name, last name, email address or phone nubmer"
// 					aria-label="Search"
// 					id="search-input"
// 				/>
// 				<div className="input-group-append">
// 					<button
// 						className="btn btn-outline-secondary"
// 						type="button"
// 						onClick={handleSearch}
// 					>
// 						<FontAwesomeIcon icon={faSearch} />
// 					</button>
// 				</div>
// 			</div>
// 		</div>
// 	);
// }

// export default AddOrder;
