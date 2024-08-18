import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ServiceService from "../../../../services/service.service";
import AdminMenu from "../EmployeesList/AdminMenu/AdminMenu";
import { useAuth } from "../../../../Contexts/AuthContext";

const EditService = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const service = location.state?.service;

  const [service_name, setServiceName] = useState(service?.service_name || "");
  const [service_description, setServiceDescription] = useState(
    service?.service_description || ""
  );
  const [serverError, setServerError] = useState("");
  const [success, setSuccess] = useState(false);
  const { employee } = useAuth();
  let token = employee?.employee_token;
  const service_id = service?.service_id;
  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!service_name) {
      setServerError("Service name is required");
      return;
    }

    const formData = { service_name, service_description, service_id };
    try {
      const res = await ServiceService.updateService(formData, token);
      const data = await res.json();
      if (data.error) {
        setServerError(data.error);
      } else {
        setSuccess(true);
        setServerError("");
        setTimeout(() => {
          navigate("/admin/services"); // Redirect back to the services list
        }, 2000);
      }
    } catch (error) {
      setServerError("Failed to update service. Please try again.");
    }
  };

  return (
    <div>
      <div className="container-fluid admin-pages">
        <div className="row">
          <div className="col-md-3 admin-left-side">
            <AdminMenu />
          </div>
          <div className="col-md-9 admin-right-side">
            <section className="contact-section">
              <div className="auto-container">
                <div className="contact-title">
                  <h2>Edit Service</h2>
                </div>
                {success && <p>Service updated successfully!</p>}
                {serverError && <p>{serverError}</p>}
                <form>
                  <div className="form-group col-md-12">
                    <input
                      type="text"
                      value={service_name}
                      onChange={(e) => setServiceName(e.target.value)}
                      placeholder="Service name"
                      className="service-input"
                    />
                  </div>
                  <div className="form-group col-md-12">
                    <textarea
                      value={service_description}
                      onChange={(e) => setServiceDescription(e.target.value)}
                      className="large-textarea"
                      placeholder="Service Description"
                    ></textarea>
                  </div>
                  <div className="form-group col-md-12">
                    <button
                      onClick={handleUpdate}
                      className="theme-btn btn-style-one"
                    >
                      <span>Update Service</span>
                    </button>
                  </div>
                </form>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditService;
