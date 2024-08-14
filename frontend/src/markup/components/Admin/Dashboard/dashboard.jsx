import { useState, useEffect } from "react";
// import { Container, Row, Col, Card } from "react-bootstrap";
import "./dashboard.css";
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
  let token = null; // To store the token
  if (employee) {
    token = employee.employee_token.toString();
    console.log(employee);
    console.log(token);
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
        console.log(data);
        setAreaData(data.data);
      })
      .catch((err) => console.error(err));
  }, [token]);

  return (
    <div>
      <div className="row">
        {/* Row 1 */}
        <div className="col-xl-8 col-12 mt-4 mb-2 ">
          <div
            className=" bg-white py-3 dash_card row"
            style={{
              width: "98%",
              margin: "auto",
              height: "90%",
            }}
          >
            <div className="col-xl-6 py-2">
              <div className="dashboard-box" style={{ height: "50%" }}>
                All Orders
              </div>
              <div className="dashboard-box" style={{ height: "50%" }}>
                New Orders
              </div>
            </div>
            <div className="col-xl-6 py-2">
              <div className="dashboard-box" style={{ height: "50%" }}>
                Add Employees
              </div>
              <div className="dashboard-box" style={{ height: "50%" }}>
                Employees
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-4 mt-4 mb-2">
          <div
            className="h-200 bg-white py-3 dash_card"
            style={{ width: "98%", margin: "auto", height: "90%" }}
          >
            <PieChartComponent data={pieData} />
          </div>
        </div>
        {/* Row 2 */}
        <div className="col-xl-7 my-2">
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
              // chart2={{ color: "#e26d50", dataKey: "inprogress_orders" }}
              chart3={{ color: "#58ffec", dataKey: "total_orders" }}
            />
          </div>
        </div>

        {/* Row 3 */}
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
