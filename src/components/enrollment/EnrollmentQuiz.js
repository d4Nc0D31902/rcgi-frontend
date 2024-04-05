import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSingleQuiz, markQuizAsDone } from "../../actions/enrollmentActions";
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
} from "@mui/material";
import MetaData from "../layout/MetaData";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
const EnrollmentQuizDetails = () => {
  const dispatch = useDispatch();
  const { loading, error, quiz } = useSelector((state) => state.getSingleQuiz);
  const { enrollmentId, moduleId, chapterId, quizId } = useParams();
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(0);
  const [result, setResult] = useState(null);
  const [incorrectAnswers, setIncorrectAnswers] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    dispatch(getSingleQuiz(enrollmentId, moduleId, chapterId, quizId));
  }, [dispatch, enrollmentId, moduleId, chapterId, quizId]);
  const handleOptionChange = (event, index) => {
    const { value } = event.target;
    setAnswers({ ...answers, [index]: value });
  };
  const handleSubmit = () => {
    let newScore = 0;
    const incorrect = [];
    quiz.quizId.content.forEach((question, index) => {
      if (answers[index] === question.answer) {
        newScore++;
      } else {
        incorrect.push(index);
      }
    });
    setScore(newScore);
    setIncorrectAnswers(incorrect);
    checkResult(newScore);
    setSubmitted(true);
  };

  const checkResult = (score) => {
    const passThreshold = 0.7;
    const percentage = score / quiz.quizId.content.length;
    if (percentage >= passThreshold) {
      setResult("Passed");
    } else {
      setResult("Failed");
    }
  };

  const handleMarkAsDone = () => {
    dispatch(markQuizAsDone(enrollmentId, moduleId, chapterId, quizId));
    toast.success("Quiz marked as done successfully!");
    dispatch(getSingleQuiz(enrollmentId, moduleId, chapterId, quizId));
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
          <Grid item xs={12} lg={8}>
            <Paper elevation={3} sx={{ padding: "20px", marginTop: "20px" }}>
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
                          color: incorrectAnswers.includes(index)
                            ? "red"
                            : answers[index] === question.answer
                            ? "green"
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
                              control={<Radio disabled={submitted} />}
                              label={option}
                            />
                          ))}
                        </RadioGroup>
                      </FormControl>
                      <Divider style={{ margin: "20px 0" }} />
                    </div>
                  ))}
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                    endIcon={<ArrowUpwardIcon />}
                  >
                    Submit
                  </Button>

                  {result === "Passed" && quiz && quiz.status !== "Done" && (
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={handleMarkAsDone}
                      style={{ marginLeft: "20px" }}
                    >
                      Mark As Done
                    </Button>
                  )}

                  {quiz && quiz.status === "Done" && (
                    <Button
                      variant="contained"
                      color="success"
                      style={{ marginLeft: "20px" }}
                      startIcon={<CheckOutlinedIcon />}
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
