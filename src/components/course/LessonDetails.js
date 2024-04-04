import React, { Fragment, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getLessonDetails,
  clearErrors,
  markLessonAsDone,
} from "../../actions/lessonActions";
import Loader from "../layout/Loader";
import MetaData from "../layout/MetaData";
import { Typography, Grid, Paper, Button } from "@mui/material";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CheckIcon from "@mui/icons-material/Check";

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

  const handleMarkAsDone = () => {
    dispatch(markLessonAsDone(id));
    window.location.reload();
    toast.success("Lesson marked as done successfully!");
  };

  if (loading) return <Loader />;
  if (error) return <Typography variant="h6">{error}</Typography>;

  return (
    <Fragment>
      <MetaData title={lesson.title} />
      <Grid container justifyContent="center">
        <Grid item xs={12} lg={5} mt={5}>
          <Typography variant="h4" gutterBottom>
            {lesson.title}
          </Typography>
          {lesson.videoURL && (
            <Paper elevation={3} mt={2}>
              <video
                controls
                controlsList="nodownload"
                disablePictureInPicture
                style={{ width: "100%", height: "auto" }}
              >
                <source src={lesson.videoURL} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </Paper>
          )}
          <Typography
            variant="body1"
            mt={2}
            dangerouslySetInnerHTML={{ __html: lesson.content }}
          />
          {lesson.status === "Not Done" && (
            <Button
              onClick={handleMarkAsDone}
              variant="contained"
              color="primary"
              disabled={loading}
            >
              {loading ? "Loading..." : "Mark As Done"}
            </Button>
          )}

          {lesson.status === "Done" && (
            <Button
              variant="contained"
              color="success"
              startIcon={<CheckIcon />}
            >
              Done
            </Button>
          )}
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default LessonDetails;
