import { useState, useEffect } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Table, Button } from "react-bootstrap";
import { format, set } from "date-fns";
import customerService from "../../../../services/customer.service";
import { useAuth } from "../../../../Contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const CustomersList = () => {
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [apiError, setApiError] = useState(false);
  const [apiErrorMessage, setApiErrorMessage] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [customersPerPage] = useState(10);
  const [token, setToken] = useState(null);
  const navigate = useNavigate();
  const { employee } = useAuth();

  // let token = null;
  // if (!token) {
  //   setToken(employee?.employee_token);
  //   // token = employee?.employee_token;
  // }

  useEffect(() => {
    if (!token) setToken(employee?.employee_token);
  }, [token]);

  useEffect(() => {
    if (!token) return;
    const allCustomers = customerService.getAllCustomers(token);
    allCustomers
      .then((res) => {
        if (!res.ok) {
          setApiError(true);
          if (res.status === 401) {
            setApiErrorMessage("Please login to access this page");
          } else if (res.status === 403) {
            setApiErrorMessage("You are not authorized to view this page");
          } else {
            setApiErrorMessage("Please try again later");
          }
        }
        return res.json();
      })
      .then((data) => {
        if (data.data.length !== 0) {
          setCustomers(data.data);
          setFilteredCustomers(data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [token]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    if (e.target.value === "") {
      setFilteredCustomers(customers);
    } else {
      const filtered = customers.filter(
        (customer) =>
          customer.customer_first_name
            .toLowerCase()
            .includes(e.target.value.toLowerCase()) ||
          customer.customer_last_name
            .toLowerCase()
            .includes(e.target.value.toLowerCase()) ||
          customer.customer_email
            .toLowerCase()
            .includes(e.target.value.toLowerCase()) ||
          customer.customer_phone_number.includes(e.target.value)
      );
      setFilteredCustomers(filtered);
    }
  };

  const handleEdit = (customerId) => {
    navigate(`/admin/edit-customer/${customerId}`);
  };

  // components/CustomersList.js

  const handleDelete = async (customerId) => {
    console.log("Attempting to delete customer with ID:", customerId);
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this customer?"
    );
    if (confirmDelete) {
      try {
        const response = await customerService.deleteCustomer(
          customerId,
          token
        );
        console.log(response);

        if (response.ok) {
          // Filter out the deleted customer from the state
          setCustomers(
            customers.filter((customer) => customer.customer_id !== customerId)
          );
          setFilteredCustomers(
            filteredCustomers.filter(
              (customer) => customer.customer_id !== customerId
            )
          );
        } else {
          console.error("Failed to delete customer:", response.statusText);
        }
      } catch (error) {
        console.error("Error deleting customer:", error);
      }
    }
  };

  // Pagination logic
  const indexOfLastCustomer = currentPage * customersPerPage;
  const indexOfFirstCustomer = indexOfLastCustomer - customersPerPage;
  const currentCustomers = filteredCustomers.slice(
    indexOfFirstCustomer,
    indexOfLastCustomer
  );

  const totalPages = Math.ceil(filteredCustomers.length / customersPerPage);

  const nextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const previousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  return (
    <>
      {apiError ? (
        <section className="contact-section">
          <div className="auto-container">
            <div className="contact-title">
              <h2>{apiErrorMessage}</h2>
            </div>
          </div>
        </section>
      ) : (
        <section className="contact-section">
          <div className="auto-container">
            <div className="contact-title">
              <h2>Customers</h2>
              <input
                type="text"
                placeholder="Search for a customer by using first name, last name, email address, or phone number"
                value={searchTerm}
                onChange={handleSearch}
                style={{ marginBottom: "20px", padding: "10px", width: "100%" }}
              />
            </div>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Added Date</th>
                  <th>Active</th>
                  <th>Edit/Delete</th>
                </tr>
              </thead>
              <tbody>
                {currentCustomers.map((customer) => (
                  <tr key={customer.customer_id}>
                    <td>{customer.customer_id}</td>
                    <td>{customer.customer_first_name}</td>
                    <td>{customer.customer_last_name}</td>
                    <td>{customer.customer_email}</td>
                    <td>{customer.customer_phone_number}</td>
                    <td>
                      {format(
                        new Date(customer.customer_added_date),
                        "MM-dd-yyyy | kk:mm"
                      )}
                    </td>
                    <td>
                      {customer.active_customer_status === 1 ? "Yes" : "No"}
                    </td>
                    <td>
                      <Button
                        variant="white"
                        onClick={() => handleEdit(customer.customer_id)}
                        style={{ marginRight: "10px" }}
                      >
                        <FaEdit />
                      </Button>
                      <Button
                        variant="white"
                        onClick={() => handleDelete(customer.customer_id)}
                      >
                        <MdDelete size={20} />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Button
                variant="primary"
                onClick={previousPage}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              <Button
                variant="primary"
                onClick={nextPage}
                disabled={currentPage === totalPages}
              >
                Next for more
              </Button>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default CustomersList;
