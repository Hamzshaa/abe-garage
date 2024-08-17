import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Sector,
  Tooltip,
} from "recharts";
import propTypes from "prop-types";
import { useState } from "react";

export default function PieChartComponent({ data }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const renderActiveShape = (renderActiveShapeProps) => {
    const RADIAN = Math.PI / 180;
    const {
      cx,
      cy,
      midAngle,
      innerRadius,
      outerRadius,
      startAngle,
      endAngle,
      fill,
      payload,
      percent,
      value,
    } = renderActiveShapeProps;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? "start" : "end";

    return (
      <g>
        <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
          {payload.name}
        </text>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 6}
          outerRadius={outerRadius + 10}
          fill={fill}
        />
        <path
          d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
          stroke={fill}
          fill="none"
        />
        <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
        <text
          x={ex + (cos >= 0 ? 1 : -1) * 12}
          y={ey}
          textAnchor={textAnchor}
          fill="#333"
        >{`${value} ${value <= 1 ? "Order" : "Orders"}`}</text>
        <text
          x={ex + (cos >= 0 ? 1 : -1) * 12}
          y={ey}
          dy={18}
          textAnchor={textAnchor}
          fill="#999"
        >
          {`(Rate ${(percent * 100).toFixed(2)}%)`}
        </text>
      </g>
    );
  };

  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "fit-content",
          width: "100%",
        }}
      >
        {/* <div
          className="w-full h-full align-center flex justify-center"
          style={{ width: "500px", height: "300px", marginInline: "auto" }}
        > */}
        <ResponsiveContainer width="99%" height={300}>
          <PieChart>
            {/* <Tooltip
              contentStyle={{ background: "white", borderRadius: "5px" }}
            /> */}
            <Pie
              activeIndex={activeIndex}
              activeShape={renderActiveShape}
              data={data}
              onMouseEnter={onPieEnter}
              dataKey="count"
              nameKey="status"
              innerRadius={"70"}
              outerRadius={"90"}
              paddingAngle={5}
            >
              {data?.map((item) => (
                <Cell key={item.status} fill={item.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        {/* </div> */}

        <div
          style={{
            // backgroundColor: "#d6cfcf",
            display: "flex",
            // flexDirection: "column",

            justifyContent: "space-between",
            height: "fit-content",
            // width: "500px",
            marginInline: "auto",
          }}
        >
          {data?.map((item) => (
            <div key={item.status}>
              <div
                style={{
                  display: "flex",
                  gap: "5px",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  alignItems: "center",
                  // align the child
                  padding: "10px",
                }}
              >
                <div
                  style={{
                    width: "10px",
                    height: "10px",
                    backgroundColor: item.color,
                    borderRadius: "10%",
                  }}
                ></div>
                <p
                  style={{
                    fontSize: "0.8rem",
                  }}
                >
                  {item.status}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

PieChartComponent.propTypes = {
  data: propTypes.array.isRequired,
};
