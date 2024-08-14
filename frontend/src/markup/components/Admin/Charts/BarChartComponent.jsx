import {
  Bar,
  BarChart,
  Brush,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import propTypes from "prop-types";
import { useState } from "react";

export default function BarChartComponent({
  data,
  chart1,
  chart2,
  chart3,
  title,
}) {
  const [showChart1, setShowChart1] = useState(true);
  const [showChart2, setShowChart2] = useState(true);
  const [showChart3, setShowChart3] = useState(true);

  const handleDotClick = (n) => {
    if (n == 1) setShowChart1((prev) => !prev);
    else if (n == 2) setShowChart2((prev) => !prev);
    else if (n == 3) setShowChart3((prev) => !prev);
  };

  console.log(chart1);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <h2 className="text-center ">{title}</h2>
          <div className="text-center d-flex justify-content-center gap-1 pt-4">
            {chart1 && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  marginBottom: "10px",
                }}
              >
                <div
                  className="dot"
                  style={{
                    backgroundColor: showChart1 ? chart1?.color : "white",
                    borderRadius: "50%",
                    width: "15px",
                    height: "15px",
                    marginBottom: "5px",
                    cursor: "pointer",
                  }}
                  onClick={() => handleDotClick(1)}
                ></div>
                <p style={{ color: chart1.color }} className="p-2">
                  {chart1?.dataKey}
                </p>
              </div>
            )}
            {chart2 && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  marginBottom: "10px",
                }}
              >
                <div
                  className="dot"
                  style={{
                    backgroundColor: showChart2 ? chart2?.color : "white",
                    borderRadius: "50%",
                    width: "15px",
                    height: "15px",
                    marginBottom: "5px",
                    cursor: "pointer",
                  }}
                  onClick={() => handleDotClick(2)}
                ></div>
                <p style={{ color: chart2.color }} className="p-2">
                  {chart2?.dataKey}
                </p>
              </div>
            )}
            {chart3 && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <div
                  className="dot"
                  style={{
                    backgroundColor: showChart3 ? chart3?.color : "white",
                    borderRadius: "50%",
                    width: "15px",
                    height: "15px",
                    marginBottom: "5px",
                    cursor: "pointer",
                  }}
                  onClick={() => handleDotClick(3)}
                ></div>
                <p style={{ color: chart3?.color }} className="p-2">
                  {chart3?.dataKey}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12">
          <div style={{ width: "100%", height: "300px" }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                width={500}
                height={300}
                data={data}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                {/* <CartesianGrid strokeDasharray="3 3" /> */}
                <XAxis dataKey="date" />
                {/* <YAxis /> */}
                <Tooltip />
                {/* <Legend
                  verticalAlign="top"
                  wrapperStyle={{ lineHeight: "40px" }}
                /> */}
                <ReferenceLine y={0} stroke="#000" />
                <Brush
                  dataKey="count"
                  height={15}
                  stroke="#9a999990"
                  color="#a3a0a076"
                  fill="#c9c8c887"
                />
                {showChart1 && (
                  <Bar dataKey={chart1?.dataKey} fill={chart1?.color} />
                )}
                {chart2 && showChart2 && (
                  <Bar dataKey={chart2?.dataKey} fill={chart2?.color} />
                )}
                {chart3 && showChart3 && (
                  <Bar dataKey={chart3?.dataKey} fill={chart3?.color} />
                )}
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

BarChartComponent.propTypes = {
  data: propTypes.array,
  chart1: propTypes.object,
  chart2: propTypes.object,
  chart3: propTypes.object,
  title: propTypes.string,
};
