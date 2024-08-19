const api_url = import.meta.env.VITE_REACT_APP_API_URL;

const getOrder = async (token) => {
	const requestOptions = {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			"x-access-token": token,
		},
	};
	const response = await fetch(`${api_url}/api/orders`, requestOptions);
	return response;
};
const ordersService = {
	getOrder,
};
export default ordersService;
