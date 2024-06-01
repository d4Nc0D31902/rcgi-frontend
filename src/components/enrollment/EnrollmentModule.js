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

  if (loading) {
    return (
      <Grid container justifyContent="center">
        <CircularProgress />
      </Grid>
    );
  }

  return (
    <Fragment>
      <MetaData title={"Enrollment Module Details"} />
      {error ? (
        <Typography variant="h6" color="error" align="center">
          {error}
        </Typography>
      ) : (
        <Grid container justifyContent="center">
          <Grid item xs={12} lg={8}>
            <Paper elevation={3} style={{ padding: "20px", marginTop: "20px" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                  padding: "10px",
                }}
              >
                {enrollmentModule?.moduleId?.images && (
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
                    {enrollmentModule?.moduleId?.title || "No Title Available"}
                  </Typography>
                  <Typography variant="subtitle1" gutterBottom>
                    {enrollmentModule?.moduleId?.description ||
                      "No Description Available"}
                  </Typography>
                  <Divider style={{ margin: "20px 0" }} />
                  {/* Chapters Section */}
                  {enrollmentModule.chapter?.map((chapter, index) => (
                    <Accordion
                      key={index}
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
                        {/* Chapter Title */}
                        {index === 0 ||
                        (enrollmentModule.chapter[index - 1].status ===
                          "Done" &&
                          enrollmentModule.chapter[index - 1].lessons.every(
                            (lesson) => lesson.status === "Done"
                          ) &&
                          enrollmentModule.chapter[index - 1].quizzes.every(
                            (quiz) => quiz.status === "Done"
                          )) ? (
                          chapter.status === "Done" &&
                          enrollmentModule.status !== "Done" ? (
                            <span style={{ color: "green" }}>
                              {chapter.chapterId?.title || "No Title Available"}
                            </span>
                          ) : (
                            <Link
                              to={`/enrollment/${id}/module/${moduleId}/chapter/${chapter._id}`}
                              style={{ textDecoration: "none" }}
                            >
                              <Typography
                                style={{
                                  color:
                                    chapter.status === "Done"
                                      ? "green"
                                      : "black",
                                }}
                              >
                                {chapter.chapterId?.title ||
                                  "No Title Available"}
                              </Typography>
                            </Link>
                          )
                        ) : (
                          <Typography style={{ color: "gray" }}>
                            {chapter.chapterId?.title || "No Title Available"}
                          </Typography>
                        )}
                      </AccordionSummary>
                      {/* Chapter Details */}
                      <AccordionDetails
                        style={{
                          backgroundColor: "lightgray",
                        }}
                      >
                        {/* Lesson List */}
                        <div>
                          <ul>
                            {chapter.lessons?.map((lesson, lessonIndex) => {
                              const isPreviousDone = chapter.lessons
                                .slice(0, lessonIndex)
                                .every(
                                  (prevLesson) => prevLesson.status === "Done"
                                );
                              const isChapterDone = chapter.status === "Done";
                              const isLessonEnabled =
                                isPreviousDone &&
                                isChapterDone &&
                                ((enrollmentModule.status === "Done" &&
                                  lesson.status === "Done") ||
                                  (enrollmentModule.status === "Not Done" &&
                                    lesson.status !== "Done"));

                              return (
                                <li key={lessonIndex}>
                                  <Typography variant="body1" gutterBottom>
                                    {isLessonEnabled ? (
                                      <Link
                                        to={`/enrollment/${id}/module/${moduleId}/chapter/${chapter._id}/lesson/${lesson._id}`}
                                        style={{
                                          textDecoration: "none",
                                          color:
                                            lesson.status === "Done"
                                              ? "green"
                                              : "black",
                                        }}
                                      >
                                        {lesson.lessonId?.title ||
                                          "No Title Available"}
                                      </Link>
                                    ) : (
                                      <span
                                        style={{
                                          color:
                                            lesson.status === "Not Done"
                                              ? "gray"
                                              : "green",
                                        }}
                                      >
                                        {lesson.lessonId?.title ||
                                          "No Title Available"}
                                      </span>
                                    )}
                                  </Typography>
                                </li>
                              );
                            })}
                          </ul>
                        </div>

                        {/* Forum Section for the last chapter */}
                        {index === enrollmentModule.chapter.length - 1 && (
                          <div
                            style={{ color: "black", textDecoration: "none" }}
                          >
                            <ul>
                              {enrollmentModule.forum?.map(
                                (forum, forumIndex) => (
                                  <li key={forumIndex}>
                                    <Typography
                                      variant="subtitle1"
                                      gutterBottom
                                    >
                                      {chapter.status === "Not Done" ? (
                                        <span style={{ color: "gray" }}>
                                          {forum.forumId?.title ||
                                            "No Title Available"}
                                        </span>
                                      ) : (
                                        <span style={{ color: "green" }}>
                                          {forum.forumId?.title ||
                                            "No Title Available"}
                                        </span>
                                      )}
                                    </Typography>
                                  </li>
                                )
                              )}
                            </ul>
                          </div>
                        )}

                        {/* Quiz List */}
                        <div>
                          <ul>
                            {chapter.lessons?.every(
                              (lesson) => lesson.status === "Done"
                            ) &&
                              chapter.status !== "Not Done" &&
                              chapter.quizzes?.map((quiz, quizIndex) => {
                                const isForumDone =
                                  enrollmentModule.forum?.every(
                                    (forum) => forum.status === "Done"
                                  );

                                return (
                                  <li key={quizIndex}>
                                    <Typography variant="body1" gutterBottom>
                                      {chapter.status === "Done" &&
                                      isForumDone ? (
                                        <Link
                                          to={`/enrollment/${id}/module/${moduleId}/chapter/${chapter._id}/quiz/${quiz._id}`}
                                          style={{
                                            color:
                                              quiz.status === "Done"
                                                ? "green"
                                                : "black",
                                          }}
                                        >
                                          {quiz.quizId?.title ||
                                            "No Title Available"}
                                        </Link>
                                      ) : (
                                        <span style={{ color: "gray" }}>
                                          {quiz.quizId?.title ||
                                            "No Title Available"}
                                        </span>
                                      )}
                                    </Typography>
                                  </li>
                                );
                              })}
                          </ul>
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
