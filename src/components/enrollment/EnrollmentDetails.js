import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import {
  getEnrollmentDetails,
  markModuleAsDone,
  checkProgress,
} from "../../actions/enrollmentActions";
import { getNotifications } from "../../actions/notificationActions";
import {
  CircularProgress,
  Typography,
  Grid,
  Paper,
  Card,
  CardContent,
  CardMedia,
  Box,
  Button,
  Avatar,
  IconButton,
} from "@mui/material";
import MetaData from "../layout/MetaData";
import CheckIcon from "@mui/icons-material/Check";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ModuleModal from "./ModuleModal";

const EnrollmentDetails = () => {
  const dispatch = useDispatch();
  const { loading, error, enrollment } = useSelector(
    (state) => state.enrollmentDetails
  );
  const { user, course, module } = enrollment;
  const { id } = useParams();

  useEffect(() => {
    dispatch(getEnrollmentDetails(id));
  }, [dispatch, id]);

  const [showFullDescription, setShowFullDescription] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const toggleDescription = (moduleId) => {
    setShowFullDescription((prevState) => ({
      ...prevState,
      [moduleId]: !prevState[moduleId],
    }));
  };

  const findModuleWithAllDone = () => {
    if (module) {
      return module.find((mod) => {
        return mod.chapter.every(
          (chapter) =>
            chapter.lessons.every((lesson) => lesson.status === "Done") &&
            chapter.quizzes.every((quiz) => quiz.status === "Done")
        );
      });
    }
    return undefined;
  };

  const doneModule = findModuleWithAllDone();

  const handleMarkModuleAsDone = async (enrollmentId, moduleId) => {
    try {
      await dispatch(markModuleAsDone(enrollmentId, moduleId));
      toast.success("Module marked as done successfully!");
      dispatch(getEnrollmentDetails(id));
      dispatch(checkProgress(id));
      dispatch(getNotifications());
      setOpenModal(true);
    } catch (error) {
      console.error("Error marking module as done:", error);
      toast.error("Failed to mark module as done. Please try again.");
    }
  };

  useEffect(() => {
    dispatch(getNotifications());
  }, [dispatch]);

  return (
    <Fragment>
      <MetaData title={"Enrollment Details"} />
      {loading ? (
        <CircularProgress style={{ margin: "auto" }} />
      ) : error ? (
        <Typography variant="h6" color="error" align="center">
          {error}
        </Typography>
      ) : (
        <Grid container justifyContent="center" spacing={3}>
          <Grid item xs={12} md={10} lg={8}>
            <Paper elevation={3} style={{ padding: "20px", marginTop: "20px" }}>
              <Typography variant="h5" gutterBottom>
                Employee Info
              </Typography>
              {user && (
                <Grid container alignItems="center" spacing={2}>
                  <Grid item>
                    {user[0].avatar && (
                      <Avatar alt={user[0].name} src={user[0].avatar.url} />
                    )}
                  </Grid>
                  <Grid item>
                    <Typography variant="subtitle1" gutterBottom>
                      Name: {user[0].name}
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom>
                      Employee ID: {user[0].employee_id}
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom>
                      Company: {user[0].company}
                    </Typography>
                  </Grid>
                </Grid>
              )}
              <hr />
              <Grid container justifyContent="left">
                {course && course[0] && (
                  <Grid item xs={12} sm={20}>
                    <Typography
                      variant="h5"
                      gutterBottom
                      style={{ marginTop: "5px" }}
                    >
                      {course[0].courseId.title}
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom>
                      {course[0].courseId.description}
                    </Typography>
                  </Grid>
                )}
              </Grid>
              <hr />
              <Typography variant="h5" gutterBottom>
                Modules
              </Typography>
              <Grid container spacing={3}>
                {module &&
                  module.map((mod, index) => (
                    <Grid item xs={12} sm={6} md={4} key={mod._id}>
                      <Card
                        style={{
                          height: "100%",
                          width: "100%",
                          border: "2px solid #ccc",
                          borderRadius: "5px",
                          marginBottom: "20px",
                          padding: "10px",
                        }}
                      >
                        <CardMedia
                          component="img"
                          height="150"
                          image={mod.moduleId.images[0].url}
                          alt={mod.moduleId.title}
                        />
                        {/* <CardContent>
                          <Typography variant="h6" gutterBottom>
                            {mod.moduleId.title}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="textSecondary"
                            sx={{ mb: 2 }}
                          >
                            {showFullDescription[mod._id]
                              ? mod.moduleId.description
                              : `${mod.moduleId.description.substring(
                                  0,
                                  100
                                )}...`}
                            <Button
                              onClick={() => toggleDescription(mod._id)}
                              color="primary"
                              size="small"
                            >
                              {showFullDescription[mod._id]
                                ? "See Less"
                                : "See More"}
                            </Button>
                          </Typography>
                          <Link
                            to={`/enrollment/${id}/module/${mod._id}`}
                            style={{ textDecoration: "none" }}
                          >
                            <Button
                              variant="outlined"
                              color="primary"
                              fullWidth
                              style={{ borderRadius: "20px" }}
                            >
                              View
                            </Button>
                          </Link>
                          <Button
                            variant="contained"
                            color="success"
                            fullWidth
                            style={{
                              marginTop: "10px",
                              borderRadius: "20px",
                            }}
                            disabled={
                              !(
                                mod.chapter.length > 0 &&
                                mod.chapter.every(
                                  (chapter) => chapter.status === "Done"
                                ) &&
                                mod.chapter.every(
                                  (chapter) =>
                                    chapter.lessons.every(
                                      (lesson) => lesson.status === "Done"
                                    ) &&
                                    chapter.quizzes.every(
                                      (quiz) => quiz.status === "Done"
                                    )
                                )
                              )
                            }
                            onClick={() => handleMarkModuleAsDone(id, mod._id)}
                          >
                            {mod.status === "Done" ? (
                              <CheckIcon />
                            ) : (
                              "Mark As Done"
                            )}
                          </Button>
                        </CardContent> */}
                        <CardContent style={{ height: "100%" }}>
                          <Typography variant="h6" gutterBottom>
                            {mod.moduleId.title}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="textSecondary"
                            sx={{ mb: 2 }}
                          >
                            {showFullDescription[mod._id]
                              ? mod.moduleId.description
                              : `${mod.moduleId.description.substring(
                                  0,
                                  100
                                )}...`}
                            <Button
                              onClick={() => toggleDescription(mod._id)}
                              color="primary"
                              size="small"
                              style={{ height: "fit-content" }}
                            >
                              {showFullDescription[mod._id]
                                ? "See Less"
                                : "See More"}
                            </Button>
                          </Typography>
                          <Link
                            to={`/enrollment/${id}/module/${mod._id}`}
                            style={{ textDecoration: "none" }}
                          >
                            <Button
                              variant="outlined"
                              color="primary"
                              fullWidth
                              style={{
                                borderRadius: "20px",
                                height: "fit-content",
                              }}
                              disabled={
                                index !== 0 &&
                                module[index - 1].status !== "Done"
                              }
                            >
                              View
                            </Button>
                          </Link>
                          <Button
                            variant="contained"
                            color="success"
                            fullWidth
                            style={{
                              marginTop: "10px",
                              borderRadius: "20px",
                              height: "fit-content",
                            }}
                            disabled={
                              (module.findIndex((m) => m === mod) > 0 &&
                                module[module.findIndex((m) => m === mod) - 1]
                                  .status !== "Done") ||
                              (mod.chapter.length > 0 &&
                                (!mod.chapter.every(
                                  (chapter) => chapter.status === "Done"
                                ) ||
                                  !mod.chapter.every(
                                    (chapter) =>
                                      chapter.lessons.every(
                                        (lesson) => lesson.status === "Done"
                                      ) &&
                                      chapter.quizzes.every(
                                        (quiz) => quiz.status === "Done"
                                      )
                                  )))
                            }
                            onClick={() => handleMarkModuleAsDone(id, mod._id)}
                          >
                            {mod.status === "Done" ? (
                              <IconButton
                                aria-label="check"
                                style={{
                                  color: "white",
                                  borderRadius: "20px",
                                  height: "25px",
                                }}
                              >
                                <CheckIcon />
                              </IconButton>
                            ) : (
                              "Mark As Done"
                            )}
                          </Button>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      )}
      <ModuleModal open={openModal} handleClose={() => setOpenModal(false)} />
    </Fragment>
  );
};

export default EnrollmentDetails;
