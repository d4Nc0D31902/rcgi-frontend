import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import CourseCard from "./CourseCard";
import Loader from "../layout/Loader";
import { getCourses } from "../../actions/courseActions";

const Courses = () => {
  const dispatch = useDispatch();
  const { courses, loading, error } = useSelector((state) => state.courses);
  const { user } = useSelector((state) => state.auth);
  const isAdmin = user && user.role === "admin";

  useEffect(() => {
    dispatch(getCourses());
  }, [dispatch]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div
      className="row"
      style={{
        justifyContent: "center",
        alignContent: "center",
        display: "flex",
      }}
    >
      {courses.map((course) => {
        if (course.status === "active" || isAdmin) {
          return <CourseCard key={course._id} course={course} />;
        } else {
          return null; // Hide the Course
        }
      })}
    </div>
  );
};

export default Courses;
