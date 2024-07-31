import { Routes, Route } from "react-router-dom"; // eslint-disable-line

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
import Services from "./markup/pages/Services";

function App() {
	return (
		<>
			<Header />
			<Routes>
				<Route path="/" element={<Home />} />
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
				<Route path="/admin/employees" element={<Employees />} />
			</Routes>
			<Footer />
		</>
	);
}

export default App;
