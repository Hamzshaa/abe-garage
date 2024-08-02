// Import the employee service
const serviceService = require("../services/service.service");

async function getAllServices(req, res, next) {
  // Call the getAllEmployees method from the employee service
  const service = await serviceService.getAllServices();
  // console.log(employees);
  if (!service) {
    res.status(400).json({
      error: "Failed to get all services!",
    });
  } else {
    res.status(200).json({
      status: "success",
      data: service,
    });
  }
}
async function updateService(req, res, next) {
  try {
    const { service_id, service_name, service_description } = req.body;

    if (!service_id || !service_name || !service_description) {
      return res.status(400).json({
        error: "Service ID, name, and description are required!",
      });
    }

    const success = await serviceService.updateService(
      service_id,
      service_name,
      service_description
    );

    if (success) {
      res
        .status(200)
        .json({ success: true, message: "Service updated successfully" });
    } else {
      res.status(404).json({ message: "Service not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function deactivateService(req, res, next) {
  try {
    const { service_id } = req.body;

    if (!service_id) {
      return res.status(400).json({
        error: "Service ID is required!",
      });
    }

    const success = await serviceService.deactivateService(service_id);

    if (success) {
      res
        .status(200)
        .json({ success: true, message: "Service deleted successfully" });
    } else {
      res.status(404).json({ message: "Service not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
async function getServiceById(req, res, next) {
  try {
    const service = await serviceService.getServiceById(req.params.id);
    if (service) {
      res.status(200).json(service);
    } else {
      res.status(404).json({ message: "Service not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function createService(req, res, next) {
  try {
    const { service_name, service_description } = req.body;
    // console.log(service_name, service_description);
    const serviceData = {
      service_name,
      service_description,
    };
    // Validate input
    if (!service_name) {
      return res.status(400).json({
        error: "Service name is required!",
      });
    }

    // Create the service
    const serviceId = await serviceService.createService(serviceData);
    console.log(serviceId);

    if (!serviceId) {
      return res.status(400).json({
        error: "Failed to add the service!",
      });
    } else {
      return res.status(200).json({
        status: "true",
        service_id: serviceId,
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Something went wrong!",
    });
  }
}

// Export the createEmployee controller
module.exports = {
  getAllServices,
  createService,
  getServiceById,
  updateService,
  deactivateService,
};
