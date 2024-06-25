import React, { Fragment, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MetaData from "../layout/MetaData";
import Sidebar from "./Sidebar";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import {
  getQuizDetails,
  updateQuiz,
  clearErrors,
} from "../../actions/quizActions";
import { UPDATE_QUIZ_RESET } from "../../constants/quizConstants";
import CachedOutlinedIcon from "@mui/icons-material/CachedOutlined";
import { TextField, Button, Typography, Grid, Paper } from "@mui/material";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import CloseIcon from "@mui/icons-material/Close";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";

const UpdateQuiz = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState([]);

  const dispatch = useDispatch();
  const { error, quiz } = useSelector((state) => state.quizDetails);
  const {
    loading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.quiz);
  const { id } = useParams();
  const navigate = useNavigate();

  const errMsg = (message = "") =>
    toast.error(message, {
      position: toast.POSITION.BOTTOM_CENTER,
    });

  const successMsg = (message = "") =>
    toast.success(message, {
      position: toast.POSITION.BOTTOM_CENTER,
    });

  useEffect(() => {
    if (quiz && quiz._id !== id) {
      dispatch(getQuizDetails(id));
    } else {
      setTitle(quiz.title);
      setContent(quiz.content);
    }
    if (error) {
      errMsg(error);
      dispatch(clearErrors());
    }
    if (updateError) {
      errMsg(updateError);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      navigate(-1);
      successMsg("Quiz updated successfully");
      dispatch({ type: UPDATE_QUIZ_RESET });
    }
  }, [dispatch, error, isUpdated, navigate, updateError, quiz, id]);

  const submitHandler = (e) => {
    e.preventDefault();

    // Ensure content is properly formatted as an array of objects
    const updatedContent = content.map((question) => ({
      questions: question.questions,
      options: question.options,
      answer: question.answer,
    }));

    const formData = new FormData();
    formData.set("title", title);
    formData.set("content", JSON.stringify(updatedContent));

    dispatch(updateQuiz(quiz._id, formData));
  };

  const handleInputChange = (index, e) => {
    const { name, value } = e.target;
    const updatedContent = [...content];
    updatedContent[index][name] = value;
    setContent(updatedContent);
  };

  const handleOptionChange = (questionIndex, optionIndex, e) => {
    const { value } = e.target;
    const updatedContent = [...content];
    updatedContent[questionIndex].options[optionIndex] = value;
    setContent(updatedContent);
  };

  const addQuestion = () => {
    setContent([
      ...content,
      { questions: "", options: ["", "", "", ""], answer: "" },
    ]);
  };

  const removeQuestion = (index) => {
    const updatedContent = [...content];
    updatedContent.splice(index, 1);
    setContent(updatedContent);
  };

  return (
    <Fragment>
      <MetaData title={"Update Quiz"} />
      <Grid container spacing={3} sx={{ height: "100vh" }}>
        <Grid item xs={12} md={2}>
          <Sidebar />
        </Grid>
        <Grid item xs={12} md={10}>
          <Paper
            elevation={3}
            sx={{ p: 3 }}
            style={{ marginTop: "40px", marginRight: "150px" }}
          >
            <Typography
              variant="h4"
              component="h1"
              gutterBottom
              sx={{ color: "black" }}
            >
              Update Quiz
            </Typography>
            <form onSubmit={submitHandler} encType="multipart/form-data">
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    id="title_field"
                    label="Title"
                    fullWidth
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </Grid>
                {content.map((question, index) => (
                  <Fragment key={index}>
                    <Grid item xs={12}>
                      <TextField
                        id={`questions_field_${index}`}
                        label={`Question ${index + 1}`}
                        fullWidth
                        value={question.questions}
                        onChange={(e) => handleInputChange(index, e)}
                        name="questions"
                      />
                    </Grid>
                    {question.options.map((option, optionIndex) => (
                      <Grid item xs={12} key={optionIndex}>
                        <TextField
                          id={`option_field_${index}_${optionIndex}`}
                          label={`Option ${optionIndex + 1}`}
                          fullWidth
                          value={option}
                          onChange={(e) =>
                            handleOptionChange(index, optionIndex, e)
                          }
                        />
                      </Grid>
                    ))}
                    <Grid item xs={12}>
                      <TextField
                        id={`answer_field_${index}`}
                        label={`Answer ${index + 1}`}
                        fullWidth
                        value={question.answer}
                        onChange={(e) => handleInputChange(index, e)}
                        name="answer"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={() => removeQuestion(index)}
                        startIcon={<CloseIcon />}
                      >
                        Remove Question
                      </Button>
                    </Grid>
                  </Fragment>
                ))}
                <Grid item xs={12}>
                  <Button
                    variant="outlined"
                    color="success"
                    onClick={addQuestion}
                    startIcon={<AddOutlinedIcon />}
                  >
                    Add Question
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="success"
                    disabled={loading}
                    fullWidth
                    startIcon={<CachedOutlinedIcon />}
                  >
                    {loading ? "Updating..." : "UPDATE"}
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default UpdateQuiz;
