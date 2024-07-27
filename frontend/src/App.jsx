import { Routes, Route } from "react-router-dom"; // eslint-disable-line

import "./assets/template_assets/css/bootstrap.css";
import "./assets/template_assets/css/style.css";
import "./assets/template_assets/css/responsive.css";
import "./assets/template_assets/css/color.css";

import "./assets/styles/custom.css";
import Login from "./markup/pages/Login";
import Header from "./markup/components/Header/Header";
import Footer from "./markup/components/Footer/Footer";
import Addemployee from "./markup/pages/Admin/AddEmployee";

import PrivateAuthRoute from "./markup/components/Auth/PrivateAuthRoute";

function App() {
	return (
		<div>
			<PrivateAuthRoute roles={[]}>
				<Header />
				<Routes>
					<Route path="/login" element={<Login />} />
					<Route path="/admin/add-employee" element={<Addemployee />} />
					{/* <h1>App</h1> */}
				</Routes>
				<Footer />
			</PrivateAuthRoute>
		</div>
	);
}

export default App;
