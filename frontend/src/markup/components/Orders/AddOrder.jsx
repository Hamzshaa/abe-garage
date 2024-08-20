import { useContext, useEffect, useState } from "react";
import { useAuth } from "../../../Contexts/AuthContext";
import { Table, Button } from "react-bootstrap";
import { format } from "date-fns";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { FaHandPointer } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import classes from "./css/Orders.module.css";
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
	// console.log(customerSelected);
	const [vehicleSelected, setVehicleSelected] = useState({});
	const [orderServices, setOrderServices] = useState([]);
	const [filteredCustomers, setFilteredCustomers] = useState([]);

	const [price, setPrice] = useState("");
	const [serviceDescription, setServiceDescription] = useState("");
	const { employee } = useAuth();
	const navigate = useNavigate();
	let token = null;
	let employee_id = employee?.employee_id;
	let customer_id = customerSelected?.customer_id;
	let vehicle_id = vehicleSelected?.vehicle_id;
	if (!token) {
		token = employee?.employee_token;
		// const token = localStorage.getItem("token");
		// console.log(employee?.employee_token);
		// console.log("first");
	}
	// console.log(token);

	useEffect(() => {
		const getCustomers = async () => {
			const response = await fetch(`${api_url}/api/customers`, {
				headers: {
					"x-access-token": token,
				},
			});
			const data = await response.json();
			// console.log(data.data);
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
		// console.log(selectedCustomer);
		setCustomerSelected(selectedCustomer);
		fetchCustomerVehicle(selectedCustomer.id);
		setStep((prevStep) => {
			const newStep = 2;
			// console.log(newStep); // This will log 2
			return newStep;
		});
	};
	const fetchCustomerVehicle = async (customer_id) => {
		const response = await fetch(`${api_url}/api/vehicles/${customer_id}`, {
			headers: {
				"x-access-token": token,
			},
		});
		const data = await response.json();
		// console.log(data.vehicles);
		setVehicles(data.vehicles);
	};

	const handleSelectVehicle = (selectedVehicle) => {
		// console.log(selectedVehicle);
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
		// console.log(data.data);
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
	// console.log(orderServices);

	const handleSubmit = async () => {
		const data = {
			employee_id,
			customer_id: customerSelected.id,
			vehicle_id: vehicleSelected.id,
			// order_description: "Some description about the order",
			// estimated_completion_date: "2023-04-28 18:27:02.380",
			completion_date: null,
			// order_completed: 0,
			active_order: 2,
			order_total_price: price,
			additional_requests_completed: 2,
			additional_request: serviceDescription,
			order_status: 2,
			order_services: orderServices,
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
			// console.log(response);
			if (response.ok) {
				navigate("/adimin/orders");
			} else {
				const data1 = await response.json();
				// console.log(data1);
				// console.log(data.error);
			}
		} catch (error) {
			// console.log(error);
		}
	};
	const handleReload = async (e) => {
		e.preventDefault(); // Prevents the default link behavior
		window.location.reload();
	};

	const columns1 = [
		{
			field: "customer_first_name",
			headerName: "Customer First Name",
			width: 250,
		},
		{
			field: "customer_last_name",
			headerName: "Customer Last Name",
			width: 250,
		},
		{
			field: "customer_email",
			headerName: "Customer Email",
			width: 250,
		},
		{
			field: "customer_phone",
			headerName: "Customer Phone Number",
			width: 250,
		},
		{
			field: "handPointer",
			headerName: "Select",
			width: 150,
			renderCell: (params) => (
				<FaHandPointer onClick={() => handleSelect(params.row)} />
			),
		},
	];

	const rows1 = customers
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
		?.map((customer) => ({
			id: customer?.customer_id,
			customer_first_name: customer?.customer_first_name,
			customer_last_name: customer?.customer_last_name,
			customer_email: customer?.customer_email,
			customer_phone: customer?.customer_phone_number,
			active_customer_status: customer?.active_customer_status,
			// handPointer: <FaHandPointer />,
		}));
	// console.log(customerSelected.id);

	const columns2 = [
		{
			field: "vehicle_year",
			headerName: "Year",
			width: 100,
		},
		{
			field: "vehicle_make",
			headerName: "Make",
			width: 150,
		},
		{
			field: "vehicle_model",
			headerName: "Model",
			width: 150,
		},
		{
			field: "vehicle_tag",
			headerName: "Tag",
			width: 150,
		},
		{
			field: "vehicle_serial",
			headerName: "Serial",
			width: 150,
		},
		{
			field: "vehicle_color",
			headerName: "Color",
			width: 150,
		},
		{
			field: "vehicle_mileage",
			headerName: "Mileage",
			width: 150,
		},
		{
			field: "handPointer",
			headerName: "Choose",
			width: 150,
			renderCell: (params) => (
				<FaHandPointer onClick={() => handleSelectVehicle(params.row)} />
			),
		},
	];
	const rows2 = vehicles?.map((vehicle) => ({
		id: vehicle?.vehicle_id,
		vehicle_year: vehicle?.vehicle_year,
		vehicle_make: vehicle?.vehicle_make,
		vehicle_model: vehicle?.vehicle_model,
		vehicle_tag: vehicle?.vehicle_tag,
		vehicle_serial: vehicle?.vehicle_serial,
		vehicle_color: vehicle?.vehicle_color,
		vehicle_mileage: vehicle?.vehicle_mileage,
	}));
	// console.log(vehicleSelected.id);

	return (
		<div className={classes.component}>
			<section className="contact-section">
				<div className="auto-container">
					<div className="contact-title">
						<h2>Create a new order</h2>
						<form>
							<div className="row clearfix">
								{step <= 1 && (
									<TextField
										label="Search for a customer using first name, last name, email address or phone nubmer"
										variant="outlined"
										fullWidth
										margin="normal"
										value={searchTerm}
										onChange={handleSearch}
									/>
								)}
								{step == 0 && (
									<div className={classes.button}>
										<button className="theme-btn btn-style-one" type="submit">
											ADD NEW CUSTOMER
										</button>
									</div>
								)}
								{step === 1 && (
									<div style={{ height: 400, width: "100%" }}>
										<DataGrid
											rows={rows1}
											columns={columns1}
											pageSizeOptions={[5, 10, 20]}
											initialState={{
												pagination: {
													paginationModel: { page: 0, pageSize: 5 },
												},
											}}
											// checkboxSelection
											// disableRowSelectionOnClick
											onRowClick={(params) => handleSelect(params.row)} // Pass the clicked row data
										/>
									</div>
								)}
								{step > 1 && (
									<div className={classes.boxes}>
										<div className="container">
											<div className={`row ${classes.position}`}>
												<div className="col-md-10">
													<div className="col-md-10"></div>
													<h2>
														{customerSelected.customer_first_name}{" "}
														{customerSelected.customer_last_name}
													</h2>
													<h3>Email: {customerSelected.customer_email}</h3>
													<h3>
														Phone Number: {customerSelected.customer_phone}
													</h3>
													<h3>
														Active Customer:{" "}
														{customerSelected.active_customer_status == 1
															? "Yes"
															: "No"}
													</h3>
													<h3>
														Edit customer info:{" "}
														<Link
															to={`/admin/customer/edit/${customerSelected.customer_id}`}
														>
															<FaEdit />
														</Link>
													</h3>
												</div>
												<div className={`col-md-2 ${classes.absolute}`}>
													<Link to="/admin/order" onClick={() => setStep(1)}>
														<CloseIcon className={classes.icon} />
													</Link>
												</div>
											</div>
										</div>
									</div>
								)}
								{step == 2 && (
									<>
										<div className="form-group col-md-12">
											<section className="contact-section">
												<div className="auto-container">
													<div style={{ height: 400, width: "100%" }}>
														<DataGrid
															rows={rows2}
															columns={columns2}
															pageSizeOptions={[5, 10, 20]}
															initialState={{
																pagination: {
																	paginationModel: { page: 0, pageSize: 5 },
																},
															}}
															// checkboxSelection
															// disableRowSelectionOnClick
															onRowClick={(params) =>
																handleSelectVehicle(params.row)
															} // Pass the clicked row data
														/>
													</div>
												</div>
											</section>
										</div>
									</>
								)}
								{step > 2 && (
									<div className={classes.boxes}>
										<div className="container">
											<div className={`row ${classes.position}`}>
												<div className="col-md-10">
													<h2>
														{vehicleSelected.vehicle_make}{" "}
														{vehicleSelected.vehicle_model}
													</h2>
													<h3>
														Vehicle Color: {vehicleSelected.vehicle_color}
													</h3>
													<h3>Vehicle Tag: {vehicleSelected.vehicle_tag}</h3>
													<h3>Vehicle Year: {vehicleSelected.vehicle_year}</h3>
													<h3>
														Vehicle Mileage: {vehicleSelected.vehicle_mileage}
													</h3>
													<h3>
														Vehicle Serial: {vehicleSelected.vehicle_serial}
													</h3>
													<h3>
														Edit vehicle info:{" "}
														<Link
															to={`/admin/vehicle/edit/${vehicleSelected.vehicle_id}`}
														>
															<FaEdit />
														</Link>
													</h3>
												</div>
												<div className={`col-md-2 ${classes.absolute}`}>
													<Link to="/admin/order" onClick={() => setStep(2)}>
														<CloseIcon className={classes.icon} />
													</Link>{" "}
												</div>
											</div>
										</div>
									</div>
								)}
								{step > 2 && (
									<>
										<div className={classes.boxes}>
											<h2>Choose service</h2>
											{services.map((service) => (
												<div className={classes.smallboxes}>
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
										</div>
										<div className={classes.boxes}>
											<h2>Additional requests</h2>
											<div>
												<textarea
													className={classes.textarea1}
													name=""
													id=""
													placeholder="Service description"
													// rows={6}
													// cols={150}
													style={{ resize: "none" }}
													onChange={(e) => {
														setServiceDescription(e.target.value);
													}}
													value={serviceDescription}
												></textarea>
											</div>
											<div>
												<textarea
													className={classes.textarea2}
													name=""
													id=""
													placeholder="Price"
													// rows={2}
													// cols={150}
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
									</>
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
