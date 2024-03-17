import React, { Fragment, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getLessonDetails, clearErrors } from "../../actions/lessonActions";
import Loader from "../layout/Loader";
import MetaData from "../layout/MetaData";

const LessonDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { loading, error, lesson } = useSelector(
    (state) => state.lessonDetails
  );

  useEffect(() => {
    dispatch(getLessonDetails(id));
    return () => {
      dispatch(clearErrors());
    };
  }, [dispatch, id]);

  if (loading) return <Loader />;
  if (error) return <h2>{error}</h2>;

  return (
    <Fragment>
      <MetaData title={lesson.title} />
      <div className="row">
        <div className="col-12 col-lg-5 mt-5">
          <h3>{lesson.title}</h3>
          {/* <p className="mt-2">{lesson.content}</p>{" "} */}
          <div
            className="mt-2"
            dangerouslySetInnerHTML={{ __html: lesson.content }}
          />
        </div>
      </div>
    </Fragment>
  );
};

export default LessonDetails;
