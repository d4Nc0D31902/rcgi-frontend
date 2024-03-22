import React, { Fragment, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCourseDetails, clearErrors } from "../../actions/courseActions";
import { Box, Button, Grid, Typography } from "@mui/material";
import Loader from "../layout/Loader";
import MetaData from "../layout/MetaData";
import CourseModuleCard from "./CourseModuleCard";

const CourseDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { loading, error, course } = useSelector(
    (state) => state.courseDetails
  );

  // Access user data from Redux store
  const { user } = useSelector((state) => state.auth);
  // Extract user role
  const isAdmin = user && user.role === "admin";

  useEffect(() => {
    dispatch(getCourseDetails(id));
    return () => {
      dispatch(clearErrors());
    };
  }, [dispatch, id]);

  if (loading) return <Loader />;
  if (error) return <Typography variant="h2">{error}</Typography>;

  return (
    <Fragment>
      <MetaData title={course.title} />
      <Grid container spacing={4}>
        <Grid item xs={12} lg={5}>
          <Box mt={5}>
            <Typography variant="h3">{course.title}</Typography>
            <Typography variant="body1" mt={2}>
              {course.description}
            </Typography>
            {isAdmin && (
              <Button
                variant="contained"
                color="primary"
                component={Link}
                to={`/admin/course/${id}/module`}
                mt={2}
              >
                Add Module
              </Button>
            )}
          </Box>
        </Grid>
      </Grid>
      <Grid container spacing={4} mt={4}>
        {course.modules &&
          course.modules.map((module) => (
            <Grid key={module._id} item xs={12} md={6} lg={4}>
              <CourseModuleCard module={module} />
            </Grid>
          ))}
      </Grid>
    </Fragment>
  );
};

export default CourseDetails;
