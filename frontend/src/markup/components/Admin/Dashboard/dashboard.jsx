import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PieChartComponent from "../Charts/PieChartComponent";
import BarChartComponent from "../Charts/BarChartComponent";
import RadarChartComponent from "../Charts/RadarChartComponent";
import AreaChartComponent from "../Charts/AreaChartComponent";

import { useAuth } from "../../../../Contexts/AuthContext";

function Dashboard() {
	const [areaData, setAreaData] = useState([]);
	const [radarData, setRadarData] = useState();
	const [pieData, setPieData] = useState();
	const [barData, setBarData] = useState();

	const { employee } = useAuth();
	let token = null;
	if (employee) {
		token = employee.employee_token.toString();
	}

	useEffect(() => {
		fetch("http://localhost:8000/api/charts/order/pie", {
			headers: {
				"x-access-token": token,
			},
		})
			.then((res) => res.json())
			.then((data) => {
				setPieData(data.data);
			})
			.catch((err) => console.error(err));
	}, [token]);

	useEffect(() => {
		fetch("http://localhost:8000/api/charts/customer/bar", {
			headers: {
				"x-access-token": token,
			},
		})
			.then((res) => res.json())
			.then((data) => {
				setBarData(data.data);
			})
			.catch((err) => console.error(err));
	}, [token]);

	useEffect(() => {
		fetch("http://localhost:8000/api/charts/order/radar", {
			headers: {
				"x-access-token": token,
			},
		})
			.then((res) => res.json())
			.then((data) => {
				setRadarData(data.data);
			})
			.catch((err) => console.error(err));
	}, [token]);

	useEffect(() => {
		fetch("http://localhost:8000/api/charts/customer/area", {
			headers: {
				"x-access-token": token,
			},
		})
			.then((res) => res.json())
			.then((data) => {
				setAreaData(data.data);
			})
			.catch((err) => console.error(err));
	}, [token]);

	return (
		<div>
			<div className="row">
				{/* Row 1 - Orders and Employees */}
				<div className="col-xl-8 col-12 mt-4 mb-2">
					<div className="row">
						<div className="col-lg-6 service-block-one">
							<div className="inner-box hvr-float-shadow">
								<h5>Open for all</h5>
								<h2>All Orders</h2>
								<Link to="/admin/order/orders" className="read-more">
									LIST OF ORDERS +
								</Link>
								<div className="icon">
									<span className="flaticon-power"></span>
								</div>
							</div>
						</div>

						<div className="col-lg-6 service-block-one">
							<div className="inner-box hvr-float-shadow">
								<h5>Open for all</h5>
								<h2>Add Employees</h2>
								<Link to="/admin/employee/add" className="read-more">
									ADD EMPLOYEE +
								</Link>
								<div className="icon">
									<span className="flaticon-power"></span>
								</div>
							</div>
						</div>
					</div>

					<div className="row mt-3">
						<div className="col-lg-6 service-block-one">
							<div className="inner-box hvr-float-shadow">
								<h5>Open for all</h5>
								<h2>New Orders</h2>
								<Link to="/admin/order/new" className="read-more">
									LIST OF NEW ORDERS +
								</Link>
								<div className="icon">
									<span className="flaticon-power"></span>
								</div>
							</div>
						</div>

						<div className="col-lg-6 service-block-one">
							<div className="inner-box hvr-float-shadow">
								<h5>Open for all</h5>
								<h2>Employees</h2>
								<Link to="/admin/employee/list" className="read-more">
									LIST OF EMPLOYEES +
								</Link>
								<div className="icon">
									<span className="flaticon-power"></span>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Row 2 - Charts */}
				<div className="col-xl-4 col-12 mt-4 mb-2">
					<div
						className="bg-white py-3 dash_card"
						style={{ width: "98%", margin: "auto", height: "90%" }}
					>
						<PieChartComponent data={pieData} />
					</div>
				</div>

				<div className="col-xl-7 col-12 my-2">
					<div
						className="bg-white py-5 dash_card"
						style={{ width: "95%", margin: "auto", height: "95%" }}
					>
						<BarChartComponent
							data={barData}
							chart1={{ color: "#564ef3", dataKey: "customers" }}
							chart2={{ color: "#f418c5", dataKey: "vehicles" }}
							chart3={{ color: "#ffc658", dataKey: "orders" }}
							title="30-Day Performance Overview"
						/>
					</div>
				</div>

				<div className="col-xl-5 col-12 my-2">
					<div
						className="bg-white py-2 dash_card"
						style={{
							width: "95%",
							margin: "auto",
							height: "95%",
							minHeight: "400px",
						}}
					>
						<RadarChartComponent
							data={radarData}
							chart1={{ color: "#60e64c", dataKey: "completed_orders" }}
							chart3={{ color: "#58ffec", dataKey: "total_orders" }}
						/>
					</div>
				</div>

				<div className="col-12 my-2">
					<div
						className="bg-white py-5 dash_card"
						style={{ width: "95%", margin: "auto", height: "95%" }}
					>
						<AreaChartComponent
							areaData={areaData}
							chart1={{ color: "#8884d8", dataKey: "Total customers" }}
							chart2={{ color: "#82ca9d", dataKey: "Total vehicles" }}
							chart3={{ color: "#ffc658", dataKey: "Total orders" }}
							title="30-Day Performance Overview"
						/>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Dashboard;
