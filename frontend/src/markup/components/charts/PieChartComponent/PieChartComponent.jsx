import PropTypes from "prop-types";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

const data = [
  { name: "Category A", value: 400, color: "#8884d8" },
  { name: "Category B", value: 300, color: "#83a6ed" },
  { name: "Category C", value: 200, color: "#8dd1e1" },
  { name: "Category D", value: 100, color: "#82ca9d" },
];

const PieChartComponent = () => {
  return (
    <div className="chart-container">
      <h1 className="chart-title">Pie Chart Demo</h1>
      <div className="chart-wrapper">
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Tooltip
              contentStyle={{ background: "white", borderRadius: "5px" }}
            />
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              innerRadius={70}
              outerRadius={90}
              paddingAngle={2}
            >
              {data.map((item, index) => (
                <Cell key={item.name} fill={item.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="chart-legend">
        {data.map((item) => (
          <div className="legend-item" key={item.name}>
            <div
              className="legend-color"
              style={{ backgroundColor: item.color }}
            ></div>
            <span className="legend-label">{item.name}</span>
            <span className="legend-value">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

PieChartComponent.propTypes = {
  data: PropTypes.array.isRequired,
};

export default PieChartComponent;
