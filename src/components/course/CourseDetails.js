import React, { Fragment, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCourseDetails, clearErrors } from "../../actions/courseActions";
import {
  Box,
  Button,
  Grid,
  Typography,
  Paper,
  CircularProgress,
} from "@mui/material";
import MetaData from "../layout/MetaData";
import CourseModuleCard from "./CourseModuleCard";
import AddIcon from "@mui/icons-material/Add";
import ImportContactsIcon from "@mui/icons-material/ImportContacts";
import Loader from "../layout/Loader";

const CourseDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { loading, error, course } = useSelector(
    (state) => state.courseDetails
  );

  const { user } = useSelector((state) => state.auth);
  const isAdmin = user && user.role === "admin";

  useEffect(() => {
    dispatch(getCourseDetails(id));
    return () => {
      dispatch(clearErrors());
    };
  }, [dispatch, id]);

  if (loading) return <Loader />;
  if (error)
    return (
      <Typography variant="h2" style={{ textAlign: "center" }}>
        {error}
      </Typography>
    );

  return (
    <Fragment>
      <MetaData title={course.title} />
      <Box mt={5} mx={2} sx={{ marginTop: "150px" }}>
        <Paper elevation={3} style={{ padding: "20px" }}>
          <Typography variant="h3" gutterBottom>
            {course.title}
          </Typography>
          <Typography variant="body1" gutterBottom>
            {course.description}
          </Typography>
          {isAdmin && (
            <Button
              variant="outlined"
              color="success"
              component={Link}
              to={`/admin/course/${id}/module`}
              style={{ marginTop: "20px" }}
              startIcon={<ImportContactsIcon />}
            >
              Add Module
            </Button>
          )}
        </Paper>
      </Box>
      <Box mt={5} mx={2}>
        <Grid container spacing={3}>
          {course.modules &&
            course.modules.map((module, index) => (
              <Grid key={module._id} item xs={12} md={6} lg={4}>
                <CourseModuleCard
                  module={module}
                  isFirst={index === 0}
                  prevModuleStatus={
                    index > 0 ? course.modules[index - 1].status : null
                  }
                />
              </Grid>
            ))}
        </Grid>
      </Box>
    </Fragment>
  );
};

export default CourseDetails;
