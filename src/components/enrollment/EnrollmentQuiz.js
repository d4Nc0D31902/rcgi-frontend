import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  getSingleQuiz,
  markQuizAsDone,
  getEnrollmentModule,
  createSubmit,
  createRetake,
} from "../../actions/enrollmentActions";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  CircularProgress,
  Typography,
  Grid,
  Paper,
  Radio,
  FormControl,
  FormControlLabel,
  RadioGroup,
  Button,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import { ExpandMore as ExpandMoreIcon } from "@mui/icons-material";
import MetaData from "../layout/MetaData";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import RefreshIcon from "@mui/icons-material/Refresh";

const EnrollmentQuizDetails = () => {
  const dispatch = useDispatch();
  const { loading, error, quiz } = useSelector((state) => state.getSingleQuiz);
  const { success } = useSelector((state) => state.createSubmit);
  const { enrollmentId, moduleId, chapterId, quizId } = useParams();
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(0);
  const [result, setResult] = useState(null);
  const [incorrectAnswers, setIncorrectAnswers] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [retakeClicks, setRetakeClicks] = useState(0);
  const navigate = useNavigate();
  const userId = useSelector((state) => state.auth.user._id);

  const { enrollmentModule } = useSelector(
    (state) => state.getEnrollmentModule
  );

  const handleOptionChange = (event, index) => {
    const { value } = event.target;
    setAnswers({ ...answers, [index]: value });
  };

  const handleSubmit = async () => {
    try {
      let newScore = 0;
      const incorrect = [];
      quiz.quizId.content.forEach((question, index) => {
        if (answers[index] === question.answer) {
          newScore++;
        } else {
          incorrect.push(index);
        }
      });
      const newResult = checkResult(newScore);
      setScore(newScore);
      setIncorrectAnswers(incorrect);
      setSubmitted(true);

      const totalQuestions = quiz.quizId.content.length;
      const submissionData = {
        user: userId,
        chapter: enrollmentModule.chapter.find((c) => c._id === chapterId)
          ?.chapterId,
        quiz: enrollmentModule.chapter
          .find((c) => c._id === chapterId)
          ?.quizzes.find((q) => q._id === quizId)?.quizId,
        // score: newScore,
        score: `${newScore}/${totalQuestions}`,
        result: newResult,
      };

      if (newResult !== "Failed") {
        await dispatch(createSubmit(enrollmentId, submissionData));
      }
    } catch (error) {
      console.error("Error submitting quiz:", error);
    }
  };

  const checkResult = (score) => {
    const passThreshold = 0.7;
    const percentage = score / quiz.quizId.content.length;
    if (percentage >= passThreshold) {
      setResult("Passed");
      return "Passed";
    } else {
      setResult("Failed");
      return "Failed";
    }
  };

  useEffect(() => {
    setScore(0);
    setResult(null);
    setSubmitted(false);
  }, [quiz]);

  const handleRetake = () => {
    setRetakeClicks(retakeClicks + 1); // Increment retake clicks
    console.log("Retake Clicks:", retakeClicks); // Log the value of retakeClicks
    setAnswers({});
    setScore(0);
    setResult(null);
    setIncorrectAnswers([]);
    setSubmitted(false);
  };

  useEffect(() => {
    dispatch(getSingleQuiz(enrollmentId, moduleId, chapterId, quizId));
    dispatch(getEnrollmentModule(enrollmentId, moduleId))
      .then(() => {
        const storedStates =
          JSON.parse(localStorage.getItem("quizStates")) || {};
        const storedState =
          storedStates[`${enrollmentId}-${moduleId}-${chapterId}-${quizId}`];
        if (storedState) {
          setAnswers(storedState.answers);
          setScore(storedState.score);
          setResult(storedState.result);
          setIncorrectAnswers(storedState.incorrectAnswers);
          setSubmitted(storedState.submitted);
        }
      })
      .catch((error) => {
        console.error("Failed to fetch quiz:", error);
      });
  }, [dispatch, enrollmentId, moduleId, chapterId, quizId]);

  const handleMarkAsDone = () => {
    dispatch(markQuizAsDone(enrollmentId, moduleId, chapterId, quizId))
      .then(() => {
        toast.success("Lesson marked as done successfully!");
        dispatch(getSingleQuiz(enrollmentId, moduleId, chapterId, quizId));
        dispatch(getEnrollmentModule(enrollmentId, moduleId));
        const quizState = {
          answers,
          score,
          result,
          incorrectAnswers,
          submitted,
        };
        const existingQuizStates =
          JSON.parse(localStorage.getItem("quizStates")) || {};

        const updatedQuizStates = {
          ...existingQuizStates,
          [`${enrollmentId}-${moduleId}-${chapterId}-${quizId}`]: quizState,
        };

        localStorage.setItem("quizStates", JSON.stringify(updatedQuizStates));

        const currentChapterIndex = enrollmentModule.chapter.findIndex(
          (chapter) => chapter._id === chapterId
        );

        const nextChapter = enrollmentModule.chapter[currentChapterIndex + 1];
        if (nextChapter) {
          navigate(
            `/enrollment/${enrollmentId}/module/${moduleId}/chapter/${nextChapter._id}`
          );
        }
      })
      .catch((error) => {
        toast.error("Failed to mark lesson as done: " + error.message);
      });

    const retakeData = {
      user: userId,
      chapter: enrollmentModule.chapter.find((c) => c._id === chapterId)
        ?.chapterId,
      quiz: enrollmentModule.chapter
        .find((c) => c._id === chapterId)
        ?.quizzes.find((q) => q._id === quizId)?.quizId,
      retake: retakeClicks,
    };

    dispatch(createRetake(enrollmentId, retakeData));
  };

  return (
    <Fragment>
      <MetaData title={"Enrollment Quiz Details"} />
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
          <Grid item xs={12} lg={9}>
            <Paper
              elevation={3}
              sx={{ padding: "20px", marginTop: "20px", marginRight: "20px" }}
            >
              {quiz && (
                <div>
                  <Typography variant="h4" gutterBottom>
                    {quiz.quizId.title}
                  </Typography>
                  <Divider style={{ margin: "20px 0" }} />
                  {quiz.quizId.content.map((question, index) => (
                    <div key={index}>
                      <Typography
                        variant="body1"
                        sx={{
                          marginBottom: "8px",
                          color: submitted
                            ? incorrectAnswers.includes(index)
                              ? "red"
                              : answers[index] === question.answer
                              ? "green"
                              : "inherit"
                            : "inherit",
                        }}
                      >
                        {index + 1}. {question.questions}
                      </Typography>
                      <FormControl component="fieldset">
                        <RadioGroup
                          aria-label={`question-${index + 1}`}
                          name={`question-${index + 1}`}
                          value={answers[index] || ""}
                          onChange={(event) => handleOptionChange(event, index)}
                        >
                          {question.options.map((option, optionIndex) => (
                            <FormControlLabel
                              key={optionIndex}
                              value={option}
                              control={
                                <Radio
                                  disabled={
                                    result === "Passed" ||
                                    result === "Failed" ||
                                    (quiz && quiz.status === "Done")
                                  }
                                />
                              }
                              label={option}
                            />
                          ))}
                        </RadioGroup>
                      </FormControl>
                      <Divider style={{ margin: "20px 0" }} />
                    </div>
                  ))}

                  {quiz && quiz.status !== "Done" && (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleSubmit}
                      endIcon={<ArrowUpwardIcon />}
                      style={{ borderRadius: "20px" }}
                      disabled={
                        result === "Passed" ||
                        result === "Failed" ||
                        (quiz && quiz.status === "Done")
                      }
                    >
                      Submit
                    </Button>
                  )}

                  {result === "Failed" && (
                    <Button
                      variant="outlined"
                      color="primary"
                      endIcon={<RefreshIcon />}
                      style={{ marginLeft: "20px", borderRadius: "20px" }}
                      onClick={handleRetake}
                    >
                      Retake
                    </Button>
                  )}

                  {result === "Passed" && quiz && quiz.status !== "Done" && (
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={handleMarkAsDone}
                      style={{ marginLeft: "20px", borderRadius: "20px" }}
                    >
                      Mark As Done
                    </Button>
                  )}

                  {quiz && quiz.status === "Done" && (
                    <Button
                      variant="contained"
                      color="success"
                      style={{ marginLeft: "10px", borderRadius: "20px" }}
                      onClick={handleSubmit}
                      startIcon={<CheckOutlinedIcon />}
                      disabled
                    >
                      Done
                    </Button>
                  )}

                  <Typography variant="h6" sx={{ marginTop: "20px" }}>
                    Score: {score}/{quiz.quizId.content.length}
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{
                      marginTop: "20px",
                      color:
                        result === "Failed"
                          ? "red"
                          : result === "Passed"
                          ? "green"
                          : "",
                    }}
                  >
                    Result: {result}
                  </Typography>
                </div>
              )}
            </Paper>
          </Grid>
        </Grid>
      )}
    </Fragment>
  );
};
export default EnrollmentQuizDetails;
