import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
} from "recharts";
import propTypes from "prop-types";

export default function RadarChartComponent({ data, chart1, chart2, chart3 }) {
  return (
    // <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
    //   <div
    //     style={{
    //       width: "100%",
    //       height: "fit-content",
    //       flex: "4",
    //     }}
    //   >
    <ResponsiveContainer width="99%" height="100%">
      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
        <PolarGrid />
        {/* <PolarAngleAxis dataKey="service_name" /> */}
        <PolarAngleAxis dataKey="service_name" />
        <PolarRadiusAxis />
        <Radar
          name="Mike"
          dataKey={chart1?.dataKey}
          stroke={chart1?.color}
          fill={chart1?.color}
          fillOpacity={0.6}
        />
        {chart2?.dataKey && (
          <Radar
            name="Mike"
            dataKey={chart2?.dataKey}
            stroke={chart2?.color}
            fill={chart2?.color}
            fillOpacity={0.6}
          />
        )}
        {chart3?.dataKey && (
          <Radar
            name="Mike"
            dataKey={chart3?.dataKey}
            stroke={chart3?.color}
            fill={chart3?.color}
            fillOpacity={0.6}
          />
        )}
      </RadarChart>
    </ResponsiveContainer>
    //   </div>
    //   <div style={{ flex: "1" }}>
    //     {data?.map((d) => (
    //       <div key={d.index} style={{ display: "flex", gap: "10px" }}>
    //         <span>{d.index}</span>
    //         <span>{d.service_name}</span>
    //       </div>
    //     ))}
    //   </div>
    // </div>
  );
}

RadarChartComponent.propTypes = {
  data: propTypes.array.isRequired,
  chart1: propTypes.object.isRequired,
  chart2: propTypes.object,
  chart3: propTypes.object,
};
