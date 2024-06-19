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
import {
  TextField,
  Button,
  Typography,
  Grid,
  Paper,
  InputLabel,
  Select,
  FormControl,
  MenuItem,
} from "@mui/material";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";

const AddChapter = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [company, setCompany] = useState("");

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
    formData.set("company", company);
    formData.set("moduleId", moduleId);

    try {
      await dispatch(addChapter(moduleId, formData));
      toast.success("Chapter added successfully!");
      navigate(-1);
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
          <Paper
            elevation={3}
            sx={{ p: 3 }}
            style={{ marginTop: "40px", marginRight: "150px" }}
          >
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
                  <FormControl fullWidth>
                    <InputLabel id="company-label">Company</InputLabel>
                    <Select
                      labelId="company-label"
                      id="company_field"
                      value={company}
                      label="Company"
                      required
                      onChange={(e) => setCompany(e.target.value)}
                    >
                      <MenuItem value={"None"}>
                        <em>None</em>
                      </MenuItem>
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
                        ["bold", "italic", "underline", "strike"],
                        [{ list: "ordered" }, { list: "bullet" }],
                        ["link", "image"],
                        [{ align: [] }],
                        [{ script: "sub" }, { script: "super" }],
                        [{ indent: "-1" }, { indent: "+1" }],
                        [{ direction: "rtl" }],
                        [{ size: ["small", false, "large", "huge"] }],
                        [{ color: [] }, { background: [] }],
                        ["clean"],
                      ],
                      clipboard: {
                        matchVisual: false,
                      },
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
                      "align",
                      "script",
                      "indent",
                      "direction",
                      "size",
                      "color",
                      "background",
                      "clean",
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
