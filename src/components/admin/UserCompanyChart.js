import React from "react";
import {
  PieChart,
  Pie,
  Legend,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { useTheme, useMediaQuery } from "@mui/material";

const UserCompanyChart = ({ userData }) => {
  const companies = [
    "Barcino",
    "Meat Depot",
    "Single Origin",
    "Bluesmith",
    "None",
  ];

  const filteredUsers = userData.filter((user) =>
    companies.includes(user.company)
  );

  const usersByCompany = {};
  filteredUsers.forEach((user) => {
    if (!usersByCompany[user.company]) {
      usersByCompany[user.company] = 0;
    }
    usersByCompany[user.company]++;
  });

  const pieChartData = Object.keys(usersByCompany).map((company) => ({
    name: company,
    count: usersByCompany[company],
  }));

  const pieColors = ["#7A8D79", "#FCB44E", "#9B544E", "#F6995C", "#D37676"];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.between("md"));
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("l"));

  let chartWidth = 500;
  let chartHeight = 500;
  let outerRadius = 200;

  if (isSmallScreen) {
    chartWidth = 300;
    chartHeight = 300;
    outerRadius = 100;
  } else if (isMediumScreen) {
    chartWidth = 400;
    chartHeight = 400;
    outerRadius = 150;
  }

  return (
    <ResponsiveContainer
      width="90%"
      height={isSmallScreen ? 300 : isMediumScreen ? 400 : 500}
    >
      <PieChart width={chartWidth} height={chartHeight}>
        <Pie
          dataKey="count"
          nameKey="name"
          isAnimationActive={true}
          data={pieChartData}
          cx="50%"
          cy="50%"
          outerRadius={outerRadius}
          fill="#8884d8"
          label={renderCustomizedLabel}
        >
          {pieChartData.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={pieColors[index % pieColors.length]}
            />
          ))}
        </Pie>
        <Tooltip />
        <Legend layout="vertical" verticalAlign="top" align="right" />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default UserCompanyChart;
