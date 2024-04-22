import React from "react";
import { motion } from "framer-motion";
import { Box, Typography, Grid } from "@mui/material";
import { Container } from "react-bootstrap";

const First = () => {
  return (
    <Container>
      <Box>
        <motion.img
          src="/images/mustard.png"
          alt="Mustard"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: -1,
          }}
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
        <motion.img
          src="/images/rcgi.jpg"
          alt="Logo"
          style={{
            width: "40%",
            height: "40%",
            objectFit: "cover",
            position: "absolute",
            top: 200,
            left: 50,
            zIndex: -1,
          }}
          initial={{ x: "-100%" }}
          animate={{ x: 0 }}
          transition={{ duration: 2, delay: 0.5, ease: "easeInOut" }}
        />
      </Box>
      <Grid
        container
        justifyContent="flex-start" // Changed justifyContent to flex-start
        sx={{ marginTop: { xs: 3, md: 5 } }}
      >
        <Typography variant="h3" sx={{ color: "black" }}>
          Overview
        </Typography>
      </Grid>
    </Container>
  );
};

export default First;
