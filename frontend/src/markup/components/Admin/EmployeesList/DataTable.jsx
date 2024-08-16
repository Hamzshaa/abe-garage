// Import the necessary components
import React, { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
// Import the auth hook
import { useAuth } from "../../../../Contexts/AuthContext";
// Import the date-fns library
import { format } from "date-fns"; // To properly format the date on the table
// Import the getAllEmployees function
import employeeService from "../../../../services/employee.service";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

// Create the EmployeesList component
const EmployeesList = () => {
	// Create all the states we need to store the data
	// Create the employees state to store the employees data
	const [employees, setEmployees] = useState([]);
	// A state to serve as a flag to show the error message
	const [apiError, setApiError] = useState(false);
	// A state to store the error message
	const [apiErrorMessage, setApiErrorMessage] = useState(null);
	// To get the logged in employee token
	const { employee } = useAuth();
	let token = null; // To store the token
	if (employee) {
		token = employee.employee_token;
	}

	useEffect(() => {
		// Call the getAllEmployees function
		const allEmployees = employeeService.getAllEmployees(token);
		allEmployees
			.then((res) => {
				if (!res.ok) {
					console.log(res.status);
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
				}
			})
			.catch((err) => {
				// console.log(err);
			});
	}, []);

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
				<>
					<section className="contact-section">
						<div className="auto-container">
							<div className="contact-title">
								<h2>Employees</h2>
							</div>
							<Table striped bordered hover>
								<thead>
									<tr>
										<th>Active</th>
										<th>First Name</th>
										<th>Last Name</th>
										<th>Email</th>
										<th>Phone</th>
										<th>Added Date</th>
										<th>Role</th>
										<th>Edit/Delete</th>
									</tr>
								</thead>
								<tbody>
									{employees.map((employee) => (
										<tr key={employee.employee_id}>
											<td>{employee.active_employee ? "Yes" : "No"}</td>
											<td>{employee.employee_first_name}</td>
											<td>{employee.employee_last_name}</td>
											<td>{employee.employee_email}</td>
											<td>{employee.employee_phone}</td>
											<td>
												{format(
													new Date(employee.added_date),
													"MM -  dd - yyyy | kk:mm"
												)}
											</td>
											<td>{employee.company_role_name}</td>
											<td>
												<div className="edit-delete-icons">
													<Link
														to={`/admin/employee/edit/${employee.employee_id}`}
													>
														<FaEdit />
													</Link>
													| <MdDelete size={20} />
												</div>
											</td>
										</tr>
									))}
								</tbody>
							</Table>
						</div>
					</section>
				</>
			)}
		</>
	);
};

// Export the EmployeesList component
export default EmployeesList;

// import { useEffect, useState } from "react";
// import employeeService from "../../../../services/employee.service";
// import { useAuth } from "../../../../Contexts/AuthContext";
// import { useParams } from "react-router-dom";

// /* eslint-disable */
// function UpdateForm(props) {
// 	const [employee_first_name, setFirstName] = useState("");
// 	const [employee_last_name, setLastName] = useState("");
// 	const [employee_phone, setPhoneNumber] = useState("");
// 	const [active_employee, setActive_employee] = useState("");
// 	const [isChecked, setIsChecked] = useState(false);
// 	const [company_role_id, setCompany_role_id] = useState(1);
// 	const [singleEmployee, setSingleEmployee] = useState("");
// 	// Errors
// 	const [firstNameRequired, setFirstNameRequired] = useState("");
// 	const [success, setSuccess] = useState(false);
// 	const [serverError, setServerError] = useState("");
// 	const { id } = useParams();

// 	let loggedInEmployeeToken = "";
// 	const { employee } = useAuth();
// 	// console.log(employee);
// 	if (employee && employee.employee_token) {
// 		loggedInEmployeeToken = employee.employee_token;
// 	}
// 	useEffect(() => {
// 		if (isChecked) {
// 			setActive_employee(1);
// 		} else {
// 			setActive_employee(0);
// 		}
// 		const singleEmployee = employeeService.getSingleEmployee(
// 			id,
// 			loggedInEmployeeToken
// 		);
// 		singleEmployee
// 			.then((response) => response.json())
// 			.then((data) => {
// 				console.log(data.data[0]);
// 				setSingleEmployee(data.data[0]);
// 			});
// 	}, [isChecked]);
// 	const handleSubmit = (e) => {
// 		// Prevent the default behavior of the form
// 		e.preventDefault();

