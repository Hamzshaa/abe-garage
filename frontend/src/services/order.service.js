const api_url = import.meta.env.VITE_REACT_APP_API_URL;

const getAllOrder = async (token) => {
  console.log("Token:", token);
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
  };
  const response = await fetch(`${api_url}/api/orders`, requestOptions);
  console.log("response:", requestOptions);

  return response;
};

const OrderService = {
  getAllOrder,
};
export default OrderService;
