import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { getEnrollmentDetails } from "../../actions/enrollmentActions";
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
} from "@mui/material";
import MetaData from "../layout/MetaData";

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
              {/* <Typography variant="h5" gutterBottom>
                User Info
              </Typography>
              {user && (
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
              )} */}
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
              {/* Banner */}
              {/* <div style={{ display: "flex", justifyContent: "center" }}>
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
              </div> */}
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
              {/* End Banner */}
              {/* <Typography variant="h5" gutterBottom>
                Course Info
              </Typography> */}
              {course && course[0] && (
                <div>
                  <Typography variant="h5" gutterBottom>
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
                      style={{ width: "30%", marginBottom: "20px" }}
                    >
                      <CardMedia
                        component="img"
                        height="140"
                        image={mod.moduleId.images[0].url}
                        alt={mod.moduleId.title}
                      />
                      <CardContent>
                        <Typography variant="h6" gutterBottom>
                          {mod.moduleId.title}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          {mod.moduleId.description}
                        </Typography>
                        <Link
                          to={`/enrollment/${id}/module/${mod._id}`}
                          style={{ textDecoration: "none" }}
                        >
                          <Button
                            variant="outlined"
                            color="primary"
                            fullWidth
                            style={{ marginTop: "20px" }}
                            disabled={
                              index === 0
                                ? false
                                : module[index - 1].status !== "Done"
                            }
                          >
                            View
                          </Button>
                        </Link>
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
