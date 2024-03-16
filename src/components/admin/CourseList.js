import React, { Fragment, useEffect } from "react";

import { Link, useNavigate } from "react-router-dom";
import { MDBDataTable } from "mdbreact";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader";

import Sidebar from "./Sidebar";

import { useDispatch, useSelector } from "react-redux";

import {
  getCourses,
  deleteCourse,
  clearErrors,
} from "../../actions/courseActions";

import { DELETE_COURSE_RESET } from "../../constants/courseConstants";

const CoursesList = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const { loading, error, courses } = useSelector((state) => state.courses);
  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.course
  );
  useEffect(() => {
    dispatch(getCourses());
    if (error) {
      dispatch(clearErrors());
    }
    if (deleteError) {
      dispatch(clearErrors());
    }
    if (isDeleted) {
      navigate("/admin/courses");
      dispatch({ type: DELETE_COURSE_RESET });
    }
  }, [dispatch, error, navigate, isDeleted, deleteError]);

  const setCourses = () => {
    const data = {
      columns: [
        {
          label: "ID",
          field: "id",
          sort: "asc",
        },
        {
          label: "Title",
          field: "title",
          sort: "asc",
        },
        {
          label: "Description",
          field: "description",
          sort: "asc",
        },
        {
          label: "Actions",
          field: "actions",
        },
      ],
      rows: [],
    };
    courses.forEach((course) => {
      data.rows.push({
        id: course._id,
        title: course.title,
        description: course.description,
        actions: (
          <Fragment>
            <Link
              to={`/admin/showCourses`}
              className="btn btn-primary py-1 px-2"
            >
              <i className="fa fa-eye"></i>
            </Link>
            <button
              className="btn btn-danger py-1 px-2 ml-2"
              onClick={() => deleteCourseHandler(course._id)}
            >
              <i className="fa fa-trash"></i>
            </button>
          </Fragment>
        ),
      });
    });
    return data;
  };

  const deleteCourseHandler = (id) => {
    dispatch(deleteCourse(id));
  };

  return (
    <Fragment>
      <MetaData title={"All Courses"} />
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>
        <div className="col-12 col-md-10">
          <Fragment>
            <h1 className="my-5">All Courses</h1>
            {loading ? (
              <Loader />
            ) : (
              <MDBDataTable
                data={setCourses()}
                className="px-3"
                bordered
                striped
                hover
              />
            )}
          </Fragment>
        </div>
      </div>
    </Fragment>
  );
};

export default CoursesList;
