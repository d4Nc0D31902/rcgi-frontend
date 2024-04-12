import React, { Fragment, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MetaData from "../layout/MetaData";
import Sidebar from "./Sidebar";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import {
  getChapterDetails,
  addQuiz,
  clearErrors,
} from "../../actions/chapterActions";
import { TextField, Button, Typography, Grid, Paper } from "@mui/material";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import CloseIcon from "@mui/icons-material/Close";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";

const AddQuiz = () => {
  const [quizData, setQuizData] = useState({
    title: "",
    content: [{ questions: "", options: ["", "", "", ""], answer: "" }],
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { chapterId } = useParams();

  const { loading, error, success } = useSelector((state) => state.addQuiz);

  const message = (message = "") =>
    toast.success(message, {
      position: toast.POSITION.BOTTOM_CENTER,
    });

  // useEffect(() => {
  //   if (error) {
  //     dispatch(clearErrors());
  //   }

  //   if (success) {
  //     navigate("/admin/courses");
  //     message("Quiz created successfully");
  //   }
  // }, [dispatch, error, success, navigate]);

  useEffect(() => {
    dispatch(getChapterDetails(chapterId));
  }, [dispatch, chapterId]);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await dispatch(addQuiz(chapterId, quizData));
      toast.success("Quiz added successfully!");
      navigate(-1);
    } catch (error) {
      console.error("Error adding quiz:", error);
      toast.error(
        "An error occurred while adding quiz. Please try again later."
      );
    }
  };

  const handleInputChange = (index, e) => {
    const { name, value } = e.target;
    const updatedContent = [...quizData.content];
    updatedContent[index][name] = value;
    setQuizData({ ...quizData, content: updatedContent });
  };

  const handleOptionChange = (questionIndex, optionIndex, e) => {
    const { value } = e.target;
    const updatedContent = [...quizData.content];
    updatedContent[questionIndex].options[optionIndex] = value;
    setQuizData({ ...quizData, content: updatedContent });
  };

  const addQuestion = () => {
    setQuizData({
      ...quizData,
      content: [
        ...quizData.content,
        { questions: "", options: ["", "", "", ""], answer: "" },
      ],
    });
  };

  const removeQuestion = (index) => {
    const updatedContent = [...quizData.content];
    updatedContent.splice(index, 1);
    setQuizData({ ...quizData, content: updatedContent });
  };

  return (
    <Fragment>
      <MetaData title={"New Quiz"} />
      <Grid container spacing={3}>
        <Grid item xs={12} md={2}>
          <Sidebar />
        </Grid>
        <Grid item xs={12} md={10}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h4" component="h1" gutterBottom>
              New Quiz
            </Typography>
            <form onSubmit={submitHandler} encType="multipart/form-data">
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    id="title_field"
                    label="Title"
                    fullWidth
                    value={quizData.title}
                    onChange={(e) =>
                      setQuizData({ ...quizData, title: e.target.value })
                    }
                  />
                </Grid>
                {quizData.content.map((question, index) => (
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
                    startIcon={<SaveOutlinedIcon />}
                  >
                    {loading ? "Saving..." : "Save"}
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

export default AddQuiz;
