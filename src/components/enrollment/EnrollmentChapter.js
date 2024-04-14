import React, { Fragment, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link, useNavigate } from "react-router-dom";
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
  Fab, // Import Fab for Floating Action Button
} from "@mui/material";
import MetaData from "../layout/MetaData";
import {
  getEnrollmentChapter,
  markChapterAsDone,
  getEnrollmentModule,
} from "../../actions/enrollmentActions";
import { ExpandMore as ExpandMoreIcon } from "@mui/icons-material";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp"; // Import ArrowUp Icon

const EnrollmentChapterDetails = () => {
  const dispatch = useDispatch();
  const { loading, error, chapter } = useSelector(
    (state) => state.getEnrollmentChapter
  );
  const { enrollmentModule } = useSelector(
    (state) => state.getEnrollmentModule
  );

  const { enrollmentId, moduleId, chapterId } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getEnrollmentChapter(enrollmentId, moduleId, chapterId));
    dispatch(getEnrollmentModule(enrollmentId, moduleId));
  }, [dispatch, enrollmentId, moduleId, chapterId]);

  const handleMarkAsDone = () => {
    dispatch(markChapterAsDone(enrollmentId, moduleId, chapterId))
      .then(() => {
        toast.success("Chapter marked as done successfully!");

        // Fetch updated data after marking chapter as done
        dispatch(getEnrollmentChapter(enrollmentId, moduleId, chapterId));
        dispatch(getEnrollmentModule(enrollmentId, moduleId)).then(() => {
          const currentChapter = enrollmentModule.chapter.find(
            (chap) => chap._id === chapterId
          );
          const hasLessons =
            currentChapter && currentChapter.lessons.length > 0;

          if (!hasLessons) {
            const nextChapter = enrollmentModule.chapter.find(
              (chap) =>
                chap.status === "Not Done" &&
                chap.lessons.length > 0 &&
                chap._id !== chapterId
            );

            if (nextChapter) {
              navigate(
                `/enrollment/${enrollmentId}/module/${moduleId}/chapter/${nextChapter._id}/lesson/${nextChapter.lessons[0].lessonId}`
              );
            } else {
              navigate(`/enrollment/${enrollmentId}/module/${moduleId}`);
            }
          } else {
            const currentChapterIndex = enrollmentModule.chapter.findIndex(
              (chap) => chap._id === chapterId
            );

            const currentLessonIndex = currentChapter.lessons.findIndex(
              (lesson) => lesson.status === "Not Done"
            );

            if (currentLessonIndex !== -1) {
              const nextLessonId =
                currentChapter.lessons[currentLessonIndex]._id;
              navigate(
                `/enrollment/${enrollmentId}/module/${moduleId}/chapter/${chapterId}/lesson/${nextLessonId}`
              );
            } else {
              const currentQuizIndex = currentChapter.quizzes.findIndex(
                (quiz) => quiz.status === "Not Done"
              );

              if (currentQuizIndex !== -1) {
                const nextQuizId = currentChapter.quizzes[currentQuizIndex]._id;
                navigate(
                  `/enrollment/${enrollmentId}/module/${moduleId}/chapter/${chapterId}/quiz/${nextQuizId}`
                );
              } else {
                const nextChapterId =
                  currentChapterIndex < enrollmentModule.chapter.length - 1
                    ? enrollmentModule.chapter[currentChapterIndex + 1]._id
                    : null;

                if (nextChapterId) {
                  navigate(
                    `/enrollment/${enrollmentId}/module/${moduleId}/chapter/${nextChapterId}`
                  );
                } else {
                  navigate(`/enrollment/${enrollmentId}/module/${moduleId}`);
                }
              }
            }
          }
        });
      })
      .catch((error) => {
        toast.error("Failed to mark chapter as done: " + error.message);
      });
  };

  const scrollRef = useRef(null);

  const scrollToTop = () => {
    scrollRef.current.scrollIntoView({ behavior: "smooth" });
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
                  //     (enrollmentModule.chapter[index - 1].status === "Done" &&
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
                  //     {/* <div>
                  //       <ul>
                  //         {chapter.lessons.map((lesson, lessonIndex) => (
                  //           <li key={lessonIndex}>
                  //             <Typography variant="body1" gutterBottom>
                  //               {chapter.status === "Done" ? (
                  //                 <Link
                  //                   to={`/enrollment/${enrollmentId}/module/${moduleId}/chapter/${chapter._id}/lesson/${lesson._id}`}
                  //                   style={{
                  //                     textDecoration: "none",
                  //                     color:
                  //                       lesson.status === "Done"
                  //                         ? "green"
                  //                         : "black",
                  //                   }}
                  //                 >
                  //                   {lesson.lessonId.title}
                  //                 </Link>
                  //               ) : (
                  //                 <span
                  //                   style={{
                  //                     color:
                  //                       lesson.status === "Not Done"
                  //                         ? "gray"
                  //                         : "",
                  //                   }}
                  //                 >
                  //                   {lesson.lessonId.title}
                  //                 </span>
                  //               )}
                  //             </Typography>
                  //           </li>
                  //         ))}
                  //       </ul>
                  //     </div> */}
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
                  //     {/* <div>
                  //       <ul>
                  //         {chapter.lessons.every(
                  //           (lesson) => lesson.status === "Done"
                  //         ) &&
                  //           chapter.quizzes.map((quiz, quizIndex) => (
                  //             <li key={quizIndex}>
                  //               <Typography variant="body1" gutterBottom>
                  //                 <Link
                  //                   to={`/enrollment/${enrollmentId}/module/${moduleId}/chapter/${chapter._id}/quiz/${quiz._id}`}
                  //                   style={{
                  //                     color:
                  //                       quiz.status === "Done"
                  //                         ? "green"
                  //                         : "black",
                  //                   }}
                  //                 >
                  //                   {quiz.quizId.title}
                  //                 </Link>
                  //               </Typography>
                  //             </li>
                  //           ))}
                  //       </ul>
                  //     </div> */}
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
                      (enrollmentModule.chapter[index - 1].status === "Done" &&
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
                                  chapter.status === "Done" ? "green" : "black",
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
                      style={{ borderRadius: "20px" }}
                      onClick={handleMarkAsDone}
                      disabled={loading}
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
                      style={{ borderRadius: "20px" }}
                      startIcon={<CheckOutlinedIcon />}
                      disabled
                    >
                      Done
                    </Button>
                  )}
                </div>
              )}
            </Paper>
          )}
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
    </Fragment>
  );
};

export default EnrollmentChapterDetails;
