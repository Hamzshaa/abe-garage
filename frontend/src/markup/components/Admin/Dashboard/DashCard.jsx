// import { Link } from "react-router-dom";
import propTypes from "prop-types";
import { Link } from "react-router-dom";
import { Line, LineChart, Tooltip } from "recharts";

export default function DashCard({
  icon,
  title,
  number,
  chartData,
  color,
  dataKey,
  percentage,
  link,
}) {
  return (
    <div
      style={{
        padding: "1.25rem 1rem 0.25rem",
        borderWidth: "2px",
        borderColor: "white",
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.5)",
        borderRadius: "0.5rem",
        display: "flex",
        justifyContent: "space-between",
        height: "200px",
        // width: "360px",
        width: "100%",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div
          className="dash-card-title"
          style={{
            flex: 3,
            display: "flex",
            gap: "0.5rem",
            alignItems: "center",
          }}
        >
          <span
            style={{
              backgroundColor: color,
              boxShadow: "0 2px 10px rgba(0, 0, 0, 0.5)",
              fontSize: "2rem",
              textAlign: "center",
              padding: "0.75rem",
              borderRadius: "50%",
            }}
          >
            {icon}
          </span>
          <span
            style={{ fontWeight: 600, fontSize: "1.1rem", textAlign: "right" }}
          >
            {title}
          </span>
        </div>
        <div style={{ fontSize: "1.2rem", fontWeight: "bold" }}>{number}</div>
        {link ? (
          <div style={{ color: color }}>
            <Link to={link} style={{ fontSize: "0.8rem" }}>
              View all
            </Link>
          </div>
        ) : (
          <div style={{ height: "1.8rem" }}></div>
        )}
      </div>
      <div
        style={{
          flex: 2,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
        }}
      >
        <div style={{ marginInline: "auto" }}>
          <div style={{}}>
            <div style={{ width: "150px", height: "120px" }}>
              <div style={{ backgroundColor: "transparent", border: "none" }}>
                <div style={{}}></div>
                <div
                  style={{ position: "absolute", left: "10px", top: "60px" }}
                ></div>
              </div>
              <div style={{ stroke: color }}>
                <LineChart
                  width={150}
                  height={120}
                  data={chartData}
                  margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
                >
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "transparent",
                      border: "none",
                    }}
                    labelStyle={{ display: "none" }}
                    position={{ x: 10, y: 60 }}
                  />
                  <Line
                    type="monotone"
                    dataKey={dataKey}
                    stroke={color}
                    yAxisId={0}
                    dot={false}
                  />
                </LineChart>
              </div>
            </div>
          </div>
        </div>
        <div
          className="dash-card-percentage"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
          }}
        >
          <span
            style={{
              fontWeight: 600,
              fontSize: "1.2rem",
              color: percentage < 0 ? "tomato" : "limegreen",
            }}
          >
            {percentage}%
          </span>
          <span
            style={{ color: "#718096", fontSize: "0.8rem", fontWeight: 300 }}
          >
            this month
          </span>
        </div>
      </div>
    </div>
  );
}

DashCard.propTypes = {
  width: propTypes.string,
  color: propTypes.string,
  icon: propTypes.string,
  title: propTypes.string,
  number: propTypes.number,
  link: propTypes.string,
  percentage: propTypes.number,
  chartData: propTypes.array,
  dataKey: propTypes.string,
};
