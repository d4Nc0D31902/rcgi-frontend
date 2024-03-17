import React, { Fragment, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getChapterDetails, clearErrors } from "../../actions/chapterActions";
import Loader from "../layout/Loader";
import MetaData from "../layout/MetaData";

const ChapterDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { loading, error, chapter } = useSelector(
    (state) => state.chapterDetails
  );

  useEffect(() => {
    dispatch(getChapterDetails(id));
    return () => {
      dispatch(clearErrors());
    };
  }, [dispatch, id]);

  if (loading) return <Loader />;
  if (error) return <h2>{error}</h2>;

  return (
    <Fragment>
      <MetaData title={chapter.title} />
      <div className="row">
        <div className="col-12 col-lg-5 mt-5">
          <h3>{chapter.title}</h3>
          {/* Use dangerouslySetInnerHTML to render HTML content */}
          <div
            className="mt-2"
            dangerouslySetInnerHTML={{ __html: chapter.description }}
          />
          <Link
            to={`/admin/chapter/${chapter._id}/lesson/new`}
            className="btn btn-primary"
          >
            Add Lesson
          </Link>
        </div>
      </div>
    </Fragment>
  );
};

export default ChapterDetails;
