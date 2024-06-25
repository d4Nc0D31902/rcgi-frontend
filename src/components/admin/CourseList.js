import React, { Fragment, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MDBDataTable } from "mdbreact";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader";
import Sidebar from "./Sidebar";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import {
  getCourses,
  deleteCourse,
  clearErrors,
  deactivateCourse,
  reactivateCourse,
} from "../../actions/courseActions";
import {
  DELETE_COURSE_RESET,
  DEACTIVATE_COURSE_RESET,
  REACTIVATE_COURSE_RESET,
} from "../../constants/courseConstants";

const CoursesList = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const { loading, error, courses } = useSelector((state) => state.courses);
  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.course
  );
  const { isDeactivated, isReactivated } =
    useSelector((state) => state.course) || {};

  const errMsg = (message = "") =>
    toast.error(message, {
      position: toast.POSITION.BOTTOM_CENTER,
    });

  const successMsg = (message = "") =>
    toast.success(message, {
      position: toast.POSITION.BOTTOM_CENTER,
    });

  useEffect(() => {
    dispatch(getCourses());
    if (error) {
      dispatch(clearErrors());
    }
    if (deleteError) {
      dispatch(clearErrors());
    }
    if (isDeactivated) {
      successMsg("Course deactivated successfully");
      console.log("Course deactivated:", isDeactivated);
      dispatch({ type: DEACTIVATE_COURSE_RESET });
    }
    if (isReactivated) {
      successMsg("Course reactivated successfully");
      console.log("Course reactivated:", isReactivated);
      dispatch({ type: REACTIVATE_COURSE_RESET });
    }
    if (isDeleted) {
      navigate("/admin/courses");
      dispatch({ type: DELETE_COURSE_RESET });
    }
  }, [dispatch, error, navigate, isDeleted, deleteError]);

  const toggleCourseActivation = async (id, isDeactivated) => {
    if (isDeactivated) {
      await dispatch(reactivateCourse(id));
      successMsg("Course Reactivated Successfully");
      console.log("Course reactivated:", id);
    } else {
      await dispatch(deactivateCourse(id));
      successMsg("Course Deactivated Successfully");
      console.log("Course deactivated:", id);
    }
    dispatch(getCourses());
  };

  const setCourses = () => {
    const truncateDescription = (description, maxLength) => {
      if (description.length > maxLength) {
        return description.substring(0, maxLength) + "...";
      }
      return description;
    };

    const data = {
      columns: [
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
        title: course.title,
        description: truncateDescription(course.description, 100),
        actions: (
          <Fragment>
            <Link
              to={`/admin/showCourses`}
              className="btn btn-primary py-1 px-2"
            >
              <i className="fa fa-eye"></i>
            </Link>
            <button
              className={`btn ${
                course.status === "inactive" ? "btn-success" : "btn-danger"
              } py-1 px-2 ml-2`}
              onClick={() =>
                toggleCourseActivation(course._id, course.status === "inactive")
              }
            >
              <i
                className={`fa ${
                  course.status === "inactive"
                    ? "fa-check-circle"
                    : "fa-times-circle"
                }`}
              ></i>
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
      <div className="row" style={{ marginRight: "120px", padding: "20px" }}>
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>
        <div className="col-12 col-md-10">
          <Fragment>
            <h1 className="my-5" style={{ color: "black" }}>
              All Courses
            </h1>
            <div className="table-responsive">
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
            </div>
          </Fragment>
        </div>
      </div>
    </Fragment>
  );
};

export default CoursesList;
