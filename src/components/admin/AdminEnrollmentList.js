import React, { Fragment, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MDBDataTable } from "mdbreact";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import {
  allEnrollments,
  clearErrors,
  deleteEnrollment,
} from "../../actions/enrollmentActions";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DELETE_ENROLLMENT_RESET } from "../../constants/enrollmentConstants";
import { CircularProgress } from "@mui/material";

const EnrollmentList = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const { loading, error, enrollments } = useSelector(
    (state) => state.allEnrollments
  );
  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.enrollment
  );
  useEffect(() => {
    dispatch(allEnrollments());
    if (error) {
      dispatch(clearErrors());
    }
    if (deleteError) {
      dispatch(clearErrors());
    }
    if (isDeleted) {
      navigate("/admin/enrollments");
      dispatch({ type: DELETE_ENROLLMENT_RESET });
      toast.success("Enrollment deleted successfully");
    }
  }, [dispatch, error, navigate, isDeleted, deleteError]);

  const setEnrollments = () => {
    const data = {
      columns: [
        {
          label: "Name of Employee",
          field: "user",
          sort: "asc",
        },
        {
          label: "Company",
          field: "company",
          sort: "asc",
        },
        {
          label: "Course",
          field: "course",
          sort: "asc",
        },
        {
          label: "Progress",
          field: "progress",
          sort: "asc",
        },
        {
          label: "Actions",
          field: "actions",
          sort: "asc",
        },
      ],
      rows: [],
    };

    enrollments.forEach((enrollment) => {
      const courseId = enrollment.course[0].courseId;
      const courseTitle = courseId.title;
      const userName = enrollment.user[0] ? enrollment.user[0].name : "N/A";
      const company = enrollment.user[0] ? enrollment.user[0].company : "N/A";

      data.rows.push({
        id: enrollment._id,
        user: userName,
        company: company,
        course: courseTitle,
        progress: calculateProgress(enrollment),
        actions: (
          <Fragment>
            <button
              className="btn btn-danger py-1 px-2 ml-2"
              onClick={() => deleteEnrollmentHandler(enrollment._id)}
            >
              <i className="fa fa-trash"></i>
            </button>
          </Fragment>
        ),
      });
    });

    return data;
  };

  const deleteEnrollmentHandler = (id) => {
    dispatch(deleteEnrollment(id));
  };

  const calculateProgress = (enrollment) => {
    let totalItems = 0;
    let completedItems = 0;

    enrollment.module.forEach((module) => {
      totalItems++;
      if (module.status === "Done") completedItems++;

      module.chapter.forEach((chapter) => {
        totalItems += chapter.lessons.length + chapter.quizzes.length;
        chapter.lessons.forEach((lesson) => {
          if (lesson.status === "Done") completedItems++;
        });
        chapter.quizzes.forEach((quiz) => {
          if (quiz.status === "Done") completedItems++;
        });
      });
    });

    const progress =
      totalItems === 0 ? 100 : (completedItems / totalItems) * 100;
    return progress;
  };

  const renderProgress = (progress) => {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "green",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "30px",
            height: "30px",
            marginRight: "8px",
          }}
        >
          <CircularProgress
            variant="determinate"
            value={progress}
            size={40}
            thickness={10}
            style={{ color: "green", position: "relative", zIndex: 1 }}
          />
        </div>
        <span>{progress.toFixed(2)}%</span>
      </div>
    );
  };

  return (
    <Fragment>
      <MetaData title={"All Enrollments"} />
      <div className="row" style={{ marginRight: "120px", padding: "20px" }}>
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>
        <div className="col-12 col-md-10">
          <Fragment>
            <h1 className="my-5">All Enrollments</h1>
            <div className="table-responsive">
              {loading ? (
                <Loader />
              ) : (
                <MDBDataTable
                  data={{
                    ...setEnrollments(),
                    rows: setEnrollments().rows.map((row) => ({
                      ...row,
                      progress: renderProgress(row.progress),
                    })),
                  }}
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

export default EnrollmentList;
