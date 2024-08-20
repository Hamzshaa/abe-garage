import { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { useAuth } from "../../../../Contexts/AuthContext";
import { format } from "date-fns";
import employeeService from "../../../../services/employee.service";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { TextField } from "@mui/material";

const EmployeesList = () => {
	const [employees, setEmployees] = useState([]);
	const [searchText, setSearchText] = useState("");
	const [filteredEmployees, setFilteredEmployees] = useState([]);
	const [apiError, setApiError] = useState(false);
	const [apiErrorMessage, setApiErrorMessage] = useState(null);
	const [token, setToken] = useState(null);

	const { employee } = useAuth();

	useEffect(() => {
		if (!token) {
			setToken(employee?.employee_token);
		}
	}, [employee, token]);

	useEffect(() => {
		if (!token) return;
		const allEmployees = employeeService.getAllEmployees(token) || [];
		allEmployees
			.then((res) => {
				if (!res.ok) {
					setApiError(true);
					if (res.status === 401) {
						setApiErrorMessage("Please login again");
					} else if (res.status === 403) {
						setApiErrorMessage("You are not authorized to view this page");
					} else {
						setApiErrorMessage("Please try again later");
					}
				}
				return res.json();
			})
			.then((data) => {
				if (data.status == "success" && data?.data?.length !== 0) {
					console.log(data);
					setEmployees(data?.data);
					setFilteredEmployees(data?.data);
				}
			})
			.catch((err) => {
				console.log(err);
			});
	}, [token]);

	useEffect(() => {
		setFilteredEmployees(
			employees?.filter((employee) =>
				`${employee?.employee_first_name} ${employee?.employee_last_name} ${employee?.employee_email} ${employee?.employee_phone}`
					?.toLowerCase()
					?.includes(searchText.toLowerCase())
			)
		);
	}, [searchText, employees, token]);

	const columns = [
		{
			field: "active_employee",
			headerName: "Active",
			width: 75,
			renderCell: (params) => (params.value ? "Yes" : "No"),
		},
		{ field: "employee_first_name", headerName: "First Name", width: 125 },
		{ field: "employee_last_name", headerName: "Last Name", width: 125 },
		{ field: "employee_email", headerName: "Email", width: 175 },
		{ field: "employee_phone", headerName: "Phone", width: 125 },
		{
			field: "added_date",
			headerName: "Added Date",
			width: 200,
			renderCell: (params) =>
				format(new Date(params.value), "MM-dd-yyyy | kk:mm"),
		},
		{ field: "company_role_name", headerName: "Role", width: 125 },
		{
			field: "actions",
			headerName: "Edit/Delete",
			width: 150,
			renderCell: (params) => {
				console.log(params.id); // This should now log the correct employee_id.
				return (
					<div className="edit-delete-icons">
						<Link to={`/admin/employee/edit/${params.id}`}>
							<FaEdit />
						</Link>
						&nbsp;|&nbsp;
						<MdDelete size={20} />
					</div>
				);
			},
		},
	];

	const rows = filteredEmployees?.map((employee) => ({
		id: employee.employee_id,
		active_employee: employee.active_employee,
		employee_first_name: employee.employee_first_name,
		employee_last_name: employee.employee_last_name,
		employee_email: employee.employee_email,
		employee_phone: employee.employee_phone,
		added_date: employee.added_date,
		company_role_name: employee.company_role_name,
	}));

	return (
		<>
			{apiError ? (
				<section className="contact-section">
					<div className="auto-container">
						<div className="contact-title">
							<h2>{apiErrorMessage}</h2>
						</div>
					</div>
				</section>
			) : (
				<section className="contact-section">
					<div className="auto-container">
						<div className="contact-title">
							<h2>Employees</h2>
						</div>
						<TextField
							label="Search Employees"
							variant="outlined"
							fullWidth
							margin="normal"
							value={searchText}
							onChange={(e) => setSearchText(e.target.value)}
						/>
						<div style={{ height: 400, width: "100%" }}>
							<DataGrid
								rows={rows}
								columns={columns}
								pageSizeOptions={[5, 10, 20]}
								initialState={{
									pagination: {
										paginationModel: { page: 0, pageSize: 5 },
									},
								}}
								// checkboxSelection
								disableRowSelectionOnClick
							/>
						</div>
					</div>
				</section>
			)}
		</>
	);
};

export default EmployeesList;

{
	/* <Table striped bordered hover>
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
										</Table> */
}

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
				<h3>{customerSelected.active_customer_status == 1 ? "Yes" : "No"}</h3>
				<h3>
					Edit customer info
					<Link to={`/admin/customer/edit/${customerSelected.customer_id}`}>
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
					{vehicleSelected.vehicle_make} {vehicleSelected.vehicle_model}
				</h2>
				<h3>{vehicleSelected.vehicle_color}</h3>
				<h3>{vehicleSelected.vehicle_tag}</h3>
				<h3>{vehicleSelected.vehicle_year}</h3>
				<h3>{vehicleSelected.vehicle_mileage}</h3>
				<h3>{vehicleSelected.vehicle_serial}</h3>
				<h3>
					Edit vehicle info
					<Link to={`/admin/vehicle/edit/${vehicleSelected.vehicle_id}`}>
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
								onChange={(e) => handleCheckBox(service.service_id, e)}
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
				<button className="theme-btn btn-style-one" onClick={handleSubmit}>
					SUBMIT ORDER
				</button>
			</div>
		)}
	</div>
</form>;
