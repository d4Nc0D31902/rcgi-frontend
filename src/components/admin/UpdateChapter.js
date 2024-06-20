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
  getChapterDetails,
  updateChapter,
  clearErrors,
} from "../../actions/chapterActions";
import { UPDATE_CHAPTER_RESET } from "../../constants/chapterConstants";
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

const UpdateChapter = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [company, setCompany] = useState("");

  const dispatch = useDispatch();
  const { error, chapter } = useSelector((state) => state.chapterDetails);
  const {
    loading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.chapter);
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
    if (chapter && chapter._id !== id) {
      dispatch(getChapterDetails(id));
    } else {
      setTitle(chapter.title);
      setDescription(chapter.description);
      setCompany(chapter.company);
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
      successMsg("Chapter updated successfully");
      dispatch({ type: UPDATE_CHAPTER_RESET });
    }
  }, [dispatch, error, isUpdated, navigate, updateError, chapter, id]);

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set("title", title);
    formData.set("description", description);
    formData.set("company", company);
    dispatch(updateChapter(chapter._id, formData));
  };

  return (
    <Fragment>
      <MetaData title={"Update Chapter"} />
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
              Update Chapter
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
                  <FormControl fullWidth>
                    <InputLabel id="company-label">Company</InputLabel>
                    <Select
                      labelId="company-label"
                      id="company_field"
                      value={company}
                      label="Company"
                      onChange={(e) => setCompany(e.target.value)}
                    >
                      <MenuItem value={"None"}>All Companies</MenuItem>
                      <MenuItem value={"Barcino"}>Barcino</MenuItem>
                      <MenuItem value={"Single Origin"}>Single Origin</MenuItem>
                      <MenuItem value={"Bluesmith"}>Bluesmith</MenuItem>
                      <MenuItem value={"Meat Depot"}>Meat Depot</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <ReactQuill
                    id="description_field"
                    theme="snow"
                    value={description}
                    onChange={(value) => setDescription(value)}
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
                    placeholder="Enter description here"
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

export default UpdateChapter;
