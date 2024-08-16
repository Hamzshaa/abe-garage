import React, { useState, useEffect } from "react";
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

	const { employee } = useAuth();
	let token = null;
	if (employee) {
		token = employee.employee_token;
	}

	useEffect(() => {
		const allEmployees = employeeService.getAllEmployees(token);
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
				if (data.data.length !== 0) {
					setEmployees(data.data);
					setFilteredEmployees(data.data);
				}
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	useEffect(() => {
		setFilteredEmployees(
			employees.filter((employee) =>
				`${employee.employee_first_name} ${employee.employee_last_name} ${employee.employee_email} ${employee.employee_phone}`
					.toLowerCase()
					.includes(searchText.toLowerCase())
			)
		);
	}, [searchText, employees]);

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

	const rows = filteredEmployees.map((employee) => ({
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
