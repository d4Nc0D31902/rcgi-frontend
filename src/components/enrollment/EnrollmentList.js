import React, { Fragment, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MDBDataTable } from "mdbreact";

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
          label: "Enrollment ID",
          field: "id",
          sort: "asc",
        },
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

  return (
    <Fragment>
      <MetaData title={"My Enrollments"} />
      <h1 className="my-5">My Enrollments</h1>
      {loading ? (
        <Loader />
      ) : (
        <MDBDataTable
          data={setEnrollments()}
          className="px-3"
          bordered
          striped
          hover
        />
      )}
    </Fragment>
  );
};

export default ListEnrollments;
