import React, { Fragment, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { newCourse, clearErrors } from "../../actions/courseActions";
import { NEW_COURSE_RESET } from "../../constants/courseConstants";
import { toast } from "react-toastify";
import MetaData from "../layout/MetaData";
import Sidebar from "./Sidebar";
import { TextField, Button, Typography, Grid, Paper } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";

const NewCourse = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imagesPreview, setImagesPreview] = useState([]);
  const [images, setImages] = useState([]);

  const dispatch = useDispatch();
  let navigate = useNavigate();

  const { loading, error, success } = useSelector((state) => state.newCourse);

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
      message("Course created successfully");
      dispatch({ type: NEW_COURSE_RESET });
    }
  }, [dispatch, error, success, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set("title", title);
    formData.set("description", description);

    images.forEach((image) => {
      formData.append("images", image);
    });

    dispatch(newCourse(formData));
  };

  const onChange = (e) => {
    const files = Array.from(e.target.files);
    setImagesPreview([]);
    setImages([]);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((oldArray) => [...oldArray, reader.result]);
          setImages((oldArray) => [...oldArray, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  return (
    <Fragment>
      <MetaData title={"New Course"} />
      <Grid container spacing={3} >
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
              New Course
            </Typography>
            <form onSubmit={submitHandler} encType="multipart/form-data">
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
                <Grid item xs={12}>
                  <TextField
                    id="description_field"
                    label="Description"
                    fullWidth
                    multiline
                    required
                    rows={8}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <input
                    type="file"
                    name="images"
                    id="customFile"
                    style={{ display: "none" }}
                    multiple
                    onChange={onChange}
                  />
                  <label htmlFor="customFile">
                    <Button
                      variant="outlined"
                      component="span"
                      startIcon={<CloudUploadIcon />}
                    >
                      Choose Images
                    </Button>
                  </label>
                  {imagesPreview.map((img, index) => (
                    <img
                      key={index}
                      src={img}
                      alt="Images Preview"
                      style={{
                        marginTop: "10px",
                        marginRight: "10px",
                        width: "55px",
                        height: "52px",
                      }}
                    />
                  ))}
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

export default NewCourse;
