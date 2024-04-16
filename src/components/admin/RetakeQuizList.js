import React, { Fragment, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MDBDataTable } from "mdbreact";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { allEnrollments, clearErrors } from "../../actions/enrollmentActions";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SubmitQuizList = () => {
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
          label: "Chapter",
          field: "chapter",
          sort: "asc",
        },
        {
          label: "Quiz",
          field: "quiz",
          sort: "asc",
        },
        {
          label: "Retake",
          field: "retake",
          sort: "asc",
        },
      ],
      rows: [],
    };

    enrollments.forEach((enrollment) => {
      const userName = enrollment.user[0] ? enrollment.user[0].name : "N/A";
      const company = enrollment.user[0] ? enrollment.user[0].company : "N/A";

      enrollment.retake.forEach((retaken) => {
        const chapterTitle = retaken.chapter ? retaken.chapter.title : "N/A";
        const quizTitle = retaken.quiz ? retaken.quiz.title : "N/A";

        data.rows.push({
          id: enrollment._id,
          user: userName,
          company: company,
          chapter: chapterTitle,
          quiz: quizTitle,
          retake: retaken.retake,
        });
      });
    });

    return data;
  };

  return (
    <Fragment>
      <MetaData title={"Quiz Retakes"} />
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>
        <div className="col-12 col-md-10">
          <Fragment>
            <h1 className="my-5">Quiz Retakes</h1>
            {loading ? (
              <Loader />
            ) : (
              <MDBDataTable
                data={{
                  ...setEnrollments(),
                  rows: setEnrollments().rows.map((row) => ({
                    ...row,
                  })),
                }}
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

export default SubmitQuizList;
