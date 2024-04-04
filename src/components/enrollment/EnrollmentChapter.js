import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  CircularProgress,
  Typography,
  Grid,
  Paper,
  Button,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import MetaData from "../layout/MetaData";
import {
  getEnrollmentChapter,
  markChapterAsDone,
  getEnrollmentModule,
} from "../../actions/enrollmentActions";
import { ExpandMore as ExpandMoreIcon } from "@mui/icons-material";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";

const EnrollmentChapterDetails = () => {
  const dispatch = useDispatch();
  const { loading, error, chapter } = useSelector(
    (state) => state.getEnrollmentChapter
  );
  const { enrollmentModule } = useSelector(
    (state) => state.getEnrollmentModule
  );

  const { enrollmentId, moduleId, chapterId } = useParams();

  useEffect(() => {
    dispatch(getEnrollmentChapter(enrollmentId, moduleId, chapterId));
    dispatch(getEnrollmentModule(enrollmentId, moduleId));
  }, [dispatch, enrollmentId, moduleId, chapterId]);

  const handleMarkAsDone = () => {
    dispatch(markChapterAsDone(enrollmentId, moduleId, chapterId))
      .then(() => {
        toast.success("Chapter marked as done successfully!");
        dispatch(getEnrollmentChapter(enrollmentId, moduleId, chapterId));
        dispatch(getEnrollmentModule(enrollmentId, moduleId));
      })
      .catch((error) => {
        toast.error("Failed to mark chapter as done: " + error.message);
      });
  };

  return (
    <Fragment>
      <MetaData title={"Enrollment Chapter Details"} />
      <Grid container>
        <Grid item xs={12} lg={3} style={{ padding: "20px" }}>
          <Paper elevation={3}>
            {enrollmentModule && (
              <Fragment>
                {enrollmentModule.chapter.map((chapter, index) => (
                  <Accordion
                    key={index}
                    defaultExpanded={true}
                    style={{
                      border: "1px solid black",
                    }}
                  >
                    <AccordionSummary
                      style={{
                        backgroundColor: "white",
                      }}
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls={`chapter-${index}-content`}
                      id={`chapter-${index}-header`}
                    >
                      {index === 0 ||
                      (enrollmentModule.chapter[index - 1].status === "Done" &&
                        enrollmentModule.chapter[index - 1].lessons.every(
                          (lesson) => lesson.status === "Done"
                        ) &&
                        enrollmentModule.chapter[index - 1].quizzes.every(
                          (quiz) => quiz.status === "Done"
                        )) ? (
                        <Link
                          to={`/enrollment/${enrollmentId}/module/${moduleId}/chapter/${chapter._id}`}
                          style={{ textDecoration: "none" }}
                        >
                          <Typography
                            style={{
                              color:
                                chapter.status === "Done" ? "green" : "black",
                            }}
                          >
                            {chapter.chapterId.title}
                          </Typography>
                        </Link>
                      ) : (
                        <Typography style={{ color: "gray" }}>
                          {chapter.chapterId.title}
                        </Typography>
                      )}
                    </AccordionSummary>
                    <AccordionDetails
                      style={{
                        backgroundColor: "lightgray",
                      }}
                    >
                      <div>
                        <ul>
                          {chapter.lessons.map((lesson, lessonIndex) => (
                            <li key={lessonIndex}>
                              <Typography variant="body1" gutterBottom>
                                {chapter.status === "Done" ? (
                                  <Link
                                    to={`/enrollment/${enrollmentId}/module/${moduleId}/chapter/${chapter._id}/lesson/${lesson._id}`}
                                    style={{
                                      textDecoration: "none",
                                      color:
                                        lesson.status === "Done"
                                          ? "green"
                                          : "black",
                                    }}
                                  >
                                    {lesson.lessonId.title}
                                  </Link>
                                ) : (
                                  <span
                                    style={{
                                      color:
                                        lesson.status === "Not Done"
                                          ? "gray"
                                          : "",
                                    }}
                                  >
                                    {lesson.lessonId.title}
                                  </span>
                                )}
                              </Typography>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <ul>
                          {chapter.lessons.every(
                            (lesson) => lesson.status === "Done"
                          ) &&
                            chapter.quizzes.map((quiz, quizIndex) => (
                              <li key={quizIndex}>
                                <Typography variant="body1" gutterBottom>
                                  <Link
                                    to={`/enrollment/${enrollmentId}/module/${moduleId}/chapter/${chapter._id}/quiz/${quiz._id}`}
                                    style={{
                                      color:
                                        quiz.status === "Done"
                                          ? "green"
                                          : "black",
                                    }}
                                  >
                                    {quiz.quizId.title}
                                  </Link>
                                </Typography>
                              </li>
                            ))}
                        </ul>
                      </div>
                    </AccordionDetails>
                  </Accordion>
                ))}
              </Fragment>
            )}
          </Paper>
        </Grid>
        <Grid item xs={13} lg={9} style={{ marginTop: "20px" }}>
          {error ? (
            <Typography variant="h6" color="error" align="center">
              {error}
            </Typography>
          ) : (
            <Paper
              elevation={3}
              style={{ padding: "20px", marginRight: "20px" }}
            >
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
          )}
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default EnrollmentChapterDetails;
