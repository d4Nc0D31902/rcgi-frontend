import React, { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getQuizDetails, clearErrors } from "../../actions/quizActions";
import Loader from "../layout/Loader";
import MetaData from "../layout/MetaData";
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
  Button,
  Grid,
  Paper,
  Divider,
} from "@mui/material";

const QuizDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { loading, error, quiz } = useSelector((state) => state.quizDetails);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const totalQuestions = quiz.content ? quiz.content.length : 0;
  const totalScores = Object.values(selectedAnswers).filter(
    (answer, index) => answer === quiz.content[index].answer
  ).length;

  useEffect(() => {
    dispatch(getQuizDetails(id));
    return () => {
      dispatch(clearErrors());
    };
  }, [dispatch, id]);

  const handleChange = (questionIndex, e) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionIndex]: e.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
  };

  if (loading) return <Loader />;
  if (error) return <h2>{error}</h2>;

  return (
    <Fragment>
      <MetaData title={quiz.title} />
      <Grid container justifyContent="center">
        <Grid item xs={12} lg={8} mt={5}>
          <Paper elevation={3} style={{ padding: "20px" }}>
            <Typography variant="h4" component="h1" gutterBottom>
              {quiz.title}
            </Typography>
            <Divider style={{ margin: "20px 0" }} />

            <form onSubmit={handleSubmit}>
              {quiz.content &&
                quiz.content.map((question, index) => (
                  <div key={index}>
                    <Typography variant="h6" component="h2" gutterBottom>
                      {index + 1}. {question.questions}
                    </Typography>
                    <FormControl component="fieldset">
                      <RadioGroup
                        name={`question_${index}`}
                        value={selectedAnswers[index] || ""}
                        onChange={(e) => handleChange(index, e)}
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
                    <Divider style={{ margin: "20px 0" }} />
                  </div>
                ))}
              <Button type="submit" variant="contained" color="primary">
                Submit Quiz
              </Button>
            </form>
            {submitted && (
              <Typography variant="h6" component="h2" gutterBottom>
                Total Scores: {totalScores}/{totalQuestions}
              </Typography>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default QuizDetails;
