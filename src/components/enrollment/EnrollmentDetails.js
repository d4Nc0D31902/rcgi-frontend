import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import {
  getEnrollmentDetails,
  markModuleAsDone,
} from "../../actions/enrollmentActions";
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
import { Check } from "@mui/icons-material";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
    } catch (error) {
      console.error("Error marking module as done:", error);
      toast.error("Failed to mark module as done. Please try again.");
    }
  };

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
        <Grid container justifyContent="center">
          <Grid item xs={12} lg={8}>
            <Paper elevation={3} style={{ padding: "20px", marginTop: "20px" }}>
              <Typography variant="h5" gutterBottom>
                Employee Info
              </Typography>
              {user && (
                <div style={{ display: "flex", alignItems: "center" }}>
                  {user[0].avatar && (
                    <Avatar
                      alt={user[0].name}
                      src={user[0].avatar.url}
                      style={{ marginRight: "10px" }}
                    />
                  )}
                  <div>
                    <Typography variant="subtitle1" gutterBottom>
                      Name: {user[0].name}
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom>
                      Employee ID: {user[0].employee_id}
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom>
                      Company: {user[0].company}
                    </Typography>
                  </div>
                </div>
              )}
              <hr />
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                  padding: "10px",
                }}
              >
                {course && course[0] && (
                  <div>
                    {course[0].courseId.images.map((image, index) => (
                      <img
                        key={index}
                        src={image.url}
                        alt={`Course Image ${index + 1}`}
                        style={{
                          width: "100%",
                          maxHeight: "200px",
                          margin: "10px 0",
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>
              {course && course[0] && (
                <div>
                  <Typography
                    variant="h5"
                    gutterBottom
                    style={{ marginTop: "20px" }}
                  >
                    {course[0].courseId.title}
                  </Typography>
                  <Typography variant="subtitle1" gutterBottom>
                    {course[0].courseId.description}
                  </Typography>
                </div>
              )}
              <hr />
              <Typography variant="h5" gutterBottom>
                Modules
              </Typography>
              <Box
                display="flex"
                flexWrap="wrap"
                justifyContent="space-between"
              >
                {module &&
                  module.map((mod, index) => (
                    <Card
                      key={mod._id}
                      style={{
                        width: "40%",
                        marginBottom: "20px",
                        marginTop: "20px",
                        marginRight: "50px",
                        marginLeft: "50px",
                        border: "2px solid #ccc",
                        borderRadius: "5px",
                        padding: "10px",
                      }}
                    >
                      <CardMedia
                        component="img"
                        height="150"
                        image={mod.moduleId.images[0].url}
                        alt={mod.moduleId.title}
                      />
                      <CardContent>
                        <Typography variant="h6" gutterBottom>
                          {mod.moduleId.title}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          {showFullDescription[mod._id]
                            ? mod.moduleId.description
                            : `${mod.moduleId.description.substring(
                                0,
                                350
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
                            style={{ marginTop: "20px", borderRadius: "20px" }}
                            disabled={
                              index === 0
                                ? false
                                : module[index - 1].status !== "Done"
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
                            marginTop: "20px",
                            height: "40px",
                            width: "50%",
                            marginLeft: "85px",
                            borderRadius: "20px",
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
                              style={{ color: "white", borderRadius: "20px" }}
                            >
                              <CheckIcon />
                            </IconButton>
                          ) : (
                            "Mark As Done"
                          )}
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
              </Box>
            </Paper>
          </Grid>
        </Grid>
      )}
    </Fragment>
  );
};

export default EnrollmentDetails;
