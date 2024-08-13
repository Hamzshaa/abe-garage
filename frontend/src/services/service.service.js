const api_url = import.meta.env.VITE_REACT_APP_API_URL;

// A function to send post request to create a new employee
const createService = async (formData, loggedInEmployeeToken) => {
  // console.log("Logged in token: ", loggedInEmployeeToken);
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": loggedInEmployeeToken,
    },
    body: JSON.stringify(formData),
  };
  console.log(requestOptions);
  const response = await fetch(`${api_url}/api/service`, requestOptions);
  return response;
};
const getAllServices = async (token) => {
  // console.log(token);
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
  };
  const response = await fetch(`${api_url}/api/services`, requestOptions);
  // console.log(response);
  return response;
};
const deactivateService = async (service_id, token) => {
  // console.log("Deleting service with ID:", service_id);
  const requestOptions = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
  };
  const response = await fetch(
    `${api_url}/api/service/${service_id}`,
    requestOptions
  );
  if (!response.ok) {
    const error = await response.text();
    console.error("Error deleting service:", error);
  }
  console.log("Response:", response);
  return response;
};
const updateService = async (formData, token) => {
  // console.log("Updating service with ID:", formData);
  const requestOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
    body: JSON.stringify(formData),
  };
  const response = await fetch(`${api_url}/api/service`, requestOptions);
  // console.log(response);
  if (!response.ok) {
    const error = await response.text();
    console.error("Error updating service:", error);
  }
  console.log("Response:", response);
  return response;
};

// service.service.js
const ServiceService = {
  createService,
  getAllServices,
  deactivateService,
  updateService,
};
export default ServiceService;
