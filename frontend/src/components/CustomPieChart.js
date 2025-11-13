import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import styled from 'styled-components';

/* 🎨 Color palette - modern gradient tones */
const COLORS = ['#1e9600', '#ff3d3d', '#007bff', '#ffb400', '#8e2de2', '#00c6ff'];

/* 🌟 Label render logic (same logic, improved font) */
const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.6;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="#ffffff"
      fontSize={14}
      fontWeight={600}
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
      style={{ textShadow: '0 1px 3px rgba(0,0,0,0.4)' }}
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

/* 🌈 Chart Container Styling */
const ChartContainer = styled.div`
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
  background: linear-gradient(145deg, #ffffff, #f1f3f6);
  border-radius: 16px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.12);
    transform: scale(1.01);
  }

  @media (max-width: 768px) {
    padding: 16px;
  }
`;

/* 🧊 Center Label for clarity */
const CenterLabel = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-weight: 700;
  color: #333;
  font-size: 1.1rem;
  text-align: center;
`;

const ChartWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 400px;
`;

/* 💫 Tooltip Styling */
const CustomTooltip = styled.div`
  background-color: rgba(255, 255, 255, 0.95);
  padding: 10px 14px;
  border-radius: 10px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(4px);
  border: 1px solid rgba(230, 230, 230, 0.5);
  text-align: center;
`;

const CustomTooltipContent = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const { name, value } = payload[0];
    return (
      <CustomTooltip>
        <strong>{name}</strong>
        <p style={{ margin: 0, color: '#333', fontWeight: 500 }}>{value}</p>
      </CustomTooltip>
    );
  }
  return null;
};

/* 📊 Final Chart Component */
const CustomPieChart = ({ data }) => {
  return (
    <ChartContainer>
      <ChartWrapper>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              innerRadius={60}
              outerRadius={100}
              paddingAngle={3}
              dataKey="value"
              animationDuration={1000}
              isAnimationActive={true}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={`url(#grad-${index})`}
                  stroke="none"
                />
              ))}

              {/* 🎨 Gradient Definitions */}
              {data.map((_, index) => (
                <defs key={index}>
                  <linearGradient id={`grad-${index}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={COLORS[index % COLORS.length]} stopOpacity={0.9} />
                    <stop offset="100%" stopColor={COLORS[index % COLORS.length]} stopOpacity={0.6} />
                  </linearGradient>
                </defs>
              ))}
            </Pie>
            <Tooltip content={<CustomTooltipContent />} />
          </PieChart>
        </ResponsiveContainer>

        <CenterLabel>Total Data</CenterLabel>
      </ChartWrapper>
    </ChartContainer>
  );
};

export default CustomPieChart;
