import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import OrderService from "../../../services/order.service";
import { useAuth } from "../../../Contexts/AuthContext";
import classes from "./css/OrdersComponent.module.css";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import Loader from "../Loader";

const OrdersComponent = () => {
  const [Orders, setOrders] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [apiError, setApiError] = useState(false);
  const [apiErrorMessage, setApiErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  //   const [token, setToken] = useState(null);
  const { employee } = useAuth();
  console.log(employee);

  let token = null;
  if (employee) {
    token = employee.employee_token;
  }

  useEffect(() => {
    if (!token) return;
    fetchOrder();
  }, [token]);

  const handleStatusChange = async (num, id) => {
    try {
      setLoading(true);
      const res = await OrderService.changeStatus(token, num, id);
      if (res.ok) {
        console.log("working");
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order.order_id === id ? { ...order, order_status: num } : order
          )
        );
      } else {
        const data1 = await res.json();
        console.log(data1);
      }
      setLoading(false);
    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }
  };
  const fetchOrder = async () => {
    try {
      setLoading(true);
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
        // const data = await res.json();
        const data = await res.json();
        const uniqueOrders = data.data.orders.filter(
          (order, index, self) =>
            index === self.findIndex((o) => o.order_id === order.order_id)
        );
        setOrders(uniqueOrders || []);

        // setOrders(data.data.orders || []);
        setCustomers(data.data.customers || []);
        setEmployees(data.data.employees || []);
        console.log(Orders);
        console.log(customers);
        console.log(employees);
      }
      setLoading(false);
    } catch (err) {
      setApiError(true);
      setApiErrorMessage("An error occurred while fetching services");
      setLoading(false);
    }
  };

  return (
    <div className="admin-right-side-scroller">
      <section className="contact-section">
        <div className="auto-container">
          <div className="contact-title">
            <h2>Orders</h2>
          </div>
          {apiError ? (
            <div className="alert alert-danger">{apiErrorMessage}</div>
          ) : (
            <>
              {loading ? (
                <Loader />
              ) : (
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>Customer</th>
                      <th>Vehicle</th>
                      <th>Order Date</th>
                      <th>Received by</th>
                      <th>Order Status</th>
                      <th>View/Edit</th>
                      <th style={{ width: "70px" }}></th>
                    </tr>
                  </thead>
                  <tbody>
                    {Orders.length > 0 ? (
                      Orders.map((order) => {
                        const customer = customers.find(
                          (cust) => cust.customer_id === order.customer_id
                        );
                        const registeringEmployee = employees.find(
                          (emp) => emp.employee_id === order.employee_id
                        );
                        return (
                          <tr key={order.order_id}>
                            <td>{order.order_id}</td>

                            <td>
                              <b>
                                {`${customer?.customer_first_name} ${customer?.customer_last_name}`}
                              </b>
                              <br />
                              {customer?.customer_email}
                              <br />
                              {customer?.customer_phone_number}
                            </td>
                            <td>
                              {customer?.vehicle_model}
                              <br />
                              {customer?.vehicle_year}
                              <br />
                              {customer?.vehicle_tag}
                            </td>

                            <td>
                              {new Date(order.order_date).toLocaleDateString()}
                            </td>
                            <td>
                              {`${registeringEmployee?.employee_first_name} ${registeringEmployee?.employee_last_name}`}
                            </td>
                            <td>
                              {order?.order_status == 1 && (
                                <div className={classes.decliend}>Decliend</div>
                              )}
                              {order?.order_status == 2 && (
                                <div className={classes.inprogress}>
                                  In progress
                                </div>
                              )}
                              {order?.order_status == 3 && (
                                <div className={classes.completed}>
                                  Completed
                                </div>
                              )}
                            </td>
                            <td>
                              <ion-icon name="create-outline"></ion-icon>/
                              <ion-icon name="trash-outline"></ion-icon>
                            </td>
                            <td>
                              <div>
                                <button
                                  onClick={() =>
                                    handleStatusChange(3, order.order_id)
                                  }
                                >
                                  <CheckCircleIcon />
                                </button>
                                <br />
                                <button
                                  onClick={() =>
                                    handleStatusChange(1, order.order_id)
                                  }
                                >
                                  <CancelIcon />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })
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
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default OrdersComponent;
