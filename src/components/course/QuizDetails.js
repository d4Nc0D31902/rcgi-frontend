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
} from "@mui/material";

const QuizDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { loading, error, quiz } = useSelector((state) => state.quizDetails);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [totalScores, setTotalScores] = useState(0); // State variable to hold the total scores

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
    event.preventDefault(); // Prevent default form submission

    let totalScores = 0;
    quiz.content.forEach((question, index) => {
      if (selectedAnswers[index] === question.answer) {
        totalScores++;
      }
    });
    setTotalScores(totalScores);
  };

  if (loading) return <Loader />;
  if (error) return <h2>{error}</h2>;

  return (
    <Fragment>
      <MetaData title={quiz.title} />
      <div className="row">
        <div className="col-12 col-lg-8 mt-5">
          <Typography variant="h4" component="h1" gutterBottom>
            {quiz.title}
          </Typography>
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
                </div>
              ))}
            <Button type="submit" variant="contained" color="primary">
              Submit Quiz
            </Button>
          </form>
          {/* Display total scores after submission */}
          {totalScores !== 0 && (
            <Typography variant="h6" component="h2" gutterBottom>
              Total Scores: {totalScores}
            </Typography>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default QuizDetails;
