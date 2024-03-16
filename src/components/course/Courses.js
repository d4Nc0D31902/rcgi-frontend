import React from "react";
import { useSelector } from "react-redux";
import CourseCard from "./CourseCard";

const Courses = () => {
  const { courses } = useSelector((state) => state.courses);

  return (
    <div className="row">
      {courses.map((course) => (
        <CourseCard key={course._id} course={course} />
      ))}
    </div>
  );
};

export default Courses;
