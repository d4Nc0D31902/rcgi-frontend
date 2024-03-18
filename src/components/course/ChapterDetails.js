import React, { Fragment, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Typography, Button } from "@mui/material";
import { getChapterDetails, clearErrors } from "../../actions/chapterActions";
import Loader from "../layout/Loader";
import MetaData from "../layout/MetaData";

const ChapterDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { loading, error, chapter } = useSelector(
    (state) => state.chapterDetails
  );
  const { user } = useSelector((state) => state.auth);
  const isAdmin = user && user.role === "admin";
  useEffect(() => {
    dispatch(getChapterDetails(id));
    return () => {
      dispatch(clearErrors());
    };
  }, [dispatch, id]);

  if (loading) return <Loader />;
  if (error) return <Typography variant="h2">{error}</Typography>;

  return (
    <Fragment>
      <MetaData title={chapter.title} />
      <Grid container spacing={2}>
        <Grid item xs={12} lg={5}>
          <Typography variant="h3" gutterBottom>
            {chapter.title}
          </Typography>
          <Typography
            variant="body1"
            dangerouslySetInnerHTML={{ __html: chapter.description }}
          />
          {isAdmin && (
            <Button
              component={Link}
              to={`/admin/chapter/${chapter._id}/lesson/new`}
              variant="contained"
              color="primary"
            >
              Add Lesson
            </Button>
          )}
          {isAdmin && (
            <Button
              component={Link}
              to={`/admin/chapter/${chapter._id}/quiz/new`}
              variant="contained"
              color="primary"
            >
              Add Quiz
            </Button>
          )}
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default ChapterDetails;
