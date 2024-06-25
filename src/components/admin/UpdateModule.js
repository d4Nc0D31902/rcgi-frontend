import React, { Fragment, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MetaData from "../layout/MetaData";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import {
  updateModule,
  getModuleDetails,
  clearErrors,
} from "../../actions/moduleActions";
import { UPDATE_MODULE_RESET } from "../../constants/moduleConstants";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TextField, Button, Typography, Grid, Paper } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CachedOutlinedIcon from "@mui/icons-material/CachedOutlined";

const UpdateModule = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [oldImages, setOldImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const dispatch = useDispatch();
  const { error, module } = useSelector((state) => state.moduleDetails);
  const {
    loading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.module);
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

  // useEffect(() => {
  //   if (module && module._id !== id) {
  //     dispatch(getModuleDetails(id));
  //   } else {
  //     setTitle(module.title);
  //     setDescription(module.description);
  //     setOldImages(module.images);
  //   }
  //   if (error) {
  //     errMsg(error);
  //     dispatch(clearErrors());
  //   }
  //   if (updateError) {
  //     errMsg(updateError);
  //     dispatch(clearErrors());
  //   }
  //   if (isUpdated) {
  //     successMsg("Module updated successfully");
  //     dispatch({ type: UPDATE_MODULE_RESET });
  //   }
  // }, [dispatch, error, isUpdated, navigate, updateError, module, id]);

  useEffect(() => {
    if (module && module._id !== id) {
      dispatch(getModuleDetails(id));
    } else {
      setTitle(module.title);
      setDescription(module.description);
      setOldImages(module.images);
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
      successMsg("Module updated successfully");
      dispatch({ type: UPDATE_MODULE_RESET });
      navigate(-1);
    }
  }, [dispatch, error, isUpdated, navigate, updateError, module, id]);

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set("title", title);
    formData.set("description", description);
    images.forEach((image) => {
      formData.append("images", image);
    });
    dispatch(updateModule(module._id, formData));
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
      <MetaData title={"Update Module"} />
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
              Update Module
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
                    disabled={loading}
                    fullWidth
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

export default UpdateModule;
