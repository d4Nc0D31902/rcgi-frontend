import React, { Fragment, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCourseDetails, clearErrors } from "../../actions/courseActions";
import Loader from "../layout/Loader";
import MetaData from "../layout/MetaData";
import CourseModuleCard from "./CourseModuleCard";

const CourseDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { loading, error, course } = useSelector(
    (state) => state.courseDetails
  );

  useEffect(() => {
    dispatch(getCourseDetails(id));
    return () => {
      dispatch(clearErrors());
    };
  }, [dispatch, id]);

  if (loading) return <Loader />;
  if (error) return <h2>{error}</h2>;

  return (
    <Fragment>
      <MetaData title={course.title} />
      <div className="row">
        <div className="col-12 col-lg-5 mt-5">
          <h3>{course.title}</h3>
          <p className="mt-2">{course.description}</p>
          <Link to={`/admin/course/${id}/module`} className="btn btn-primary">
            Add Module
          </Link>
        </div>
      </div>
      <div className="row mt-4">
        {course.modules &&
          course.modules.map((module) => (
            <div key={module._id} className="col-12 col-md-6 col-lg-4">
              <CourseModuleCard module={module} />
            </div>
          ))}
      </div>
    </Fragment>
  );
};

export default CourseDetails;
