import React from "react";
import {
  Typography,
  Container,
  Box,
  IconButton,
  Divider,
  TextField,
  Button,
  Grid,
} from "@mui/material";
import { Email, Facebook, Twitter, Instagram } from "@mui/icons-material";

const Footer = () => {
  return (
    <footer>
      <Box py={4}>
        <Divider />
        <Container style={{ marginTop: "20px" }}>
          <Grid container spacing={2} alignItems="center">
            {/* Contact Us Section */}
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                Contact Us
              </Typography>
              <Typography variant="body1" gutterBottom>
                Email: info@example.com
              </Typography>
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                mt={2}
              >
                <IconButton aria-label="Facebook" color="inherit">
                  <Facebook />
                </IconButton>
                <IconButton aria-label="Twitter" color="inherit">
                  <Twitter />
                </IconButton>
                <IconButton aria-label="Instagram" color="inherit">
                  <Instagram />
                </IconButton>
              </Box>
            </Grid>
            {/* Feedback Form Section */}
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                Feedback Form
              </Typography>
              <form>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={8}>
                    <TextField
                      id="outlined-basic"
                      label="Your Feedback"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <Button variant="contained" fullWidth>
                      Submit
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Divider />
      <Box py={4} textAlign="center">
        <Container>
          <Typography variant="body2">
            Restaurant Concept Group Inc., All Rights Reserved
          </Typography>
        </Container>
      </Box>
    </footer>
  );
};

export default Footer;
