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
  getForumDetails,
  updateForum,
  clearErrors,
} from "../../actions/forumActions";
import { UPDATE_FORUM_RESET } from "../../constants/forumConstants";
import {
  TextField,
  Button,
  Typography,
  Grid,
  Paper,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";
import CachedOutlinedIcon from "@mui/icons-material/CachedOutlined";

const UpdateForum = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const dispatch = useDispatch();
  const { error, forum } = useSelector((state) => state.forumDetails);
  const {
    loading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.forum);
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
    if (forum && forum._id !== id) {
      dispatch(getForumDetails(id));
    } else {
      setTitle(forum.title);
      setBody(forum.body);
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
      successMsg("Forum updated successfully");
      dispatch({ type: UPDATE_FORUM_RESET });
    }
  }, [dispatch, error, isUpdated, navigate, updateError, forum, id]);

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set("title", title);
    formData.set("body", body);
    dispatch(updateForum(forum._id, formData));
    navigate(-1);
    successMsg("Chapter updated successfully");
  };

  return (
    <Fragment>
      <MetaData title={"Update Forum"} />
      <Grid container spacing={3}>
        <Grid item xs={12} md={2}>
          <Sidebar />
        </Grid>
        <Grid item xs={12} md={10}>
          <Paper
            elevation={3}
            sx={{ p: 3 }}
            style={{ marginTop: "40px", marginRight: "150px" }}
          >
            <Typography variant="h4" component="h1" gutterBottom>
              Update Forum
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
                    id="body_field"
                    theme="snow"
                    value={body}
                    onChange={(value) => setBody(value)}
                    modules={{
                      toolbar: [
                        [{ header: [1, 2, 3, 4, 5, false] }],
                        [{ size: [] }],
                        ["bold", "italic", "underline", "strike", "blockquote"],
                        [
                          { list: "ordered" },
                          { list: "bullet" },
                          { indent: "-1" },
                          { indent: "+1" },
                        ],
                        ["link", "image", "video"],
                        [{ script: "sub" }, { script: "super" }],
                        [{ color: [] }, { background: [] }],
                        [{ align: [] }],
                        ["code-block"],
                        ["formula"],
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
                      "script",
                      "color",
                      "background",
                      "align",
                      "code-block",
                      "formula",
                    ]}
                    placeholder="Enter body here"
                  />
                </Grid>

                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="success"
                    disabled={loading}
                    startIcon={<CachedOutlinedIcon />}
                    fullWidth
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

export default UpdateForum;
