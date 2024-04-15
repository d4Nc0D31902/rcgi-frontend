import React, { Fragment, useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link, useNavigate } from "react-router-dom";
import parse from "html-react-parser";
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
  Fab, 
} from "@mui/material";
import MetaData from "../layout/MetaData";
import {
  getSingleLesson,
  markLessonAsDone,
  getEnrollmentModule,
} from "../../actions/enrollmentActions";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ExpandMore as ExpandMoreIcon } from "@mui/icons-material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp"; 

const EnrollmentLessonDetails = () => {
  const dispatch = useDispatch();
  const { loading, error, lesson } = useSelector(
    (state) => state.getSingleLesson
  );
  const { enrollmentModule } = useSelector(
    (state) => state.getEnrollmentModule
  );

  const navigate = useNavigate();

  const { enrollmentId, moduleId, chapterId, lessonId } = useParams();

  const [videoKey, setVideoKey] = useState(0);

  useEffect(() => {
    dispatch(getSingleLesson(enrollmentId, moduleId, chapterId, lessonId));
    dispatch(getEnrollmentModule(enrollmentId, moduleId));
  }, [dispatch, enrollmentId, moduleId, chapterId, lessonId]);

  useEffect(() => {
    setVideoKey((prevKey) => prevKey + 1);
  }, [lesson?.lessonId?.videoURL]);

  const handleMarkAsDone = () => {
    dispatch(markLessonAsDone(enrollmentId, moduleId, chapterId, lessonId))
      .then(() => {
        toast.success("Lesson marked as done successfully!");
        dispatch(getSingleLesson(enrollmentId, moduleId, chapterId, lessonId));
        dispatch(getEnrollmentModule(enrollmentId, moduleId)).then(() => {
          const currentChapterIndex = enrollmentModule.chapter.findIndex(
            (chapter) => chapter._id === chapterId
          );
          const currentLessonIndex = enrollmentModule.chapter[
            currentChapterIndex
          ].lessons.findIndex((lesson) => lesson._id === lessonId);

          if (
            currentLessonIndex <
            enrollmentModule.chapter[currentChapterIndex].lessons.length - 1
          ) {
            const nextLessonId =
              enrollmentModule.chapter[currentChapterIndex].lessons[
                currentLessonIndex + 1
              ]._id;
            const nextLessonUrl = `/enrollment/${enrollmentId}/module/${moduleId}/chapter/${chapterId}/lesson/${nextLessonId}`;
            navigate(nextLessonUrl);
          } else {
            if (
              enrollmentModule.chapter[currentChapterIndex].quizzes.length > 0
            ) {
              const quizId =
                enrollmentModule.chapter[currentChapterIndex].quizzes[0]._id;
              const quizUrl = `/enrollment/${enrollmentId}/module/${moduleId}/chapter/${chapterId}/quiz/${quizId}`;
              navigate(quizUrl);
            } else {
              if (currentChapterIndex < enrollmentModule.chapter.length - 1) {
                const nextChapterId =
                  enrollmentModule.chapter[currentChapterIndex + 1]._id;
                const nextChapterUrl = `/enrollment/${enrollmentId}/module/${moduleId}/chapter/${nextChapterId}`;
                navigate(nextChapterUrl);
              } else {
                navigate("/");
              }
            }
          }
        });
      })
      .catch((error) => {
        toast.error("Failed to mark lesson as done: " + error.message);
      });
  };

  const scrollRef = useRef(null);

  const scrollToTop = () => {
    scrollRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Fragment>
      <MetaData title={"Enrollment Lesson Details"} />
      {error ? (
        <Typography variant="h6" color="error" align="center">
          {error}
        </Typography>
      ) : (
        <Grid container justifyContent="center">
          <Grid item xs={12} lg={3} style={{ padding: "20px" }}>
            <Paper elevation={3}>
              {enrollmentModule && (
                <Fragment>
                  {enrollmentModule.chapter.map((chapter, index) => (
                    // <Accordion
                    //   key={index}
                    //   defaultExpanded={true}
                    //   style={{
                    //     border: "1px solid black",
                    //   }}
                    // >
                    //   <AccordionSummary
                    //     style={{
                    //       backgroundColor: "white",
                    //     }}
                    //     expandIcon={<ExpandMoreIcon />}
                    //     aria-controls={`chapter-${index}-content`}
                    //     id={`chapter-${index}-header`}
                    //   >
                    //     {index === 0 ||
                    //     (enrollmentModule.chapter[index - 1].status ===
                    //       "Done" &&
                    //       enrollmentModule.chapter[index - 1].lessons.every(
                    //         (lesson) => lesson.status === "Done"
                    //       ) &&
                    //       enrollmentModule.chapter[index - 1].quizzes.every(
                    //         (quiz) => quiz.status === "Done"
                    //       )) ? (
                    //       <Link
                    //         to={`/enrollment/${enrollmentId}/module/${moduleId}/chapter/${chapter._id}`}
                    //         style={{ textDecoration: "none" }}
                    //       >
                    //         <Typography
                    //           style={{
                    //             color:
                    //               chapter.status === "Done" ? "green" : "black",
                    //           }}
                    //         >
                    //           {chapter.chapterId.title}
                    //         </Typography>
                    //       </Link>
                    //     ) : (
                    //       <Typography style={{ color: "gray" }}>
                    //         {chapter.chapterId.title}
                    //       </Typography>
                    //     )}
                    //   </AccordionSummary>
                    //   <AccordionDetails
                    //     style={{
                    //       backgroundColor: "lightgray",
                    //     }}
                    //   >
                    //     <div>
                    //       <ul>
                    //         {chapter.lessons.map((lesson, lessonIndex) => {
                    //           const isPreviousDone = chapter.lessons
                    //             .slice(0, lessonIndex)
                    //             .every(
                    //               (prevLesson) => prevLesson.status === "Done"
                    //             );
                    //           const isChapterDone = chapter.status === "Done";
                    //           const isLessonEnabled =
                    //             isPreviousDone && isChapterDone;

                    //           return (
                    //             <li key={lessonIndex}>
                    //               <Typography variant="body1" gutterBottom>
                    //                 {isLessonEnabled ? (
                    //                   <Link
                    //                     to={`/enrollment/${enrollmentId}/module/${moduleId}/chapter/${chapter._id}/lesson/${lesson._id}`}
                    //                     style={{
                    //                       textDecoration: "none",
                    //                       color:
                    //                         lesson.status === "Done"
                    //                           ? "green"
                    //                           : "black",
                    //                     }}
                    //                   >
                    //                     {lesson.lessonId.title}
                    //                   </Link>
                    //                 ) : (
                    //                   <span
                    //                     style={{
                    //                       color:
                    //                         lesson.status === "Not Done"
                    //                           ? "gray"
                    //                           : "",
                    //                     }}
                    //                   >
                    //                     {lesson.lessonId.title}
                    //                   </span>
                    //                 )}
                    //               </Typography>
                    //             </li>
                    //           );
                    //         })}
                    //       </ul>
                    //     </div>
                    //     <div>
                    //       <ul>
                    //         {chapter.lessons.every(
                    //           (lesson) => lesson.status === "Done"
                    //         ) &&
                    //           chapter.status !== "Not Done" &&
                    //           chapter.quizzes.map((quiz, quizIndex) => (
                    //             <li key={quizIndex}>
                    //               <Typography variant="body1" gutterBottom>
                    //                 {chapter.status === "Done" ? (
                    //                   <Link
                    //                     to={`/enrollment/${enrollmentId}/module/${moduleId}/chapter/${chapter._id}/quiz/${quiz._id}`}
                    //                     style={{
                    //                       color:
                    //                         quiz.status === "Done"
                    //                           ? "green"
                    //                           : "black",
                    //                     }}
                    //                   >
                    //                     {quiz.quizId.title}
                    //                   </Link>
                    //                 ) : (
                    //                   <span style={{ color: "gray" }}>
                    //                     {quiz.quizId.title}
                    //                   </span>
                    //                 )}
                    //               </Typography>
                    //             </li>
                    //           ))}
                    //       </ul>
                    //     </div>
                    //   </AccordionDetails>
                    // </Accordion>
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
                              {chapter.chapterId.title}
                            </span>
                          ) : (
                            <Link
                              to={`/enrollment/${enrollmentId}/module/${moduleId}/chapter/${chapter._id}`}
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
                                {chapter.chapterId.title}
                              </Typography>
                            </Link>
                          )
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
                            {chapter.lessons.map((lesson, lessonIndex) => {
                              const isPreviousDone = chapter.lessons
                                .slice(0, lessonIndex)
                                .every(
                                  (prevLesson) => prevLesson.status === "Done"
                                );
                              const isChapterDone = chapter.status === "Done";
                              const isModuleDone =
                                enrollmentModule.status === "Done";
                              const isLessonEnabled =
                                isPreviousDone && isChapterDone && isModuleDone;

                              return (
                                <li key={lessonIndex}>
                                  <Typography variant="body1" gutterBottom>
                                    {isLessonEnabled ? (
                                      lesson.status === "Not Done" ? (
                                        <span style={{ color: "gray" }}>
                                          {lesson.lessonId.title}
                                        </span>
                                      ) : (
                                        <Link
                                          to={`/enrollment/${enrollmentId}/module/${moduleId}/chapter/${chapter._id}/lesson/${lesson._id}`}
                                          style={{
                                            textDecoration: "none",
                                            color:
                                              lesson.status === "Done"
                                                ? "green"
                                                : "",
                                          }}
                                        >
                                          {lesson.lessonId.title}
                                        </Link>
                                      )
                                    ) : (
                                      <span
                                        style={{
                                          color:
                                            lesson.status === "Not Done"
                                              ? "gray"
                                              : "green",
                                        }}
                                      >
                                        {lesson.lessonId.title}
                                      </span>
                                    )}
                                  </Typography>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                        <div>
                          <ul>
                            {chapter.lessons.every(
                              (lesson) => lesson.status === "Done"
                            ) &&
                              chapter.status !== "Not Done" &&
                              chapter.quizzes.map((quiz, quizIndex) => (
                                <li key={quizIndex}>
                                  <Typography variant="body1" gutterBottom>
                                    {chapter.status === "Done" ? (
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
                                    ) : (
                                      <span style={{ color: "gray" }}>
                                        {quiz.quizId.title}
                                      </span>
                                    )}
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
          <Grid item xs={13} lg={9}>
            <Paper
              elevation={3}
              style={{
                padding: "20px",
                marginTop: "20px",
                marginRight: "20px",
              }}
            >
              {lesson && (
                <div>
                  <Typography variant="h4" gutterBottom>
                    {lesson.lessonId.title}
                  </Typography>
                  <Divider style={{ margin: "20px 0" }} />
                  {lesson.lessonId.videoURL && (
                    <Paper elevation={3} style={{ marginTop: 20 }}>
                      <video
                        key={videoKey} // Add key to force reload the video
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
                  <Divider style={{ margin: "20px 0" }} />
                  {/* <Typography
                    variant="body1"
                    style={{ marginTop: "20px" }}
                    dangerouslySetInnerHTML={{
                      __html: lesson.lessonId.content,
                    }}
                  /> */}
                  <Typography variant="body1" style={{ marginTop: "20px" }}>
                    {parse(lesson.lessonId.content)}
                  </Typography>
                  {lesson.status === "Not Done" ? (
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={handleMarkAsDone}
                      disabled={loading}
                      style={{ borderRadius: "20px" }}
                    >
                      {loading ? (
                        <CircularProgress size={24} color="primary" />
                      ) : (
                        "Mark As Done"
                      )}
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      color="success"
                      startIcon={<CheckOutlinedIcon />}
                      disabled
                      style={{ borderRadius: "20px" }}
                    >
                      Done
                    </Button>
                  )}
                </div>
              )}
            </Paper>
          </Grid>
          {/* Scroll to top button */}
          <Fab
            color="primary"
            aria-label="scroll-to-top"
            style={{
              position: "fixed",
              bottom: 20,
              right: 20,
              backgroundColor: "transparent",
            }}
            onClick={scrollToTop}
          >
            <KeyboardArrowUpIcon style={{ color: "black" }} />
          </Fab>
          <div ref={scrollRef}></div>
        </Grid>
      )}
    </Fragment>
  );
};

export default EnrollmentLessonDetails;
