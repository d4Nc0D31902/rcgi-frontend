import React, { Fragment, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MetaData from "../layout/MetaData";
import Sidebar from "./Sidebar";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // or another theme
import {
  getChapterDetails,
  addLesson,
  clearErrors,
} from "../../actions/chapterActions";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import { TextField, Button, Typography, Grid, Paper } from "@mui/material";

const AddLesson = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { chapterId } = useParams();

  const { loading, error, success } = useSelector((state) => state.addLesson);

  const message = (message = "") =>
    toast.success(message, {
      position: toast.POSITION.BOTTOM_CENTER,
    });

  useEffect(() => {
    if (error) {
      dispatch(clearErrors());
    }

    if (success) {
      navigate("/admin/courses");
      message("Lesson created successfully");
    }
  }, [dispatch, error, success, navigate]);

  useEffect(() => {
    dispatch(getChapterDetails(chapterId));
  }, [dispatch, chapterId]);

  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set("title", title);
    formData.set("content", content);
    formData.set("chapterId", chapterId);

    await dispatch(addLesson(chapterId, formData));

    if (!error && success) {
      message("Lesson created successfully");
      navigate(`/admin/courses`);
    }
  };

  return (
    <Fragment>
      <MetaData title={"New Lesson"} />
      <Grid container spacing={3}>
        <Grid item xs={12} md={2}>
          <Sidebar />
        </Grid>
        <Grid item xs={12} md={10}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h4" component="h1" gutterBottom>
              New Lesson
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
                    startIcon={<SaveOutlinedIcon />}
                  >
                    SAVE
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

export default AddLesson;
