import React, { useState, useEffect } from "react";
import { useAuth } from "../../../../Contexts/AuthContext";
import ServiceService from "../../../../services/service.service";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

const ServicesList = () => {
  const [service_name, setServiceName] = useState("");
  const [service_description, setServiceDescription] = useState("");
  const [ServiceNameRequired, setServiceNameRequired] = useState("");
  const [Service, setService] = useState([]);
  const [apiError, setApiError] = useState(false);
  const [apiErrorMessage, setApiErrorMessage] = useState(null);
  const [serverError, setServerError] = useState("");
  const [deleteId, setDeleteId] = useState("");
  const [success, setSuccess] = useState(false);

  const [open, setOpen] = React.useState(false);
  const handleOpen = (service) => {
    setOpen(true);
    setDeleteId(service);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const navigate = useNavigate();
  const { employee } = useAuth();
  let token = employee?.employee_token;
  const fetchServices = async () => {
    try {
      const res = await ServiceService.getAllServices(token);
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
        setService(data.data || []);
        console.log(data.data);
      }
    } catch (err) {
      setApiError(true);
      setApiErrorMessage("An error occurred while fetching services");
    }
  };
  useEffect(() => {
    fetchServices();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!service_name) {
      setServiceNameRequired("Service name is required");
      return;
    } else {
      setServiceNameRequired("");
    }

    const formData = { service_name, service_description };
    try {
      const res = await ServiceService.createService(formData, token);
      const data = await res.json();
      if (data.error) {
        setServerError(data.error);
      } else {
        setSuccess(true);
        setServerError("");
        setTimeout(() => {
          window.location.reload(); // Or redirect to another page
        }, 2000);
      }
    } catch (error) {
      setServerError("Failed to create service. Please try again.");
    }
  };
  const handleDelete = async (serverId) => {
    console.log(serverId.service_id);
    try {
      const res = await ServiceService.deactivateService(
        serverId.service_id,
        token
      );
      const data = await res.json();
      if (data.error) {
        setServerError(data.error);
      } else {
        setSuccess(true);
        setServerError("");
        setOpen(false);
        fetchServices();
      }
    } catch (error) {
      setServerError("Failed to delete service. Please try again.");
    }
  };
  const handleEdit = (service) => {
    navigate(`/services/edit/${service.service_id}`, { state: { service } });
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
              <h2>Services We Provide</h2>
              <p>
                Bring to the table win-win survival strategies to ensure
                proactive domination. At the end of the day, going forward, a
                new normal that has evolved from generation x is on the runway
                heading towards a streamlined cloud solution.
              </p>
            </div>
            {Service.map((service) => (
              <div className="Service-display mb-2" key={service.id}>
                <div className="service">
                  <h6 className="mt-2">{service.service_name}</h6>
                  <p>{service.service_description}</p>
                </div>
                <div className="action">
                  <ion-icon
                    name="create-outline"
                    onClick={() => handleEdit(service)}
                  ></ion-icon>
                  <ion-icon
                    name="trash-outline"
                    onClick={() => handleOpen(service)}
                  ></ion-icon>
                </div>
              </div>
            ))}
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="child-modal-title"
              aria-describedby="child-modal-description"
            >
              <Box sx={{ ...style, width: 400 }}>
                <h2 id="child-modal-title">Delete</h2>
                <p id="child-modal-description">
                  Are You sure u want Delete this service ?
                </p>
                <button
                  className="theme-btn btn-style-one"
                  onClick={() => handleDelete(deleteId)}
                >
                  Delete
                </button>
              </Box>
            </Modal>
            <div className="contact-title add-service-cont mt-4">
              <h2 className="mb-4">Add a New Service</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-group col-md-12">
                  <input
                    type="text"
                    value={service_name}
                    onChange={(e) => setServiceName(e.target.value)}
                    placeholder="Service name"
                    className="service-input"
                  />
                  {ServiceNameRequired && (
                    <div className="validation-error" role="alert">
                      {ServiceNameRequired}
                    </div>
                  )}
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
                  <button className="theme-btn btn-style-one">
                    <span>Add Service</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default ServicesList;