// 		if (!employee_first_name) {
// 			setFirstNameRequired("First name is required");
// 		} else {
// 			setFirstNameRequired("");
// 		}

// 		console.log(active_employee);
// 		const updatedData = {
// 			employee_first_name,
// 			employee_last_name,
// 			employee_phone,
// 			active_employee,
// 			company_role_id,
// 			employee_id: id,
// 		};
// 		// console.log(updatedData);

// 		// // Pass the form data to the service
// 		const updatEmployee = employeeService.updateEmployee(
// 			updatedData,
// 			loggedInEmployeeToken
// 		);
// 		updatEmployee
// 			.then((response) => response.json())
// 			.then((data) => {
// 				// console.log(data);
// 				// If Error is returned from the API server, set the error message
// 				if (data.error) {
// 					setServerError(data.error);
// 				} else {
// 					// Handle successful response
// 					setSuccess(true);
// 					setServerError("");
// 					// Redirect to the employees page after 2 seconds
// 					setTimeout(() => {
// 						window.location.href = "/admin/employees";
// 						// window.location.href = "/";
// 					}, 2000);
// 				}
// 			})
// 			// Handle Catch
// 			.catch((error) => {
// 				const resMessage =
// 					(error.response &&
// 						error.response.data &&
// 						error.response.data.message) ||
// 					error.message ||
// 					error.toString();
// 				setServerError(resMessage);
// 				// setServerError("rovl");
// 			});
// 	};

// 	return (
// 		<section className="contact-section">
// 			<div className="auto-container">
// 				<div className="contact-title">
// 					<h2>Edit: {singleEmployee.employee_first_name}</h2>
// 				</div>
// 				<div className="row clearfix">
// 					<div className="form-column col-lg-7">
// 						<div className="inner-column">
// 							<div className="contact-form">
// 								<form onSubmit={handleSubmit}>
// 									<div className="row clearfix">
// 										<div className="form-group col-md-12">
// 											{serverError && (
// 												<div className="validation-error" role="alert">
// 													{serverError}
// 												</div>
// 											)}
// 											<div>Employee email: {singleEmployee.employee_email}</div>
// 										</div>
// 										<div className="form-group col-md-12">
// 											<input
// 												type="text"
// 												name="employee_first_name"
// 												value={employee_first_name}
// 												onChange={(event) => setFirstName(event.target.value)}
// 												placeholder="Employee first name"
// 											/>
// 											{firstNameRequired && (
// 												<div className="validation-error" role="alert">
// 													{firstNameRequired}
// 												</div>
// 											)}
// 										</div>

// 										<div className="form-group col-md-12">
// 											<input
// 												type="text"
// 												name="employee_last_name"
// 												value={employee_last_name}
// 												onChange={(event) => setLastName(event.target.value)}
// 												placeholder="Employee last name"
// 												required
// 											/>
// 										</div>

// 										<div className="form-group col-md-12">
// 											<input
// 												type="text"
// 												name="employee_phone"
// 												value={employee_phone}
// 												onChange={(event) => setPhoneNumber(event.target.value)}
// 												placeholder="Employee phone (555-555-5555)"
// 												required
// 											/>
// 										</div>

// 										<div className="form-group col-md-12">
// 											<select
// 												name="employee_role"
// 												value={company_role_id}
// 												onChange={(event) =>
// 													setCompany_role_id(event.target.value)
// 												}
// 												className="custom-select-box"
// 											>
// 												<option value="1">Employee</option>
// 												<option value="2">Manager</option>
// 												<option value="3">Admin</option>
// 											</select>
// 										</div>

// 										<div className="form-group col-md-12">
// 											<input
// 												type="checkbox"
// 												name="employee_password"
// 												checked={isChecked}
// 												onChange={(event) => setIsChecked(event.target.checked)}
// 											/>
// 											<label htmlFor="text" className="active-label">
// 												Is active employee
// 											</label>
// 										</div>

// 										<div className="form-group col-md-12">
// 											<button
// 												className="theme-btn btn-style-one"
// 												type="submit"
// 												data-loading-text="Please wait..."
// 											>
// 												<span>Update</span>
// 											</button>
// 										</div>
// 									</div>
// 								</form>
// 							</div>
// 						</div>
// 					</div>
// 				</div>
// 			</div>
// 		</section>
// 	);
// }

// export default UpdateForm;
