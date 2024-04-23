import React, { Fragment } from "react";
import { Grid, Typography, Container, Box, Paper, Card } from "@mui/material";
import { Link } from "react-router-dom";
import { Parallax, ParallaxLayer } from "@react-spring/parallax";
import CountUp from "react-countup";
import {
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  StatGroup,
} from "@chakra-ui/react";
const HomePage = () => {
  return (
    // <Container maxWidth="xl">
    <div>
      <Parallax pages={2}>
        {/* Mustard BG */}
        <ParallaxLayer
          speed={1}
          factor={0}
          style={{
            backgroundImage: 'url("/images/mustard.png")',
            backgroundSize: "cover",
            backgroundPosition: "right center",
            height: "auto",
          }}
        ></ParallaxLayer>

        {/* RCGI Logo */}
        <ParallaxLayer speed={0.5} offset={0}>
          <img
            src="/images/homeRCGI.png"
            style={{
              height: "auto",
              width: "60%",
              objectFit: "cover",
              position: "absolute",
              top: "40%",
              left: "20%",
              transform: "translate(-50%, -50%)",
              zIndex: 1,
            }}
          ></img>
        </ParallaxLayer>

        {/* Overview */}
        <ParallaxLayer offset={0} speed={0.5}>
          <Typography
            variant="h1"
            style={{
              color: "white",
              position: "absolute",
              right: "15%",
              top: "40%",
            }}
          >
            Sample
          </Typography>
        </ParallaxLayer>

        <ParallaxLayer offset={0} speed={0.5}>
          <Box
            component="section"
            style={{
              position: "absolute",
              right: "5%",
              top: "55%",
              margin: 5,
              textAlign: "center",
              width: "40%",
            }}
          >
            <Typography
              variant="subtitle"
              style={{
                color: "white",
              }}
            >
              Aute ullamco minim Lorem aliquip quis officia amet occaecat Lorem
              laborum consectetur. Minim pariatur cillum reprehenderit tempor
              eiusmod laboris est voluptate enim sunt culpa. Mollit ex qui
              laborum officia ea eiusmod ullamco. Nisi voluptate culpa magna
              nostrud. Deserunt labore esse aliquip eiusmod mollit voluptate
              veniam nostrud aliqua esse. Exercitation adipisicing anim labore
              sint culpa sint tempor.
            </Typography>
          </Box>
        </ParallaxLayer>

        {/* Olive BG */}
        <ParallaxLayer
          offset={1}
          speed={0.5}
          style={{
            backgroundImage: 'url("/images/olive.png")',
            backgroundSize: "cover",
          }}
        ></ParallaxLayer>

        {/* Papers */}
        <ParallaxLayer
          offset={1}
          speed={0.5}
          style={{
            display: "flex",
            top: "8%",
            left: "20%",
          }}
        >
          <Paper
            elevation={6}
            style={{
              padding: "20px",
              width: "400px",
              height: "80%",
              borderRadius: "20px",
              textAlign: "center",
            }}
          >
            <Typography variant="h1">
              <CountUp start={0} end={500} duration={2.5} />+
            </Typography>
            <Typography variant="h3">
              Employees
            </Typography>
          </Paper>
        </ParallaxLayer>

        <ParallaxLayer
          offset={1}
          speed={0.5}
          style={{
            display: "flex",
            top: "8%",
            left: "55%",
          }}
        >
          <Paper
            elevation={6}
            style={{
              padding: "20px",
              width: "400px",
              height: "80%",
              borderRadius: "20px",
              textAlign: "center",
            }}
          >
            <Typography variant="h1">
              <CountUp start={0} end={40} duration={2.5} />+
            </Typography>
            <Typography variant="h3">
              Associated Members
            </Typography>
          </Paper>
        </ParallaxLayer>
      </Parallax>
      {/* </Container> */}
    </div>
  );
};

export default HomePage;
