import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSingleQuiz } from "../../actions/enrollmentActions";
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
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import RefreshIcon from "@mui/icons-material/Refresh";

const EnrollmentQuizDetails = () => {
  const dispatch = useDispatch();
  const { loading, error, quiz } = useSelector((state) => state.getSingleQuiz);

  const { enrollmentId, moduleId, chapterId, quizId } = useParams();

  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(0);
  const [result, setResult] = useState(null);
  const [incorrectAnswers, setIncorrectAnswers] = useState([]);
  const [submitted, setSubmitted] = useState(false); // State to track submission

  useEffect(() => {
    dispatch(getSingleQuiz(enrollmentId, moduleId, chapterId, quizId));
  }, [dispatch, enrollmentId, moduleId, chapterId, quizId]);

  useEffect(() => {
    const savedQuizState = localStorage.getItem("quizState");
    if (savedQuizState) {
      const parsedState = JSON.parse(savedQuizState);
      setAnswers(parsedState.answers);
      setScore(parsedState.score);
      setResult(parsedState.result);
      setIncorrectAnswers(parsedState.incorrectAnswers);
      setSubmitted(parsedState.submitted);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "quizState",
      JSON.stringify({
        answers,
        score,
        result,
        incorrectAnswers,
        submitted,
      })
    );
  }, [answers, score, result, incorrectAnswers, submitted]);

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
    setSubmitted(true); // Set submitted to true after submission
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

  const handleRetake = () => {
    setAnswers({});
    setScore(0);
    setResult(null);
    setIncorrectAnswers([]);
    setSubmitted(false);
    localStorage.removeItem("quizState"); // Remove saved state when retaking the quiz
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
                              control={<Radio disabled={submitted} />} // Disable radio button if submitted
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

                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={handleRetake}
                    endIcon={<RefreshIcon />}
                    style={{ display: result === "Failed" ? "block" : "none" }}
                  >
                    Retake
                  </Button>

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
