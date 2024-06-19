import React, { Fragment, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addForum, clearErrors } from "../../actions/moduleActions";
import { NEW_FORUM_RESET } from "../../constants/moduleConstants";
import { toast } from "react-toastify";
import MetaData from "../layout/MetaData";
import { TextField, Button, Typography, Grid, Paper } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import SendIcon from "@mui/icons-material/Send";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const NewForum = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const dispatch = useDispatch();
  let navigate = useNavigate();
  const { moduleId } = useParams();

  const { loading, error, success } = useSelector((state) => state.newForum);

  const message = (message = "") =>
    toast.success(message, {
      position: toast.POSITION.BOTTOM_CENTER,
    });

  useEffect(() => {
    if (error) {
      dispatch(clearErrors());
    }

    if (success) {
      navigate(-1);
      message("Forum post submitted successfully");
      dispatch({ type: NEW_FORUM_RESET });
    }
  }, [dispatch, error, success, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();

    const forumData = {
      title,
      body,
    };

    dispatch(addForum(moduleId, forumData));
  };

  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ script: "sub" }, { script: "super" }],
      [{ indent: "-1" }, { indent: "+1" }],
      [{ direction: "rtl" }],
      ["link", "image", "video"],
      [{ color: [] }, { background: [] }],
      [{ align: [] }],
      ["clean"],
    ],
  };

  const formats = [
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
    "color",
    "background",
    "align",
    "direction",
    "script",
  ];

  return (
    <Fragment>
      <MetaData title={"New Forum Post"} />
      <Grid container spacing={3} sx={{ height: "100vh", padding: "50px" }}>
        <Grid item xs={12} display="flex" justifyContent="center">
          <Paper elevation={3} sx={{ p: 3, width: "100%", height: "100%" }}>
            <Typography
              variant="h4"
              component="h1"
              gutterBottom
              textAlign="center"
            >
              Create Forum Post
            </Typography>
            <form onSubmit={submitHandler}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    id="title_field"
                    label="Title"
                    fullWidth
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sx={{ height: "300px", overflow: "auto" }}>
                  <div className="quill-editor-container">
                    <ReactQuill
                      value={body}
                      onChange={setBody}
                      theme="snow"
                      modules={modules}
                      formats={formats}
                      required
                    />
                  </div>
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="success"
                    disabled={loading}
                    endIcon={<SendIcon />}
                  >
                    {loading ? "Posting..." : "Post"}
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

export default NewForum;
