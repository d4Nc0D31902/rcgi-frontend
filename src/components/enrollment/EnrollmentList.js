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
