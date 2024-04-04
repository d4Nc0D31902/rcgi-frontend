import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  CircularProgress,
  Typography,
  Grid,
  Paper,
  Button,
} from "@mui/material";
import MetaData from "../layout/MetaData";
import {
  getSingleLesson,
  markLessonAsDone,
} from "../../actions/enrollmentActions";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EnrollmentLessonDetails = () => {
  const dispatch = useDispatch();
  const { loading, error, lesson } = useSelector(
    (state) => state.getSingleLesson
  );

  const { enrollmentId, moduleId, chapterId, lessonId } = useParams();

  useEffect(() => {
    dispatch(getSingleLesson(enrollmentId, moduleId, chapterId, lessonId));
  }, [dispatch, enrollmentId, moduleId, chapterId, lessonId]);

  const handleMarkAsDone = () => {
    dispatch(markLessonAsDone(enrollmentId, moduleId, chapterId, lessonId))
      .then(() => {
        toast.success("Lesson marked as done successfully!");
        dispatch(getSingleLesson(enrollmentId, moduleId, chapterId, lessonId));
      })
      .catch((error) => {
        toast.error("Failed to mark lesson as done: " + error.message);
      });
  };

  return (
    <Fragment>
      <MetaData title={"Enrollment Lesson Details"} />
      {loading ? (
        <CircularProgress style={{ margin: "auto" }} />
      ) : error ? (
        <Typography variant="h6" color="error" align="center">
          {error}
        </Typography>
      ) : (
        <Grid container justifyContent="center">
          <Grid item xs={12} lg={8}>
            <Paper elevation={3} style={{ padding: "20px", marginTop: "20px" }}>
              <Typography variant="h4" gutterBottom>
                Lesson Info
              </Typography>
              <Typography variant="h5" gutterBottom>
                Lesson Details
              </Typography>
              {lesson && (
                <div>
                  <Typography variant="subtitle1" gutterBottom>
                    Title: {lesson.lessonId.title}
                  </Typography>
                  {lesson.lessonId.videoURL && (
                    <Paper elevation={3} style={{ marginTop: 20 }}>
                      <video
                        controls
                        controlsList="nodownload"
                        disablePictureInPicture
                        style={{ width: "100%", height: "auto" }}
                      >
                        <source
                          src={lesson.lessonId.videoURL}
                          type="video/mp4"
                        />
                        Your browser does not support the video tag.
                      </video>
                    </Paper>
                  )}
                  <Typography
                    variant="body1"
                    dangerouslySetInnerHTML={{
                      __html: lesson.lessonId.content,
                    }}
                  />
                  {/* Conditionally render buttons based on lesson status */}
                  {lesson.status === "Not Done" ? (
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={handleMarkAsDone}
                      disabled={loading}
                    >
                      Mark As Done
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      color="success"
                      startIcon={<CheckOutlinedIcon />}
                    >
                      Done
                    </Button>
                  )}
                </div>
              )}
            </Paper>
          </Grid>
        </Grid>
      )}
    </Fragment>
  );
};

export default EnrollmentLessonDetails;
