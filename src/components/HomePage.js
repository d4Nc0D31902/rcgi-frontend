import React from "react";
import { Grid, Typography, Button } from "@mui/material";
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
        <Typography variant="h2" align="center" gutterBottom>
          Welcome to Our Website
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <Typography variant="body1" paragraph>
          We are delighted to have you here. Explore our website to discover
          exciting features and offerings.
        </Typography>
      </Grid>
    </Grid>
  );
};

export default HomePage;
