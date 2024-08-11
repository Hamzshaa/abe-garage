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
import PrivateAuthRoute from "./markup/components/Auth/PrivateAuthRoute";
import Home from "./markup/pages/Home";
import Employees from "./markup/pages/Admin/Employees";
import Service from "./markup/pages/Admin/Services";
import Services from "./markup/pages/Services";
<<<<<<< HEAD
import Test from "./markup/pages/Test";
=======
import Orders from "./markup/pages/Orders/Orders";
import EditService from "./markup/components/Admin/EditService/EditService";
import Dashboard from "./markup/pages/Admin/dashboard";
>>>>>>> main

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
<<<<<<< HEAD
        <Route path="/test" element={<Test />} />
=======
>>>>>>> main
        <Route path="/login" element={<Login />} />
        <Route path="/services" element={<Services />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route
          path="/admin/add-employee"
          element={
            <PrivateAuthRoute roles={[3]}>
              <AddEmployee />
            </PrivateAuthRoute>
          }
        />
<<<<<<< HEAD
        <Route path="/admin/employees" element={<Employees />} />
=======
        <Route
					path="/admin/dashboard"
					element={
						<PrivateAuthRoute roles={[3]}>
							<Dashboard />
						</PrivateAuthRoute>
					}
				/>
        <Route path="/admin/employees" element={<Employees />} />
        <Route path="/admin/orders" element={<Orders />} />
        <Route path="/admin/services" element={<Service />} />
        <Route path="/services/edit/:id" element={<EditService />} />
>>>>>>> main
      </Routes>
      <Footer />
    </>
  );
<<<<<<< HEAD
=======

>>>>>>> main
}

export default App;
