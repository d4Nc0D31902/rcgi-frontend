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
} from "@mui/material";
import MetaData from "../layout/MetaData";

const EnrollmentQuizDetails = () => {
  const dispatch = useDispatch();
  const { loading, error, quiz } = useSelector((state) => state.getSingleQuiz);

  const { enrollmentId, moduleId, chapterId, quizId } = useParams();

  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(0);
  const [result, setResult] = useState(null);

  useEffect(() => {
    dispatch(getSingleQuiz(enrollmentId, moduleId, chapterId, quizId));
  }, [dispatch, enrollmentId, moduleId, chapterId, quizId]);

  const handleOptionChange = (event, index) => {
    const { value } = event.target;
    setAnswers({ ...answers, [index]: value });
  };

  const handleSubmit = () => {
    let newScore = 0;
    quiz.quizId.content.forEach((question, index) => {
      if (answers[index] === question.answer) {
        newScore++;
      }
    });
    setScore(newScore);
    checkResult(newScore);
  };

  const checkResult = (score) => {
    const passThreshold = 0.7; // Threshold for passing (70%)
    const percentage = score / quiz.quizId.content.length;
    if (percentage >= passThreshold) {
      setResult("Passed");
    } else {
      setResult("Failed");
    }
  };

  return (
    <Fragment>
      <MetaData title={"Enrollment Quiz Details"} />
      {loading ? (
        <CircularProgress sx={{ display: "block", margin: "auto" }} />
      ) : error ? (
        <Typography variant="h6" color="error" align="center">
          {error}
        </Typography>
      ) : (
        <Grid container justifyContent="center">
          <Grid item xs={12} lg={8}>
            <Paper elevation={3} sx={{ padding: "20px" }}>
              <Typography variant="h4" gutterBottom>
                Quiz Info
              </Typography>
              <Typography variant="h5" gutterBottom>
                Quiz Details
              </Typography>
              {quiz && (
                <div>
                  <Typography variant="subtitle1" gutterBottom>
                    Title: {quiz.quizId.title}
                  </Typography>
                  {quiz.quizId.content.map((question, index) => (
                    <div key={index}>
                      <Typography variant="body1" sx={{ marginBottom: "8px" }}>
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
                              control={<Radio />}
                              label={option}
                            />
                          ))}
                        </RadioGroup>
                      </FormControl>
                    </div>
                  ))}
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                  >
                    Submit
                  </Button>
                  <Typography variant="h6" sx={{ marginTop: "20px" }}>
                    Score: {score}/{quiz.quizId.content.length}
                  </Typography>
                  {result && (
                    <Typography variant="h6" sx={{ marginTop: "20px" }}>
                      Result: {result}
                    </Typography>
                  )}
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
