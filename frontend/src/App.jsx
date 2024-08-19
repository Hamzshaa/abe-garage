import { Routes, Route } from "react-router-dom";
import "./assets/template_assets/css/bootstrap.css";
import "./assets/template_assets/css/style.css";
import "./assets/template_assets/css/responsive.css";
import "./assets/template_assets/css/color.css";
import "./assets/styles/custom.css";
import Login from "./markup/pages/Login";
import Header from "./markup/components/Header/Header";
import Footer from "./markup/components/Footer/Footer";
import AddEmployee from "./markup/pages/Admin/AddEmployee";
import Unauthorized from "./markup/pages/Unauthorized";
import DataTable from "./markup/components/Admin/EmployeesList/DataTable";

import PrivateAuthRoute from "./markup/components/Auth/PrivateAuthRoute";
import Home from "./markup/pages/Home";
import Employees from "./markup/pages/Admin/Employees";
import Service from "./markup/pages/Admin/Services";
import Services from "./markup/pages/Services";
import About from "./markup/pages/About.jsx";
import Orders from "./markup/pages/Orders/Orders";
import AddOrders from "./markup/pages/Orders/AddOrders";
import EditService from "./markup/components/Admin/EditService/EditService";
import Dashboard from "./markup/pages/Admin/dashboard";

import Customers from "./markup/pages/Admin/Customers";
import AddCustomer from "./markup/pages/Admin/AddCustomer";
import EditCustomer from "./markup/pages/Admin/EditCustomer";
import UpdateEmployees from "./markup/pages/Admin/UpdateEmployees";
import Contact from "./markup/pages/Contact.jsx";
import CustomerProfile from "./markup/pages/Admin/CustomerProfile.jsx";

function App() {
	return (
		<>
			<Header />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/login" element={<Login />} />
				<Route path="/services" element={<Services />} />
				<Route path="/About" element={<About />} />
				<Route path="/Contact" element={<Contact />} />
				{/* <Route path="/data" element={<DataTable />} /> */}

				<Route path="/unauthorized" element={<Unauthorized />} />
				<Route
					path="/admin/add-employee"
					element={
						<PrivateAuthRoute roles={[3]}>
							<AddEmployee />
						</PrivateAuthRoute>
					}
				/>
				<Route path="/admin/employees" element={<Employees />} />
				<Route
					path="/admin/employee/edit/:id"
					element={
						<PrivateAuthRoute roles={[3]}>
							<UpdateEmployees />
						</PrivateAuthRoute>
					}
				/>
				<Route
					path="/admin/add-customer"
					element={
						<PrivateAuthRoute roles={[3]}>
							<AddCustomer />
						</PrivateAuthRoute>
					}
				/>
				<Route
					path="/admin/customers"
					element={
						<PrivateAuthRoute roles={[3]}>
							<Customers />
						</PrivateAuthRoute>
					}
				/>
				<Route
					path="/admin/customer/:customerId"
					element={
						<PrivateAuthRoute roles={[2, 3]}>
							<CustomerProfile />
						</PrivateAuthRoute>
					}
				/>
				{/*<Route
          path="/manager/customers"
          element={
            <PrivateAuthRoute roles={[2]}>
              <Customers />
            </PrivateAuthRoute>
          }
        />*/}
				<Route
					path="/admin/edit-customer/:customerId"
					element={
						<PrivateAuthRoute roles={[2, 3]}>
							<EditCustomer />
						</PrivateAuthRoute>
					}
				/>
				<Route
					path="/admin"
					element={
						<PrivateAuthRoute roles={[3]}>
							<Dashboard />
						</PrivateAuthRoute>
					}
				/>
				<Route
					path="/admin/orders"
					element={
						<PrivateAuthRoute roles={[3]}>
							<Orders />
						</PrivateAuthRoute>
					}
				/>
				<Route path="/admin/order" element={<AddOrders />} />
				<Route
					path="/admin/services"
					element={
						<PrivateAuthRoute roles={[3]}>
							<Service />
						</PrivateAuthRoute>
					}
				/>
			</Routes>
			<Footer />
		</>
	);
}

export default App;
