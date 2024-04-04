import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  CircularProgress,
  Typography,
  Grid,
  Paper,
  Button,
  Divider,
} from "@mui/material";
import MetaData from "../layout/MetaData";
import {
  getEnrollmentChapter,
  markChapterAsDone,
} from "../../actions/enrollmentActions";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import EnrollmentModule from "./EnrollmentModule";

const EnrollmentChapterDetails = () => {
  const dispatch = useDispatch();
  const { loading, error, chapter } = useSelector(
    (state) => state.getEnrollmentChapter
  );

  const { enrollmentId, moduleId, chapterId } = useParams();

  useEffect(() => {
    dispatch(getEnrollmentChapter(enrollmentId, moduleId, chapterId));
  }, [dispatch, enrollmentId, moduleId, chapterId]);

  const handleMarkAsDone = () => {
    dispatch(markChapterAsDone(enrollmentId, moduleId, chapterId))
      .then(() => {
        toast.success("Chapter marked as done successfully!");
        dispatch(getEnrollmentChapter(enrollmentId, moduleId, chapterId));
      })
      .catch((error) => {
        toast.error("Failed to mark chapter as done: " + error.message);
      });
  };

  return (
    <Fragment>
      <MetaData title={"Enrollment Chapter Details"} />
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
              {chapter && (
                <div>
                  <Typography variant="h4" gutterBottom>
                    {chapter.chapterId.title}
                  </Typography>
                  <Divider style={{ margin: "20px 0" }} />

                  <Typography
                    variant="body1"
                    dangerouslySetInnerHTML={{
                      __html: chapter.chapterId.description,
                    }}
                  />
                  {chapter.status === "Not Done" ? (
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

export default EnrollmentChapterDetails;
