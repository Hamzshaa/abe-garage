import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
} from "recharts";

export default function RadarChartComponent({ data }) {
  return (
    <div style={{ width: "500px", height: "500px" }}>
      <ResponsiveContainer width="99%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="service_name" />
          <PolarRadiusAxis />
          <Radar
            name="Mike"
            dataKey="total_orders"
            stroke="#8884d8"
            fill="#8884d8"
            fillOpacity={0.6}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
