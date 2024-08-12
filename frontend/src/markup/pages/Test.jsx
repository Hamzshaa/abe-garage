import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  // CartesianGrid,
  Tooltip,
  // Legend,
  // BarChart,
  // ReferenceLine,
  // Brush,
  // Bar,
  // Area,
  // AreaChart,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  //   ResponsiveContainer,
} from "recharts";

import AreaChartComponent from "../components/Admin/Charts/AreaChartComponent";
import BarChartComponent from "../components/Admin/Charts/BarChartComponent";

// const data = [
//   { name: "Page A", uv: 4000, pv: 2400, amt: 2400 },
//   { name: "Page B", uv: 3000, pv: 1398, amt: 2210 },
//   { name: "Page C", uv: 2000, pv: 9800, amt: 2290 },
//   { name: "Page D", uv: 2780, pv: 3908, amt: 2000 },
//   { name: "Page E", uv: 1890, pv: 4800, amt: 2181 },
//   { name: "Page F", uv: 2390, pv: 3800, amt: 2500 },
//   { name: "Page G", uv: 3490, pv: 4300, amt: 2100 },
// ];

export default function fourOFour() {
  const [data, setData] = useState([]); // eslint-disable-line
  const [areaData, setAreaData] = useState([]); // eslint-disable-line
  const [radarData, setRadarData] = useState(); // eslint-disable-line

  const employee_token = localStorage.getItem("employee").split('"')[3];
  console.log(employee_token);

  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbXBsb3llZV9pZCI6MSwiZW1wbG95ZWVfZW1haWwiOiJqb2huQGRvZS5jb20iLCJlbXBsb3llZV9yb2xlIjozLCJlbXBsb3llZV9maXJzdF9uYW1lIjoiam9obiIsImlhdCI6MTcyMzQ3Njg3NywiZXhwIjoxNzIzNTYzMjc3fQ.aRWQ9Ak2C0SdbSI-RW2Xu-4lZyU6v_mfON15X4VHCSA";

  // eslint-disable-next-line
  useEffect(() => {
    fetch("http://localhost:8000/api/charts/customer/line", {
      headers: {
        "x-access-token": token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setData(data.data);
      })
      .catch((err) => console.error(err));
  }, []);

  // eslint-disable-next-line
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
  }, []);

  // eslint-disable-next-line
  useEffect(() => {
    fetch("http://localhost:8000/api/charts/order/radar", {
      headers: {
        "x-access-token": token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setRadarData(data.data);
      })
      .catch((err) => console.error(err));
  }, []);

  const style = { width: "600px", height: "300px", backgroundColor: "#d6dfe3" };

  return (
    <>
      <div style={style}>
        <ResponsiveContainer width="99%" height="100%">
          <LineChart
            // width={500}
            // height={300}
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            {/* <CartesianGrid strokeDasharray="3 3" /> */}
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            {/* <Legend />
        {/* <Line
          type="monotone"
          dataKey="pv"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        /> */}
            <Line
              type="monotone"
              dataKey="count"
              stroke="#ca9e82"
              // remove the mark on the pick of the line
              activeDot={false}
              // I just want to show the line, not the area below the line
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <BarChartComponent
        data={data}
        chart1={{ color: "#8884d8", dataKey: "count" }}
        title="30-Day Performance Overview"
      />

      <AreaChartComponent
        areaData={areaData}
        chart1={{ color: "#28ac3c", dataKey: "totalCustomers" }}
        chart2={{ color: "#d176cf", dataKey: "totalVehicles" }}
        title="30-Day Performance Overview"
      />
    </>
  );
}
