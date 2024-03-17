import React, { Fragment, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  updateCourse,
  getCourseDetails,
  clearErrors,
} from "../../actions/courseActions";
import { UPDATE_COURSE_RESET } from "../../constants/courseConstants";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MetaData from "../layout/MetaData";
import Sidebar from "./Sidebar";
import { TextField, Button, Typography, Grid, Paper } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CachedOutlinedIcon from "@mui/icons-material/CachedOutlined";

const UpdateCourse = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [oldImages, setOldImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const dispatch = useDispatch();
  const { error, course } = useSelector((state) => state.courseDetails);
  const {
    loading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.course);
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
    if (course && course._id !== id) {
      dispatch(getCourseDetails(id));
    } else {
      setTitle(course.title);
      setDescription(course.description);
      setOldImages(course.images);
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
      successMsg("Course updated successfully");
      dispatch({ type: UPDATE_COURSE_RESET });
    }
  }, [dispatch, error, isUpdated, navigate, updateError, course, id]);

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set("title", title);
    formData.set("description", description);
    images.forEach((image) => {
      formData.append("images", image);
    });
    dispatch(updateCourse(course._id, formData));
  };

  const onChange = (e) => {
    const files = Array.from(e.target.files);
    setImagesPreview([]);
    setImages([]);
    setOldImages([]);
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
      <MetaData title={"Update Course"} />
      <Grid container spacing={3}>
        <Grid item xs={12} md={2}>
          <Sidebar />
        </Grid>
        <Grid item xs={12} md={10}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h4" component="h1" gutterBottom>
              Update Course
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
                  <TextField
                    id="description_field"
                    label="Description"
                    fullWidth
                    multiline
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
                  {oldImages &&
                    oldImages.map((img) => (
                      <img
                        key={img.url}
                        src={img.url}
                        alt={img.url}
                        style={{
                          marginTop: "10px",
                          marginRight: "10px",
                          width: "55px",
                          height: "52px",
                        }}
                      />
                    ))}
                  {imagesPreview.map((img) => (
                    <img
                      src={img}
                      key={img}
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
                    fullWidth
                    disabled={loading}
                    startIcon={<CachedOutlinedIcon />}
                  >
                    {loading ? "Updating..." : "Update"}
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

export default UpdateCourse;
