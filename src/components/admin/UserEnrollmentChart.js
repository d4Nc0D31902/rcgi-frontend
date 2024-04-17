import React from "react";
import {
  PieChart,
  Pie,
  Legend,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const EnrollmentCourseChart = ({ enrollmentData }) => {
  const enrolledCourses = enrollmentData.reduce((acc, enrollment) => {
    enrollment.course.forEach((course) => {
      const courseId = course.courseId.title; 
      if (!acc[courseId]) {
        acc[courseId] = 0;
      }
      acc[courseId]++;
    });
    return acc;
  }, {});

  const pieChartData = Object.keys(enrolledCourses).map((courseId) => ({
    name: courseId,
    count: enrolledCourses[courseId],
  }));

  const pieColors = ["#8ecdd9", "#1ccc8f", "#f33455", "#ff48a3"];

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
          fill="#8ecdd9"
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

export default EnrollmentCourseChart;
