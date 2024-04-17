import React from "react";
import { Grid, Typography, Button, Skeleton } from "@mui/material";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <Grid
      container
      spacing={2}
      justifyContent="center"
      alignItems="center"
      style={{ minHeight: "100vh" }}
    >
      <Grid item xs={12}>
        <Typography
          variant="h2"
          align="center"
          gutterBottom
          style={{ marginTop: "20px" }}
        >
          Welcome to Our Website
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <Typography variant="body1" paragraph>
          We are delighted to have you here. Explore our website to discover
          exciting features and offerings.
        </Typography>
      </Grid>
      <Grid item xs={12} sm={6} align="center">
        <Skeleton variant="rectangular" width="100%" height={300} />
      </Grid>
      <Grid item xs={12} sm={6} align="center">
        <Skeleton variant="rectangular" width="100%" height={300} />
      </Grid>
      <Grid item xs={12} align="center">
        <Button variant="contained" component={Link} to="/explore">
          Explore More
        </Button>
      </Grid>
      {/* Additional Placeholder Sections */}
      <Grid item xs={12}>
        <Typography variant="h4" align="center" gutterBottom>
          Our Services
        </Typography>
      </Grid>
      <Grid item xs={12} sm={4} align="center">
        <Skeleton variant="rectangular" width="80%" height={200} />
      </Grid>
      <Grid item xs={12} sm={4} align="center">
        <Skeleton variant="rectangular" width="80%" height={200} />
      </Grid>
      <Grid item xs={12} sm={4} align="center">
        <Skeleton variant="rectangular" width="80%" height={200} />
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h4" align="center" gutterBottom>
          Testimonials
        </Typography>
      </Grid>
      <Grid item xs={12} sm={6} align="center">
        <Skeleton variant="rectangular" width="100%" height={100} />
      </Grid>
      <Grid item xs={12} sm={6} align="center">
        <Skeleton variant="rectangular" width="100%" height={100} />
      </Grid>
    </Grid>
  );
};

export default HomePage;
