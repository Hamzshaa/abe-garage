import propTypes from "prop-types";
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  Tooltip,
  Rectangle,
  Legend,
  XAxis,
} from "recharts";
import "./BarChartComponent.css";

export default function BarChartComponent() {
  // Dummy data for the chart
  const chartData = [
    { date: "2024-07-01", progress: 20, finished: 50, total: 100 },
    { date: "2024-07-02", progress: 30, finished: 60, total: 100 },
    { date: "2024-07-03", progress: 40, finished: 70, total: 100 },
    { date: "2024-07-04", progress: 50, finished: 80, total: 100 },
    { date: "2024-07-05", progress: 60, finished: 90, total: 100 },
  ];

  return (
    <div className="chart-container">
      <h1 className="chart-title">Book Completion Status</h1>
      <div className="chart-wrapper">
        <ResponsiveContainer width="99%" height={150}>
          <BarChart data={chartData}>
            <Tooltip
              contentStyle={{ background: "white", borderRadius: "5px" }}
              labelStyle={{ display: "none" }}
              cursor={{ fill: "none" }}
            />

            <Bar
              dataKey="progress"
              fill="#827cf3"
              activeBar={<Rectangle fill="pink" stroke="blue" />}
            />
            <Bar
              dataKey="finished"
              fill="#6df3a0"
              activeBar={<Rectangle fill="gold" stroke="purple" />}
            />
            <Bar
              dataKey="total"
              fill="#5943fc"
              activeBar={<Rectangle fill="orange" stroke="yellow" />}
            />
            <XAxis dataKey="date" />
            <Legend />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

BarChartComponent.propTypes = {
  chartData: propTypes.array,
};
