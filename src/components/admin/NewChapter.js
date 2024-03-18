import React, { Fragment, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MetaData from "../layout/MetaData";
import Sidebar from "./Sidebar";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
  getModuleDetails,
  addChapter,
  clearErrors,
} from "../../actions/moduleActions";
import { TextField, Button, Typography, Grid, Paper } from "@mui/material";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";

const AddChapter = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { moduleId } = useParams();

  const { loading, error, success } = useSelector((state) => state.chapter);

  const message = (message = "") =>
    toast.success(message, {
      position: toast.POSITION.BOTTOM_CENTER,
    });

  useEffect(() => {
    if (error) {
      dispatch(clearErrors());
    }

    if (success) {
      navigate("/admin/modules");
      message("Chapter created successfully");
    }
  }, [dispatch, error, success, navigate]);

  useEffect(() => {
    dispatch(getModuleDetails(moduleId));
  }, [dispatch, moduleId]);

  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set("title", title);
    formData.set("description", description);
    formData.set("moduleId", moduleId);

    try {
      await dispatch(addChapter(moduleId, formData));
      toast.success("Chapter added successfully!");
      navigate(`/admin/courses`);
    } catch (error) {
      console.error("Error adding chapter:", error);
      toast.error(
        "An error occurred while adding chapter. Please try again later."
      );
    }
  };

  return (
    <Fragment>
      <MetaData title={"New Chapter"} />
      <Grid container spacing={3}>
        <Grid item xs={12} md={2}>
          <Sidebar />
        </Grid>
        <Grid item xs={12} md={10}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h4" component="h1" gutterBottom>
              New Chapter
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
                    id="description_field"
                    theme="snow" 
                    value={description}
                    onChange={(value) => setDescription(value)}
                    modules={{
                      toolbar: [
                        [{ header: [1, 2, 3, 4, 5, false] }],
                        ["bold", "italic", "underline", "strike"],
                        [{ list: "ordered" }, { list: "bullet" }],
                        ["link", "image"],
                        ["clean"],
                      ],
                    }}
                    formats={[
                      "header",
                      "bold",
                      "italic",
                      "underline",
                      "strike",
                      "list",
                      "bullet",
                      "link",
                      "image",
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

export default AddChapter;
