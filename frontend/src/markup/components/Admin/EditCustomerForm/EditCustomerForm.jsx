import { useState, useEffect } from "react";
import { useAuth } from "../../../../Contexts/AuthContext";
import editCustomerService from "../../../../services/editcustomer.service";
import { useParams, useNavigate } from "react-router-dom";

function EditCustomerForm() {
    const [customer, setCustomer] = useState();
    const [first_name, setFirstName] = useState("");
    const [last_name, setLastName] = useState("");
    const [phone_number, setPhoneNumber] = useState("");
    const [success, setSuccess] = useState(false);
    const [serverError, setServerError] = useState("");

    const { customerId } = useParams();
    const { employee } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (employee && customerId) {
            editCustomerService
                .getCustomerById(customerId, employee.employee_token)
                .then((data) => {
                    console.log(data);
                    setCustomer(data);
                    setFirstName(data.data?.customer_first_name);
                    setLastName(data.data?.customer_last_name);
                    setPhoneNumber(data.data?.customer_phone_number);
                })
                .catch((err) => {
                    console.log(err);
                    setServerError("Failed to fetch customer details.");
                });
        }
    }, [customerId, employee]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = {
            first_name,
            last_name,
            phone_number,
        };

        if (employee) {
            editCustomerService
                .editCustomer(customerId, formData, employee.employee_token)
                .then((response) => response.json())
                .then((data) => {
                    if (data.error) {
                        setServerError(data.error);
                    } else {
                        setSuccess(true);
                        setServerError("");
                        setTimeout(() => {
                            navigate("/admin/customers");
                        }, 2000); // Adjusted navigation path
                    }
                })
                .catch((error) => {
                    setServerError(error.message || "An error occurred.");
                });
        }
    };

    if (!customer) return <div>Loading...</div>;

    return (
        <section className="contact-section">
            <div className="auto-container">
                <div className="contact-title">
                    <h2>Edit customer: {customer.data.customer_first_name} {customer.data.customer_last_name}</h2>
                    <p>Customer email: {customer.data.customer_email}</p>
                </div>
                <div className="row clearfix">
                    <div className="form-column col-lg-7">
                        <div className="inner-column">
                            <div className="contact-form">
                                <form onSubmit={handleSubmit}>
                                    <div className="row clearfix">
                                        {serverError && (
                                            <div className="validation-error" role="alert">
                                                {serverError}
                                            </div>
                                        )}
                                        <div className="form-group col-md-12">
                                            <input
                                                type="text"
                                                name="customer_first_name"
                                                value={first_name}
                                                onChange={(event) => setFirstName(event.target.value)}
                                                placeholder="Customer first name"
                                                required
                                            />
                                        </div>
                                        <div className="form-group col-md-12">
                                            <input
                                                type="text"
                                                name="customer_last_name"
                                                value={last_name}
                                                onChange={(event) => setLastName(event.target.value)}
                                                placeholder="Customer last name"
                                                required
                                            />
                                        </div>
                                        <div className="form-group col-md-12">
                                            <input
                                                type="text"
                                                name="customer_phone_number"
                                                value={phone_number}
                                                onChange={(event) => setPhoneNumber(event.target.value)}
                                                placeholder="Customer phone (555-555-5555)"
                                                required
                                            />
                                        </div>
                                        <div className="form-group col-md-12">
                                            <button
                                                className="theme-btn btn-style-one"
                                                type="submit"
                                                data-loading-text="Please wait..."
                                            >
                                                <span>Update customer</span>
                                            </button>
                                        </div>
                                        {success && (
                                            <div className="validation-success" role="alert">
                                                Customer updated successfully!
                                            </div>
                                        )}
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default EditCustomerForm;
