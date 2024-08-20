const api_url = import.meta.env.VITE_REACT_APP_API_URL;

const getVehicles = async (id, token) => {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
  };
  const response = await fetch(`${api_url}/api/vehicles/${id}`, requestOptions);
  return response;
};
const vehiclesService = {
  getVehicles,
};
export default vehiclesService;
