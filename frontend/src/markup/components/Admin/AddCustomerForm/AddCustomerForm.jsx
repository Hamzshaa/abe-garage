import { useState } from "react";
import { useAuth } from "../../../../Contexts/AuthContext";
import customerService from "../../../../services/customer.service";

function AddCustomerForm(props) {
	const [customer_email, setEmail] = useState("");
	const [customer_phone_number, setPhoneNumber] = useState("");
	const [customer_first_name, setFirstName] = useState("");
	const [customer_last_name, setLastName] = useState("");
	const [customer_hash, setHash] = useState(""); // You might want to generate a hash value
	const [active_customer_status, setActiveCustomerStatus] = useState(1);

	const [emailError, setEmailError] = useState("");
	const [firstNameRequired, setFirstNameRequired] = useState("");
	const [serverError, setServerError] = useState("");
	const [success, setSuccess] = useState(false);

	const { employee } = useAuth();

	const handleSubmit = (e) => {
		e.preventDefault();
		let valid = true;

		if (!customer_first_name) {
			setFirstNameRequired("First name is required");
			valid = false;
		} else {
			setFirstNameRequired("");
		}

		if (!customer_email) {
			setEmailError("Email is required");
			valid = false;
		} else if (!customer_email.includes("@")) {
			setEmailError("Invalid email format");
			valid = false;
		} else {
			const regex = /^\S+@\S+\.\S+$/;
			if (!regex.test(customer_email)) {
				setEmailError("Invalid email format");
				valid = false;
			} else {
				setEmailError("");
			}
		}

		if (!valid) {
			return;
		}

		const formData = {
			customer_email,
			customer_phone_number,
			customer_first_name,
			customer_last_name,
			active_customer_status,
			customer_hash,
		};

		if (employee && employee.employee_token) {
			customerService
				.createCustomer(formData, employee.employee_token)
				.then((response) => response.json())
				.then((data) => {
					if (data.error) {
						setServerError(data.error);
					} else {
						setSuccess(true);
						setServerError("");
						setTimeout(() => {
							setSuccess(false);
						}, 3000); // Hide success message after 3 seconds
					}
				})
				.catch((error) => {
					const resMessage = error.message || error.toString();
					setServerError(resMessage);
				});
		} else {
			setServerError("No token available");
		}
	};

	return (
		<section className="contact-section">
			<div className="auto-container">
				<div className="contact-title">
					<h2>Add a new customer</h2>
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
										{success && (
											<div
												className="validation-success"
												role="alert"
												style={{ color: "green", marginBottom: "10px" }}
											>
												Customer is added successfully!
											</div>
										)}
										<div className="form-group col-md-12">
											<input
												type="email"
												name="customer_email"
												value={customer_email}
												onChange={(event) => setEmail(event.target.value)}
												placeholder="Customer email"
											/>
											{emailError && (
												<div className="validation-error" role="alert">
													{emailError}
												</div>
											)}
										</div>
										<div className="form-group col-md-12">
											<input
												type="text"
												name="customer_first_name"
												value={customer_first_name}
												onChange={(event) => setFirstName(event.target.value)}
												placeholder="Customer first name"
											/>
											{firstNameRequired && (
												<div className="validation-error" role="alert">
													{firstNameRequired}
												</div>
											)}
										</div>
										<div className="form-group col-md-12">
											<input
												type="text"
												name="customer_last_name"
												value={customer_last_name}
												onChange={(event) => setLastName(event.target.value)}
												placeholder="Customer last name"
												required
											/>
										</div>
										<div className="form-group col-md-12">
											<input
												type="text"
												name="customer_phone_number"
												value={customer_phone_number}
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
												<span>Add customer</span>
											</button>
										</div>
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

export default AddCustomerForm;
