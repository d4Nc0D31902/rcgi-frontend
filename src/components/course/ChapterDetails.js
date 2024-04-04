import React, { Fragment, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Grid,
  Typography,
  Button,
  Paper, // Import Paper component
  Divider,
} from "@mui/material";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  getChapterDetails,
  clearErrors,
  markChapterAsDone,
} from "../../actions/chapterActions";
import Loader from "../layout/Loader";
import MetaData from "../layout/MetaData";
import CheckIcon from "@mui/icons-material/Check";
import QuizIcon from "@mui/icons-material/Quiz";
import PlayLessonIcon from "@mui/icons-material/PlayLesson";

const ChapterDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { loading, error, chapter } = useSelector(
    (state) => state.chapterDetails
  );
  const { success: markAsDoneSuccess } = useSelector(
    (state) => state.markChapterAsDone
  );
  const { user } = useSelector((state) => state.auth);
  const isAdmin = user && user.role === "admin";
  useEffect(() => {
    dispatch(getChapterDetails(id));
    return () => {
      dispatch(clearErrors());
    };
  }, [dispatch, id]);

  const handleMarkAsDone = () => {
    dispatch(markChapterAsDone(id));
    toast.success("Chapter Done!");
    window.location.reload();
  };
  if (loading) return <Loader />;
  if (error) return <Typography variant="h2">{error}</Typography>;

  return (
    <Fragment>
      <MetaData title={chapter.title} />
      <Grid container justifyContent="center">
        <Grid item xs={12} lg={8}>
          {/* Apply Paper component */}
          <Paper elevation={3} style={{ padding: "20px", marginTop: "20px" }}>
            <Typography variant="h3" gutterBottom>
              {chapter.title}
            </Typography>
            <Divider style={{ margin: "20px 0" }} />
            <Typography
              variant="body1"
              dangerouslySetInnerHTML={{ __html: chapter.description }}
            />
            {isAdmin && (
              <Button
                component={Link}
                to={`/admin/chapter/${chapter._id}/lesson/new`}
                variant="outlined"
                style={{ marginLeft: "20px" }}
                color="primary"
                startIcon={<PlayLessonIcon />}
              >
                Add Lesson
              </Button>
            )}
            {isAdmin && (
              <Button
                component={Link}
                to={`/admin/chapter/${chapter._id}/quiz/new`}
                variant="outlined"
                color="primary"
                style={{ marginLeft: "20px" }}
                startIcon={<QuizIcon />}
              >
                Add Quiz
              </Button>
            )}
            {chapter.status === "Not Done" && (
              <Button
                onClick={handleMarkAsDone}
                variant="contained"
                color="primary"
                disabled={loading}
              >
                {loading ? "Loading..." : "Mark As Done"}
              </Button>
            )}

            {chapter.status === "Done" && (
              <Button
                variant="contained"
                color="success"
                startIcon={<CheckIcon />}
              >
                Done
              </Button>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default ChapterDetails;
