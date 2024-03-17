import React, { Fragment, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MetaData from "../layout/MetaData";
import Sidebar from "./Sidebar";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
  getLessonDetails,
  updateLesson,
  clearErrors,
} from "../../actions/lessonActions";
import { UPDATE_LESSON_RESET } from "../../constants/lessonConstants";
import CachedOutlinedIcon from "@mui/icons-material/CachedOutlined";
import { TextField, Button, Typography, Grid, Paper } from "@mui/material";

const UpdateLesson = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const dispatch = useDispatch();
  const { error, lesson } = useSelector((state) => state.lessonDetails);
  const {
    loading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.lesson);
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
    if (lesson && lesson._id !== id) {
      dispatch(getLessonDetails(id));
    } else {
      setTitle(lesson.title);
      setContent(lesson.content);
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
      navigate("/admin/courses");
      successMsg("Lesson updated successfully");
      dispatch({ type: UPDATE_LESSON_RESET });
    }
  }, [dispatch, error, isUpdated, navigate, updateError, lesson, id]);

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set("title", title);
    formData.set("content", content);
    dispatch(updateLesson(lesson._id, formData));
  };

  return (
    <Fragment>
      <MetaData title={"Update Lesson"} />
      <Grid container spacing={3}>
        <Grid item xs={12} md={2}>
          <Sidebar />
        </Grid>
        <Grid item xs={12} md={10}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h4" component="h1" gutterBottom>
              Update Lesson
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
                <Grid item xs={12}>
                  <ReactQuill
                    id="content_field"
                    theme="snow" // You can choose a theme
                    value={content}
                    onChange={(value) => setContent(value)}
                    modules={{
                      toolbar: [
                        [{ header: "1" }, { header: "2" }, { font: [] }],
                        [{ size: [] }],
                        ["bold", "italic", "underline", "strike", "blockquote"],
                        [
                          { list: "ordered" },
                          { list: "bullet" },
                          { indent: "-1" },
                          { indent: "+1" },
                        ],
                        ["link", "image", "video"],
                        ["clean"],
                      ],
                      clipboard: {
                        matchVisual: false,
                      },
                    }}
                    formats={[
                      "header",
                      "font",
                      "size",
                      "bold",
                      "italic",
                      "underline",
                      "strike",
                      "blockquote",
                      "list",
                      "bullet",
                      "indent",
                      "link",
                      "image",
                      "video",
                    ]}
                    placeholder="Enter content here"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="success"
                    className="btn btn-block py-3"
                    disabled={loading ? true : false}
                    fullWidth
                    startIcon={<CachedOutlinedIcon />}
                  >
                    UPDATE
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

export default UpdateLesson;
