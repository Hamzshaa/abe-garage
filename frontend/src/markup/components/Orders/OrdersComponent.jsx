import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import OrderService from "../../../services/order.service";
import { useAuth } from "../../../Contexts/AuthContext";

const OrdersComponent = () => {
  const [Orders, setOrders] = useState([]);
  const [apiError, setApiError] = useState(false);
  const [apiErrorMessage, setApiErrorMessage] = useState(null);
  //   const [token, setToken] = useState(null);
  const { employee } = useAuth();

  let token = null;
  if (employee) {
    token = employee.employee_token;
  }

  useEffect(() => {
    if (!token) return;
    fetchOrder();
  }, [token]);

  const fetchOrder = async () => {
    try {
      const res = await OrderService.getAllOrder(token);
      console.log(res);
      if (!res.ok) {
        setApiError(true);
        switch (res.status) {
          case 401:
            setApiErrorMessage("Please login again");
            break;
          case 403:
            setApiErrorMessage("You are not authorized to view this page");
            break;
          default:
            setApiErrorMessage("Please try again later");
        }
      } else {
        const data = await res.json();
        setOrders(data.data || []);
      }
    } catch (err) {
      setApiError(true);
      setApiErrorMessage("An error occurred while fetching services");
    }
  };

  return (
    <div>
      <section className="contact-section">
        <div className="auto-container">
          <div className="contact-title">
            <h2>Orders</h2>
          </div>
          {apiError ? (
            <div className="alert alert-danger">{apiErrorMessage}</div>
          ) : (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer ID</th>
                  <th>Vehicle ID</th>
                  <th>Order Date</th>
                  <th>Received by</th>
                  <th>Order Status</th>
                  <th>Edit/Delete</th>
                </tr>
              </thead>
              <tbody>
                {Orders.length > 0 ? (
                  Orders.map((order) => (
                    <tr key={order.order_id}>
                      <td>{order.order_id}</td>
                      <td>{order.customer_id}</td>
                      <td>{order.vehicle_id}</td>
                      <td>{new Date(order.order_date).toLocaleDateString()}</td>
                      <td>{order.employee_id}</td>
                      <td>{order.order_status}</td>
                      <td>
                        <ion-icon name="create-outline"></ion-icon>/
                        <ion-icon name="trash-outline"></ion-icon>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center">
                      No Orders Found
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          )}
        </div>
      </section>
    </div>
  );
};

export default OrdersComponent;
