import { useEffect, useState } from "react";
import employeeService from "../../../../services/employee.service";
import { useAuth } from "../../../../Contexts/AuthContext";
import { useNavigate, useParams } from "react-router-dom";

/* eslint-disable */
function UpdateForm(props) {
  const navigate = useNavigate();
  const [employee_first_name, setFirstName] = useState("");
  const [employee_last_name, setLastName] = useState("");
  const [employee_phone, setPhoneNumber] = useState("");
  const [active_employee, setActive_employee] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [company_role_id, setCompany_role_id] = useState(1);
  const [singleEmployee, setSingleEmployee] = useState("");
  // Errors
  const [firstNameRequired, setFirstNameRequired] = useState("");
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState("");
  const { id } = useParams();

  let loggedInEmployeeToken = "";
  const { employee } = useAuth();
  if (employee && employee.employee_token) {
    loggedInEmployeeToken = employee.employee_token;
  }

  useEffect(() => {
    if (isChecked) {
      setActive_employee(1);
    } else {
      setActive_employee(0);
    }
    const singleEmployee = employeeService.getSingleEmployee(
      id,
      loggedInEmployeeToken
    );
    singleEmployee
      .then((response) => response.json())
      .then((data) => {
        console.log(data.data[0]);
        setSingleEmployee(data.data[0]);
        setFirstName(data.data[0].employee_first_name);
        setLastName(data.data[0].employee_last_name);
        setPhoneNumber(data.data[0].employee_phone);
        setCompany_role_id(data.data[0].company_role_id);
        // setIsChecked(data.data[0].active_employee === 1);
      });
  }, [id, loggedInEmployeeToken, isChecked]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!employee_first_name) {
      setFirstNameRequired("First name is required");
    } else {
      setFirstNameRequired("");
    }

    const updatedData = {
      employee_first_name,
      employee_last_name,
      employee_phone,
      active_employee,
      company_role_id,
      employee_id: id,
    };

    const updateEmployee = employeeService.updateEmployee(
      updatedData,
      loggedInEmployeeToken
    );
    updateEmployee
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          setServerError(data.error);
        } else {
          setSuccess(true);
          setServerError("");
          setTimeout(() => {
            // window.location.href = "/admin/employees";
            navigate("/admin/employees");
          }, 2000);
        }
      })
      .catch((error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        setServerError(resMessage);
      });
  };

  return (
    <section className="contact-section admin-right-side-scroller">
      <div className="auto-container">
        <div className="contact-title">
          <h2>Edit: {singleEmployee.employee_first_name}</h2>
        </div>
        <div className="row clearfix">
          <div className="form-column col-lg-7">
            <div className="inner-column">
              <div className="contact-form">
                <form onSubmit={handleSubmit}>
                  <div className="row clearfix">
                    <div className="form-group col-md-12">
                      {serverError && (
                        <div className="validation-error" role="alert">
                          {serverError}
                        </div>
                      )}
                      <div>Employee email: {singleEmployee.employee_email}</div>
                    </div>
                    <div className="form-group col-md-12">
                      <input
                        type="text"
                        name="employee_first_name"
                        value={employee_first_name}
                        onChange={(event) => setFirstName(event.target.value)}
                        placeholder="Employee first name"
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
                        name="employee_last_name"
                        value={employee_last_name}
                        onChange={(event) => setLastName(event.target.value)}
                        placeholder="Employee last name"
                        required
                      />
                    </div>

                    <div className="form-group col-md-12">
                      <input
                        type="text"
                        name="employee_phone"
                        value={employee_phone}
                        onChange={(event) => setPhoneNumber(event.target.value)}
                        placeholder="Employee phone (555-555-5555)"
                        required
                      />
                    </div>

                    <div className="form-group col-md-12">
                      <select
                        name="employee_role"
                        value={company_role_id}
                        onChange={(event) =>
                          setCompany_role_id(event.target.value)
                        }
                        className="custom-select-box"
                      >
                        <option value="1">Employee</option>
                        <option value="2">Manager</option>
                        <option value="3">Admin</option>
                      </select>
                    </div>

                    <div className="form-group col-md-12">
                      <input
                        type="checkbox"
                        name="employee_active"
                        checked={isChecked}
                        onChange={(event) => setIsChecked(event.target.checked)}
                      />
                      <label htmlFor="text" className="active-label">
                        Is active employee
                      </label>
                    </div>

                    <div className="form-group col-md-12">
                      <button
                        className="theme-btn btn-style-one"
                        type="submit"
                        data-loading-text="Please wait..."
                      >
                        <span>Update</span>
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

export default UpdateForm;
