// Import from the env
const api_url = import.meta.env.VITE_REACT_APP_API_URL;

// A function to send post request to create a new employee
const createEmployee = async (formData, loggedInEmployeeToken) => {
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
  const response = await fetch(`${api_url}/api/employee`, requestOptions);

  return response;
};

// A function to send get request to get all employees
const getAllEmployees = async (token) => {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
  };
  const response = await fetch(`${api_url}/api/employees`, requestOptions);
  console.log(response);
  return response;
};
const getSingleEmployee = async (id, token) => {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
  };
  const response = await fetch(`${api_url}/api/employee/${id}`, requestOptions);
  return response;
};
const updateEmployee = async (updatdData, loggedInEmployeeToken) => {
  const requestOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": loggedInEmployeeToken,
    },
    body: JSON.stringify(updatdData),
  };
  const response = await fetch(`${api_url}/api/employee`, requestOptions);
  return response;
};
// Export all the functions
const employeeService = {
  createEmployee,
  getAllEmployees,
  updateEmployee,
  getSingleEmployee,
};
export default employeeService;
