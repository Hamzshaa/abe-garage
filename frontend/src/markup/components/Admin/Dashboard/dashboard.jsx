import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
import { IoCarSport } from "react-icons/io5";
import { MdBookmarkBorder } from "react-icons/md";
import { FaPeopleGroup } from "react-icons/fa6";
import { FaPeopleCarryBox } from "react-icons/fa6";

// import { Container, Row, Col, Card } from "react-sbootstrap";
import "./dashboard.css";
import PieChartComponent from "../Charts/PieChartComponent";
import BarChartComponent from "../Charts/BarChartComponent";
import RadarChartComponent from "../Charts/RadarChartComponent";
import AreaChartComponent from "../Charts/AreaChartComponent";

import { useAuth } from "../../../../Contexts/AuthContext";
import DashCard from "./DashCard";

function Dashboard() {
  const [areaData, setAreaData] = useState([]);
  const [radarData, setRadarData] = useState();
  const [pieData, setPieData] = useState();
  const [barData, setBarData] = useState();
  const [lineData, setLineData] = useState();

  const api_url = import.meta.env.VITE_REACT_APP_API_URL;

  const { employee } = useAuth();
  let token = null;
  if (employee) {
    token = employee.employee_token.toString();
    console.log(employee);
    console.log(token);
  }

  useEffect(() => {
    fetch(`${api_url}/api/charts/order/pie`, {
      headers: {
        "x-access-token": token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setPieData(data.data);
      })
      .catch((err) => console.error(err));
  }, [token, api_url]);

  useEffect(() => {
    fetch(`${api_url}/api/charts/customer/bar`, {
      headers: {
        "x-access-token": token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setBarData(data.data);
      })
      .catch((err) => console.error(err));
  }, [token, api_url]);

  useEffect(() => {
    fetch(`${api_url}/api/charts/order/radar`, {
      headers: {
        "x-access-token": token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setRadarData(data.data);
      })
      .catch((err) => console.error(err));
  }, [token, api_url]);

  useEffect(() => {
    fetch(`${api_url}/api/charts/customer/area`, {
      headers: {
        "x-access-token": token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setAreaData(data.data);
      })
      .catch((err) => console.error(err));
  }, [token, api_url]);

  useEffect(() => {
    fetch(`${api_url}/api/charts/line`, {
      headers: {
        "x-access-token": token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setLineData(data.data);
      })
      .catch((err) => console.error(err));
  }, [token, api_url]);

  return (
    <div className="admin-right-side-scroller">
      <div className="row" style={{ width: "100%" }}>
        {/* Row 1 */}
        <div
          className="row col-xl-8 col-12 mt-4 mb-2 "
          style={{ margin: "auto" }}
        >
          <div
            className=" bg-white py-3 dash_card row"
            style={{
              width: "98%",
              margin: "auto",
              // height: "90%",
            }}
          >
            <div className="col-xl-6 py-2" style={{ height: "fit-content" }}>
              <div className="dashboard-box mb-3" style={{ height: "50%" }}>
                <DashCard
                  width="100%"
                  color="#86f02f"
                  icon={<IoCarSport />}
                  title="Total Vehicles"
                  number={lineData?.totalVehicles}
                  link="/vehicles"
                  percentage={lineData?.vehiclePercent}
                  chartData={lineData?.data}
                  dataKey="Total vehicles"
                />
              </div>
              <div className="dashboard-box" style={{ height: "50%" }}>
                <DashCard
                  width="100%"
                  color="#8f6aec"
                  icon={<MdBookmarkBorder />}
                  title="Total Orders"
                  number={lineData?.totalOrders}
                  link="/orders"
                  percentage={lineData?.orderPercent}
                  chartData={lineData?.data}
                  dataKey="Total orders"
                />
              </div>
            </div>
            <div className="col-xl-6 py-2">
              <div className="dashboard-box mb-2" style={{ height: "50%" }}>
                <DashCard
                  width="100%"
                  color="#4ef3d8"
                  icon={<FaPeopleGroup />}
                  title="Total Customers"
                  number={lineData?.totalCustomers}
                  link="/customers"
                  percentage={lineData?.customerPercent}
                  chartData={lineData?.data}
                  dataKey="Total customers"
                />
              </div>
              <div className="dashboard-box" style={{ height: "50%" }}>
                <DashCard
                  width="100%"
                  color="#f418c5"
                  icon={<FaPeopleCarryBox />}
                  title="Total Employees"
                  number={lineData?.totalEmployees}
                  link="/employees"
                  percentage={lineData?.employeePercent}
                  chartData={lineData?.data}
                  dataKey="Total employees"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-4 mt-4 mb-2">
          <div
            className="h-200 bg-white py-3 dash_card"
            style={{ width: "98%", margin: "auto", height: "100%" }}
          >
            <PieChartComponent data={pieData} />
          </div>
        </div>
        {/* Row 2 */}
        <div className="col-xl-7 my-2">
          <div
            className="bg-white py-5 dash_card"
            style={{ width: "96%", margin: "auto", height: "100%" }}
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
              width: "96%",
              margin: "auto",
              // height: "95%",
              height: "100%",
              minHeight: "400px",
            }}
          >
            <RadarChartComponent
              data={radarData}
              chart1={{ color: "#60e64c", dataKey: "completed_orders" }}
              // chart2={{ color: "#e26d50", dataKey: "inprogress_orders" }}
              chart3={{ color: "#58ffec", dataKey: "total_orders" }}
            />
          </div>
        </div>

        {/* Row 3 */}
        <div className="col-12 my-2">
          <div
            className="bg-white py-5 dash_card"
            style={{ width: "98%", margin: "auto", height: "95%" }}
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
