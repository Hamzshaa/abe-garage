import propTypes from "prop-types";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import "./AreaChartComponent.css";

const data = [
  { name: "Page A", progress: 4000, finished: 2400, users: 2400 },
  { name: "Page B", progress: 3000, finished: 1398, users: 2210 },
  { name: "Page C", progress: 2000, finished: 9800, users: 2290 },
  { name: "Page D", progress: 2780, finished: 3908, users: 2000 },
  { name: "Page E", progress: 1890, finished: 4800, users: 2181 },
  { name: "Page F", progress: 2390, finished: 3800, users: 2500 },
  { name: "Page G", progress: 3490, finished: 4300, users: 2100 },
];

export default function AreaChartComponent() {
  return (
    <div className="chart-container">
      <h1 className="chart-title">Area Chart</h1>
      <div className="chart-wrapper">
        <ResponsiveContainer width="99%" height={300}>
          <AreaChart
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="progress"
              stroke="#8884d8"
              fill="#8884d8"
            />
            <Area
              type="monotone"
              dataKey="finished"
              stroke="#82ca9d"
              fill="#82ca9d"
            />
            <Area
              type="monotone"
              dataKey="users"
              stroke="#ffc658"
              fill="#ffc658"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

AreaChartComponent.propTypes = {
  data: propTypes.array,
};
