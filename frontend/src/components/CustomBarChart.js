import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Cell, ResponsiveContainer, CartesianGrid } from "recharts";
import styled from "styled-components";

/* 🌟 Styled Tooltip with modern design */
const CustomTooltip = styled.div`
  background: rgba(255, 255, 255, 0.95);
  border-radius: 10px;
  padding: 12px 16px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(6px);
  border: 1px solid rgba(230, 230, 230, 0.5);
  transition: all 0.3s ease-in-out;
`;

const TooltipText = styled.p`
  margin: 4px 0 0;
  font-weight: 500;
  color: #444;
  font-size: 0.9rem;
`;

const TooltipMain = styled.h3`
  margin: 0;
  font-weight: 700;
  color: #111;
  font-size: 1rem;
`;

const CustomTooltipContent = ({ active, payload, dataKey }) => {
  if (active && payload && payload.length) {
    const { subject, attendancePercentage, totalClasses, attendedClasses, marksObtained, subName } =
      payload[0].payload;

    return (
      <CustomTooltip>
        {dataKey === "attendancePercentage" ? (
          <>
            <TooltipMain>{subject}</TooltipMain>
            <TooltipText>Attended: {attendedClasses}/{totalClasses}</TooltipText>
            <TooltipText>{attendancePercentage}%</TooltipText>
          </>
        ) : (
          <>
            <TooltipMain>{subName.subName}</TooltipMain>
            <TooltipText>Marks: {marksObtained}</TooltipText>
          </>
        )}
      </CustomTooltip>
    );
  }

  return null;
};

const CustomBarChart = ({ chartData, dataKey }) => {
  const subjects = chartData.map((data) => data.subject);
  const distinctColors = generateDistinctColors(subjects.length);

  return (
    <ChartContainer>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={chartData} barSize={45} barGap={5}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" opacity={0.6} />
          <XAxis
            dataKey={dataKey === "marksObtained" ? "subName.subName" : "subject"}
            tick={{ fill: "#333", fontSize: 12, fontWeight: 500 }}
            axisLine={{ stroke: "#ccc" }}
            tickLine={false}
          />
          <YAxis
            domain={[0, 100]}
            tick={{ fill: "#333", fontSize: 12, fontWeight: 500 }}
            axisLine={{ stroke: "#ccc" }}
            tickLine={false}
          />
          <Tooltip content={<CustomTooltipContent dataKey={dataKey} />} />
          <Bar
            dataKey={dataKey}
            radius={[10, 10, 0, 0]}
            animationDuration={1000}
            animationBegin={100}
          >
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={`url(#gradient-${index})`}
                stroke="rgba(0,0,0,0.05)"
              />
            ))}
          </Bar>

          {/* 🎨 Define smooth gradients for each bar */}
          {distinctColors.map((color, index) => (
            <defs key={index}>
              <linearGradient id={`gradient-${index}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={color} stopOpacity={0.9} />
                <stop offset="100%" stopColor={color} stopOpacity={0.6} />
              </linearGradient>
            </defs>
          ))}
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};

/* 🎨 Chart Container for spacing and responsiveness */
const ChartContainer = styled.div`
  width: 100%;
  max-width: 800px;
  height: auto;
  margin: 0 auto;
  padding: 20px;
  background: linear-gradient(135deg, #f9f9f9, #ffffff);
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    padding: 16px;
  }

  &:hover {
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.12);
    transform: scale(1.01);
  }
`;

/* Helper function to generate distinct colors */
const generateDistinctColors = (count) => {
  const colors = [];
  const goldenRatioConjugate = 0.618033988749895;

  for (let i = 0; i < count; i++) {
    const hue = (i * goldenRatioConjugate) % 1;
    const color = hslToRgb(hue, 0.65, 0.55);
    colors.push(`rgb(${color[0]}, ${color[1]}, ${color[2]})`);
  }

  return colors;
};

/* Convert HSL to RGB */
const hslToRgb = (h, s, l) => {
  let r, g, b;

  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p, q, t) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
};

export default CustomBarChart;
