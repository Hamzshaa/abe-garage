const api_url = import.meta.env.VITE_REACT_APP_API_URL;

const editCustomer = async (customerId, formData, token) => {
	console.log("customerId");
	console.log(formData);
	console.log(token);
	const requestOptions = {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
			"x-access-token": token,
		},
		body: JSON.stringify(formData),
	};
	const response = await fetch(
		`${api_url}/api/customer/${customerId}`,
		requestOptions
	);
	console.log(response);
	return response;
};

const getCustomerById = async (customerId, token) => {
	const requestOptions = {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			"x-access-token": token,
		},
	};
	const response = await fetch(
		`${api_url}/api/customer/${customerId}`,
		requestOptions
	);
	const data = await response.json();
	console.log(data);
	return data;
};

const editCustomerService = {
	editCustomer,
	getCustomerById,
};

export default editCustomerService;
