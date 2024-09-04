import React, { useState, useEffect } from "react";
import { useAuth } from "../../../../Contexts/AuthContext";
import customerService from "../../../../services/customer.service";
import { useNavigate, Link, useParams } from "react-router-dom";
import vehiclesService, {
  addVehicle,
} from "../../../../services/vehicle.service";
import ordersService from "../../../../services/order.service";
import { IoClose } from "react-icons/io5";

function CustomerDetail() {
  const [customer, setCustomer] = useState("");
  const [vehicles, setVehicles] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loadingCustomer, setLoadingCustomer] = useState(true);
  const [loadingVehicles, setLoadingVehicles] = useState(true);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [showAddVehicle, setShowAddVehicle] = useState(false);
  const [error, setError] = useState(null); // To track any errors
  const navigate = useNavigate();
  const { customerId } = useParams(); // Fetch ID from route params
  const [newVehicle, setNewVehicle] = useState({
    customer_id: customerId,
    vehicle_year: "",
    vehicle_make: "",
    vehicle_model: "",
    vehicle_type: "",
    vehicle_mileage: "",
    vehicle_tag: "",
    vehicle_serial: "",
    vehicle_color: "",
  });

  const { employee } = useAuth();
  let loggedInEmployeeToken = employee?.employee_token || "";

  useEffect(() => {
    const fetchCustomerAndRelatedData = async () => {
      try {
        // Fetch customer data
        const customerResponse = await customerService.getCustomerById(
          customerId,
          loggedInEmployeeToken
        );
        if (!customerResponse.ok) {
          throw new Error("Failed to fetch customer data");
        }
        const customerData = await customerResponse.json();
        setCustomer(customerData.data);
        setLoadingCustomer(false);

        // Fetch vehicles
        const vehicleResponse = await vehiclesService.getVehicles(
          customerId,
          loggedInEmployeeToken
        );
        if (!vehicleResponse.ok) {
          throw new Error("Failed to fetch vehicle data");
        }
        const vehicleData = await vehicleResponse.json();
        setVehicles(vehicleData.vehicles || []);
        setLoadingVehicles(false);

        // Fetch orders
        const orderResponse = await ordersService.getAllOrder(
          loggedInEmployeeToken
        );
        if (!orderResponse.ok) {
          throw new Error("Failed to fetch order data");
        }
        const orderData = await orderResponse.json();
        // console.log(orderData.data);
        setOrders(orderData.data || []); // Assuming the API returns an array of orders
        setLoadingOrders(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message);
        setLoadingCustomer(false);
        setLoadingVehicles(false);
        setLoadingOrders(false);
      }
    };
    fetchCustomerAndRelatedData();
  }, [customerId, loggedInEmployeeToken]);

  const handleVehicleChange = (e) => {
    setNewVehicle((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleVehicleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await addVehicle(newVehicle, loggedInEmployeeToken);

      console.log(data);

      if (data?.data) {
        setVehicles((prev) => [...prev, data.data]);
        setNewVehicle({
          customer_id: customerId,
          vehicle_year: "",
          vehicle_make: "",
          vehicle_model: "",
          vehicle_type: "",
          vehicle_mileage: "",
          vehicle_tag: "",
          vehicle_serial: "",
          vehicle_color: "",
        });
        setShowAddVehicle(false);
      } else {
        console.log(data.error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (loadingCustomer) {
    return <p>Loading customer details...</p>;
  }

  // if (error) {
  // 	return <p>Error: {error}</p>;
  // }

  if (!customer) {
    return <p>No customer data found.</p>;
  }

  return (
    <div>
      <main className="content-container">
        <div className="vertical-labels">
          <div className="label info-label">Info</div>
          <div className="vl"></div>
          <div className="label cars-label">Cars</div>
          <div className="vl"></div>
          <div className="label orders-label">Orders</div>
        </div>

        <div className="content">
          <div className="customer-info">
            <h2>Customer: {customer.customer_first_name}</h2>
            <p>Email: {customer.customer_email}</p>
            <p>Phone Number: {customer.customer_phone_number}</p>
            <p>
              Active Customer: {customer.active_customer_status ? "Yes" : "No"}
            </p>
            <button className="edit-customer-btn">
              <Link
                to={`/admin/edit-customer/${customerId}`}
                className="edit-customer-link"
              >
                Edit customer info
              </Link>
            </button>
          </div>

          <div className="vehicle-info">
            <h3>Vehicles of {customer.customer_first_name}</h3>
            {loadingVehicles ? (
              <p>Loading vehicles...</p>
            ) : (
              <div
                className="vehicle-list"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                  alignItems: "start",
                }}
              >
                {vehicles.length > 0 ? (
                  vehicles.map((vehicle) => (
                    <div
                      key={vehicle.vehicle_id}
                      className="vehicle-item"
                      style={{
                        display: "flex",
                        gap: "20px",
                      }}
                    >
                      <p>Make: {vehicle.vehicle_make}</p>
                      <p>Model: {vehicle.vehicle_model}</p>
                      <p>Year: {vehicle.vehicle_year}</p>
                    </div>
                  ))
                ) : (
                  <p>No vehicles found for this customer.</p>
                )}
              </div>
            )}
            {!showAddVehicle && (
              <button
                className="add-vehicle-btn"
                onClick={() => setShowAddVehicle(true)}
              >
                Add New Vehicle
              </button>
            )}
          </div>

          {showAddVehicle && (
            <div className="add-vehicle">
              <h3>Add a new vehicle</h3>
              <form className="add-vehicle-form" onSubmit={handleVehicleSubmit}>
                <input
                  type="text"
                  placeholder="Vehicle year"
                  onChange={handleVehicleChange}
                  value={newVehicle.vehicle_year}
                  name="vehicle_year"
                />
                <input
                  type="text"
                  placeholder="Vehicle make"
                  onChange={handleVehicleChange}
                  value={newVehicle.vehicle_make}
                  name="vehicle_make"
                />
                <input
                  type="text"
                  placeholder="Vehicle model"
                  onChange={handleVehicleChange}
                  value={newVehicle.vehicle_model}
                  name="vehicle_model"
                />
                <input
                  type="text"
                  placeholder="Vehicle type"
                  onChange={handleVehicleChange}
                  value={newVehicle.vehicle_type}
                  name="vehicle_type"
                />
                <input
                  type="text"
                  placeholder="Vehicle mileage"
                  onChange={handleVehicleChange}
                  value={newVehicle.vehicle_mileage}
                  name="vehicle_mileage"
                />
                <input
                  type="text"
                  placeholder="Vehicle tag"
                  onChange={handleVehicleChange}
                  value={newVehicle.vehicle_tag}
                  name="vehicle_tag"
                />
                <input
                  type="text"
                  placeholder="Vehicle serial"
                  onChange={handleVehicleChange}
                  value={newVehicle.vehicle_serial}
                  name="vehicle_serial"
                />
                <input
                  type="text"
                  placeholder="Vehicle color"
                  onChange={handleVehicleChange}
                  value={newVehicle.vehicle_color}
                  name="vehicle_color"
                />
                <button type="submit">ADD VEHICLE</button>
              </form>
              <div
                className="add-vehicle-close-btn"
                onClick={() => setShowAddVehicle(false)}
              >
                <IoClose size="28" color="white" />
              </div>
            </div>
          )}

          <div className="orders-info">
            <h3>Orders of {customer.customer_first_name}</h3>
            {loadingOrders ? (
              <p>Loading orders...</p>
            ) : (
              <div className="order-list">
                {/* {orders.length <= 0 ? ( */}
                {orders
                  .filter((order) => order.customer_id == customerId)
                  .map((order) => (
                    <div key={order.order_id} className="order-item">
                      <p>Order ID: {order.order_id}</p>
                      <p>Order Date: {order.order_date}</p>
                      <p>Order Status: {order.order_status}</p>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default CustomerDetail;
