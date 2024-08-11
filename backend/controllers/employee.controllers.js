// Import the employee service
const employeeService = require("../services/employee.service");
// Create the add employee controller
async function createEmployee(req, res, next) {
	// console.log(req.headers);

	// Check if employee email already exists in the database
	const employeeExists = await employeeService.checkIfEmployeeExists(
		req.body.employee_email
	);
	// If employee exists, send a response to the client
	if (employeeExists) {
		res.status(400).json({
			error: "This email address is already associated with another employee!",
		});
	} else {
		try {
			const employeeData = req.body;
			// Create the employee
			const employee = await employeeService.createEmployee(employeeData);
			if (!employee) {
				res.status(400).json({
					error: "Failed to add the employee!",
				});
			} else {
				res.status(200).json({
					success: "true",
				});
			}
		} catch (error) {
			console.log(err);
			res.status(400).json({
				error: "Something went wrong!",
			});
		}
	}
}

// Create the getAllEmployees controller
async function getAllEmployees(req, res, next) {
	// Call the getAllEmployees method from the employee service
	const employees = await employeeService.getAllEmployees();
	// console.log(employees);
	if (!employees) {
		res.status(400).json({
			error: "Failed to get all employees!",
		});
	} else {
		res.status(200).json({
			status: "success",
			data: employees,
		});
	}
}
async function getEmployeeById(req, res, next) {
	const employee = await employeeService.getEmployeeById(req, res);
	try {
		if (!employee) {
			res.status(400).json({
				error: "Employee not found!",
			});
		} else {
			res.status(200).json({
				status: "success",
				data: employee,
			});
		}
	} catch (error) {
		res.status(500).json({
			error: "Internal Server Error",
		});
	}
}
async function updateEmployee(req, res, next) {
	const updatedEmployeeData = req.body;
	try {
		const result = await employeeService.updateEmployee(updatedEmployeeData);
		if (!result) {
			return res.status(400).json({
				error: "Failed to update employee!",
			});
		}
		res.status(200).json({
			success: "true",
			message: "Employee updated successfully",
		});
	} catch (error) {
		res.status(500).json({
			error: "Internal Server Error",
		});
		// console.log("controller error",error)
	}
}
async function deleteEmployee(req, res, next) {
	const removeEmployee = await employeeService.deleteEmployee(req, res);
	try {
		if (!removeEmployee) {
			return res.status(400).json({
				error: "Employee not found or already deleted!",
			});
		}
		res.status(200).json({
			success: "true",
			message: "Employee deleted successfully",
		});
	} catch (error) {
		res.status(500).json({
			error: "Internal Server Error",
		});
	}
}

// Export the createEmployee controller
module.exports = {
	createEmployee,
	getAllEmployees,
	getEmployeeById,
	updateEmployee,
	deleteEmployee,
};
