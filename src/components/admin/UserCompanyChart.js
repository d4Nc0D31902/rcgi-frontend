import React from "react";
import {
  PieChart,
  Pie,
  Legend,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const UserCompanyChart = ({ userData }) => {
  const companies = ["Barcino", "Meat Depot", "Single Origin", "Bluesmith", "None"];

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

  const pieColors = ["#EADFB4", "#9BB0C1", "#51829B", "#F6995C", "#D37676"];

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

  return (
    <ResponsiveContainer width="90%" height={500}>
      <PieChart width={500} height={500}>
        <Pie
          dataKey="count"
          nameKey="name"
          isAnimationActive={true}
          data={pieChartData}
          cx="50%"
          cy="50%"
          outerRadius={200}
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
