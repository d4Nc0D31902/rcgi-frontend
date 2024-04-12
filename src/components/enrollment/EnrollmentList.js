import React, { Fragment, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MDBDataTable } from "mdbreact";
import { CircularProgress } from "@mui/material";

import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader";
import { useDispatch, useSelector } from "react-redux";
import { myEnrollments, clearErrors } from "../../actions/enrollmentActions";

const ListEnrollments = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, enrollments } = useSelector(
    (state) => state.myEnrollment
  );

  useEffect(() => {
    dispatch(myEnrollments());
    if (error) {
      dispatch(clearErrors());
    }
  }, [dispatch, error]);

  const setEnrollments = () => {
    const data = {
      columns: [
        {
          label: "User",
          field: "user",
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

      data.rows.push({
        id: enrollment._id,
        user: enrollment.user[0].name,
        course: courseTitle,
        progress: calculateProgress(enrollment),
        actions: (
          <Link
            to={`/enrollment/${enrollment._id}`}
            className="btn btn-primary"
          >
            <i className="fa fa-eye"></i>
          </Link>
        ),
      });
    });

    return data;
  };

  const calculateProgress = (enrollment) => {
    let totalItems = 0;
    let completedItems = 0;

    enrollment.course.forEach((course) => {
      totalItems++;
      if (course.status === "Done") completedItems++;
    });

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

    const progress = (completedItems / totalItems) * 100;
    return progress;
  };

  const renderProgress = (progress) => {
    return (
      <div style={{ display: "flex", alignItems: "center" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "40px",
            height: "40px",
            marginRight: "8px",
            border: "2px solid #3f51b5",
            borderRadius: "50%",
          }}
        >
          <CircularProgress
            variant="determinate"
            value={progress}
            size={30}
            thickness={5}
            style={{ color: "#3f51b5" }}
          />
        </div>
        <span>{progress.toFixed(2)}%</span>
      </div>
    );
  };

  return (
    <Fragment>
      <MetaData title={"My Enrollments"} />
      <h1 className="my-5">My Enrollments</h1>
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
      <style jsx="true">{`
        .dataTables_wrapper {
          text-align: center;
        }
        .dataTables_wrapper .dataTables_scrollBody {
          display: flex;
          justify-content: center;
        }
        .dataTables_wrapper table {
          width: 100% !important;
        }
        .dataTables_wrapper .dataTables_scrollBody table {
          width: auto !important;
        }
      `}</style>
    </Fragment>
  );
};

export default ListEnrollments;
