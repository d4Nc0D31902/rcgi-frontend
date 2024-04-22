import React from "react";
import { Grid, Typography, Container, Box } from "@mui/material";
import { Link } from "react-router-dom";
import First from "../components/page/First";
const HomePage = () => {
  return (
    <Container maxWidth="xl">
      <Box>
        <First />
      </Box>
    </Container>
  );
};

export default HomePage;
