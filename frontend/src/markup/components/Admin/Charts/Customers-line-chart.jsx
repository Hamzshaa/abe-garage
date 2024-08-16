import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  //   ResponsiveContainer,
} from "recharts";

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
  const [data, setData] = useState([]);

  console.log(data);

  useEffect(() => {
    fetch("http://localhost:8000/api/charts/customer/line", {
      headers: {
        "x-access-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbXBsb3llZV9pZCI6MSwiZW1wbG95ZWVfZW1haWwiOiJqb2huQGRvZS5jb20iLCJlbXBsb3llZV9yb2xlIjozLCJlbXBsb3llZV9maXJzdF9uYW1lIjoiam9obiIsImlhdCI6MTcyMzMwNzgwMSwiZXhwIjoxNzIzMzk0MjAxfQ.pexF_rLVGf1h2FVId4tNNYc5ef-cWtYAYqWoLIhEcb0",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setData(data.data);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <LineChart
        width={500}
        height={300}
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
    </>
  );
}
