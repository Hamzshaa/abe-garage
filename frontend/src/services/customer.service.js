const api_url = import.meta.env.VITE_REACT_APP_API_URL;

const createCustomer = async (formData, loggedInEmployeeToken) => {
	console.log("Logged in token: ", loggedInEmployeeToken);
	const requestOptions = {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"x-access-token": loggedInEmployeeToken,
		},
		body: JSON.stringify(formData),
	};
	console.log(requestOptions);
	const response = await fetch(`${api_url}/api/customer`, requestOptions);
	return response;
};

const getAllCustomers = async (token) => {
	const requestOptions = {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			"x-access-token": token,
		},
	};
	const response = await fetch(`${api_url}/api/customers`, requestOptions);
	return response;
};

const deleteCustomer = async (customerId, token) => {
	const requestOptions = {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
			"x-access-token": token,
		},
	};
	const response = await fetch(
		`${api_url}/api/customer/${customerId}`,
		requestOptions
	);

	return response;
};

const customerService = {
	createCustomer,
	getAllCustomers,
	deleteCustomer,
};

export default customerService;
