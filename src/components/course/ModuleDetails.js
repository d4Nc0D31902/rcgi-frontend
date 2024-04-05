import React, { Fragment, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getModuleDetails, clearErrors } from "../../actions/moduleActions";
import Loader from "../layout/Loader";
import MetaData from "../layout/MetaData";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  IconButton,
  Typography,
  Grid,
  Paper,
  Button,
  Divider,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { deleteChapter } from "../../actions/chapterActions";
import { deleteLesson } from "../../actions/lessonActions";
import { deleteQuiz } from "../../actions/quizActions";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import BookIcon from "@mui/icons-material/Book";

const ModuleDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { loading, error, module } = useSelector(
    (state) => state.moduleDetails
  );

  const { user } = useSelector((state) => state.auth);
  const isAdmin = user && user.role === "admin";

  useEffect(() => {
    dispatch(getModuleDetails(id));
    return () => {
      dispatch(clearErrors());
    };
  }, [dispatch, id]);

  const handleDelete = (chapterId) => {
    if (window.confirm("Are you sure you want to delete this chapter?")) {
      dispatch(deleteChapter(chapterId)).then(() => {
        toast.success("Chapter deleted successfully");
        navigate("/admin/courses");
      });
    }
  };

  const handleDeleteQuiz = (quizId) => {
    if (window.confirm("Are you sure you want to delete this quiz?")) {
      dispatch(deleteQuiz(quizId)).then(() => {
        toast.success("Quiz deleted successfully");
      });
    }
  };

  const handleDeleteLesson = (lessonId) => {
    if (window.confirm("Are you sure you want to delete this lesson?")) {
      dispatch(deleteLesson(lessonId)).then(() => {
        toast.success("Lesson deleted successfully");
        navigate("/admin/courses");
      });
    }
  };

  if (loading) return <Loader />;
  if (error) return <Typography variant="h2">{error}</Typography>;

  return (
    <Fragment>
      <MetaData title={module.title} />
      <Grid container justifyContent="center">
        <Grid item xs={12} lg={8}>
          <Paper elevation={3} style={{ padding: "20px", marginTop: "20px" }}>
            <div style={{ marginBottom: "20px" }}>
              {module.images && (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                    padding: "10px",
                  }}
                >
                  {module.images.map((image, index) => (
                    <img
                      src={image.url}
                      alt={`Image ${index}`}
                      key={index}
                      style={{
                        width: "20%",
                        maxHeight: "200px",
                        margin: "10px 0",
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
            <Divider style={{ margin: "20px 0" }} />
            <Typography variant="h3" mt={2}>
              {module.title}
            </Typography>
            <Typography variant="body1" mt={2}>
              {module.description}
            </Typography>
            {isAdmin && (
              <Button
                variant="outlined"
                color="success"
                component={Link}
                to={`/admin/module/${id}/chapter/new`}
                mt={2}
                style={{ marginTop: "20px" }}
                startIcon={<BookIcon />}
              >
                Add Chapter
              </Button>
            )}
            <Divider style={{ margin: "20px 0" }} />

            <div>
              {module.chapters &&
                module.chapters.map((chapter, index) => (
                  <Accordion key={index}>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls={`chapter-${index}-content`}
                      id={`chapter-${index}-header`}
                    >
                      <div>
                        <Typography
                          variant="subtitle1"
                          component={Link}
                          to={`/admin/chapterDetails/${chapter._id}`}
                        >
                          {chapter.title}
                        </Typography>
                        {isAdmin && (
                          <IconButton
                            color="primary"
                            size="small"
                            component={Link}
                            to={`/admin/chapter/${chapter._id}`}
                          >
                            <EditOutlinedIcon fontSize="inherit" />
                          </IconButton>
                        )}
                        {isAdmin && (
                          <IconButton
                            color="error"
                            size="small"
                            onClick={() => handleDelete(chapter._id)}
                          >
                            <DeleteOutlineOutlinedIcon fontSize="inherit" />
                          </IconButton>
                        )}
                      </div>
                    </AccordionSummary>
                    <AccordionDetails
                      style={{
                        backgroundColor: "lightgray",
                      }}
                    >
                      {chapter.lessons.map((lesson, lessonIndex) => (
                        <div key={lessonIndex}>
                          <Typography
                            variant="body1"
                            component={Link}
                            to={`/admin/lessonDetails/${lesson._id}`}
                          >
                            {lesson.title}
                          </Typography>
                          {isAdmin && (
                            <IconButton
                              color="primary"
                              size="small"
                              component={Link}
                              to={`/admin/lesson/${lesson._id}`}
                            >
                              <EditOutlinedIcon fontSize="inherit" />
                            </IconButton>
                          )}
                          {isAdmin && (
                            <IconButton
                              color="error"
                              size="small"
                              onClick={() => handleDeleteLesson(lesson._id)}
                            >
                              <DeleteOutlineOutlinedIcon fontSize="inherit" />
                            </IconButton>
                          )}
                        </div>
                      ))}
                    </AccordionDetails>
                    <AccordionDetails
                      style={{
                        backgroundColor: "lightgray",
                      }}
                    >
                      {chapter.quizzes.map((quiz, quizIndex) => (
                        <div key={quizIndex}>
                          <Typography
                            variant="body1"
                            component={Link}
                            to={`/admin/quizDetails/${quiz._id}`}
                          >
                            {quiz.title}
                          </Typography>
                          {isAdmin && (
                            <IconButton
                              color="primary"
                              size="small"
                              component={Link}
                              to={`/admin/quiz/${quiz._id}`}
                            >
                              <EditOutlinedIcon fontSize="inherit" />
                            </IconButton>
                          )}
                          {isAdmin && (
                            <IconButton
                              color="error"
                              size="small"
                              onClick={() => handleDeleteQuiz(quiz._id)}
                            >
                              <DeleteOutlineOutlinedIcon fontSize="inherit" />
                            </IconButton>
                          )}
                        </div>
                      ))}
                    </AccordionDetails>
                  </Accordion>
                ))}
            </div>
          </Paper>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default ModuleDetails;
