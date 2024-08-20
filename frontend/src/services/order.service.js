const api_url = import.meta.env.VITE_REACT_APP_API_URL;

const getAllOrder = async (token) => {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
  };
  const response = await fetch(`${api_url}/api/orders`, requestOptions);
  console.log(response);
  return response;
};
const ordersService = {
  getAllOrder,
};
export default ordersService;
