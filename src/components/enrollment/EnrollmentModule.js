import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { getEnrollmentModule } from "../../actions/enrollmentActions";
import {
  CircularProgress,
  Typography,
  Grid,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
} from "@mui/material";
import { ExpandMore as ExpandMoreIcon } from "@mui/icons-material";
import MetaData from "../layout/MetaData";

const EnrollmentModuleDetails = () => {
  const dispatch = useDispatch();
  const { loading, error, enrollmentModule } = useSelector(
    (state) => state.getEnrollmentModule
  );
  const { id, moduleId } = useParams();

  useEffect(() => {
    dispatch(getEnrollmentModule(id, moduleId));
  }, [dispatch, id, moduleId]);

  return (
    <Fragment>
      <MetaData title={"Enrollment Module Details"} />
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
              {/* <Typography variant="h4" gutterBottom>
                Module Info
              </Typography> */}
              {/* <Typography variant="h5" gutterBottom>
                Module Details
              </Typography> */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                  padding: "10px",
                }}
              >
                {enrollmentModule && enrollmentModule.moduleId.images && (
                  <div>
                    {enrollmentModule.moduleId.images.map((image, index) => (
                      <img
                        key={index}
                        src={image.url}
                        alt={`Module Image ${index + 1}`}
                        style={{
                          width: "100%",
                          maxHeight: "200px",
                          margin: "10px 0",
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>
              <Divider style={{ margin: "20px 0" }} />
              {enrollmentModule && (
                <div>
                  <Typography variant="h5" gutterBottom>
                    {/* Title: {enrollmentModule.moduleId.title} */}
                    {enrollmentModule.moduleId.title}
                  </Typography>
                  <Typography variant="subtitle1" gutterBottom>
                    {/* Description: {enrollmentModule.moduleId.description} */}
                    {enrollmentModule.moduleId.description}
                  </Typography>
                  <Divider style={{ margin: "20px 0" }} />
                  {/* <Typography variant="h5" gutterBottom>
                    Chapters
                  </Typography> */}
                  {enrollmentModule.chapter.map((chapter, index) => (
                    <Accordion key={index}>
                      {/* <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls={`chapter-${index}-content`}
                        id={`chapter-${index}-header`}
                      >
                        {chapter.status === "Done" ||
                        index === 0 ||
                        enrollmentModule.chapter[index - 1].status ===
                          "Done" ? (
                          <Link
                            to={`/enrollment/${id}/module/${moduleId}/chapter/${chapter._id}`}
                            style={{ textDecoration: "none", color: "green" }}
                          >
                            <Typography style={{ color: "green" }}>
                              {chapter.chapterId.title}
                            </Typography>
                          </Link>
                        ) : (
                          <Typography style={{ color: "black" }}>
                            {chapter.chapterId.title}
                          </Typography>
                        )}
                      </AccordionSummary> */}
                      {/* <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls={`chapter-${index}-content`}
                        id={`chapter-${index}-header`}
                      >
                        <Link
                          to={`/enrollment/${id}/module/${moduleId}/chapter/${chapter._id}`}
                          style={{ textDecoration: "none", color: "green" }}
                        >
                          <Typography style={{ color: "green" }}>
                            {chapter.chapterId.title}
                          </Typography>
                        </Link>
                      </AccordionSummary> */}
                      {/* <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls={`chapter-${index}-content`}
                        id={`chapter-${index}-header`}
                      >
                        {chapter.status === "Not Done" ? (
                          <Typography style={{ color: "gray" }}>
                            {chapter.chapterId.title}
                          </Typography>
                        ) : (
                          <Link
                            to={`/enrollment/${id}/module/${moduleId}/chapter/${chapter._id}`}
                            style={{ textDecoration: "none", color: "green" }}
                          >
                            <Typography style={{ color: "green" }}>
                              {chapter.chapterId.title}
                            </Typography>
                          </Link>
                        )}
                      </AccordionSummary> */}
                      {/* <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls={`chapter-${index}-content`}
                        id={`chapter-${index}-header`}
                      >
                        {index === 0 || chapter.status !== "Not Done" ? (
                          <Link
                            to={`/enrollment/${id}/module/${moduleId}/chapter/${chapter._id}`}
                            style={{ textDecoration: "none", color: "green" }}
                          >
                            <Typography style={{ color: "green" }}>
                              {chapter.chapterId.title}
                            </Typography>
                          </Link>
                        ) : (
                          <Typography style={{ color: "gray" }}>
                            {chapter.chapterId.title}
                          </Typography>
                        )}
                      </AccordionSummary> */}
                      <AccordionSummary
                        style={{
                          backgroundColor: "white",
                        }}
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls={`chapter-${index}-content`}
                        id={`chapter-${index}-header`}
                      >
                        {index === 0 ||
                        (enrollmentModule.chapter[index - 1].status ===
                          "Done" &&
                          enrollmentModule.chapter[index - 1].lessons.every(
                            (lesson) => lesson.status === "Done"
                          ) &&
                          enrollmentModule.chapter[index - 1].quizzes.every(
                            (quiz) => quiz.status === "Done"
                          )) ? (
                          <Link
                            to={`/enrollment/${id}/module/${moduleId}/chapter/${chapter._id}`}
                            style={{ textDecoration: "none", color: "green" }}
                          >
                            <Typography style={{ color: "green" }}>
                              {chapter.chapterId.title}
                            </Typography>
                          </Link>
                        ) : (
                          <Typography style={{ color: "gray" }}>
                            {chapter.chapterId.title}
                          </Typography>
                        )}
                      </AccordionSummary>
                      {/* <AccordionDetails> */}
                      <AccordionDetails
                        style={{
                          backgroundColor: "gray", // Change background color to light blue
                        }}
                      >
                        <div>
                          {chapter.lessons.map((lesson, lessonIndex) => (
                            <Typography
                              key={lessonIndex}
                              variant="body1"
                              gutterBottom
                              style={{
                                color:
                                  lesson.status === "Done" ? "green" : "black",
                                pointerEvents:
                                  lessonIndex === 0 ||
                                  chapter.lessons[lessonIndex - 1].status ===
                                    "Done"
                                    ? "auto"
                                    : "none",
                                textDecoration:
                                  lessonIndex === 0 ||
                                  chapter.lessons[lessonIndex - 1].status ===
                                    "Done"
                                    ? "auto"
                                    : "none",
                              }}
                            >
                              {chapter.status === "Done" ? (
                                <Link
                                  to={`/enrollment/${id}/module/${moduleId}/chapter/${chapter._id}/lesson/${lesson._id}`}
                                  style={{
                                    textDecoration: "none",
                                  }}
                                >
                                  {lesson.lessonId.title}
                                </Link>
                              ) : (
                                <span>{lesson.lessonId.title}</span>
                              )}
                            </Typography>
                          ))}
                        </div>
                        <div>
                          {/* Render quizzes only if all lessons in the chapter are done */}
                          {chapter.lessons.every(
                            (lesson) => lesson.status === "Done"
                          ) &&
                            chapter.quizzes.map((quiz, quizIndex) => (
                              <Typography
                                key={quizIndex}
                                variant="body1"
                                gutterBottom
                                style={{
                                  color:
                                    quiz.status === "Done" ? "green" : "black",
                                }}
                              >
                                <Link
                                  to={`/enrollment/${id}/module/${moduleId}/chapter/${chapter._id}/quiz/${quiz._id}`}
                                  style={{
                                    textDecoration: "none",
                                  }}
                                >
                                  {quiz.quizId.title}
                                </Link>
                              </Typography>
                            ))}
                        </div>
                      </AccordionDetails>
                    </Accordion>
                  ))}
                </div>
              )}
            </Paper>
          </Grid>
        </Grid>
      )}
    </Fragment>
  );
};

export default EnrollmentModuleDetails;
