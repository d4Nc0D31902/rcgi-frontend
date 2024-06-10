import React, { Fragment, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { newFeedback, clearErrors } from "../../actions/feedbackActions";
import { NEW_FEEDBACK_RESET } from "../../constants/feedbackConstants";
import { toast } from "react-toastify";
import MetaData from "../layout/MetaData";
import { TextField, Button, Typography, Grid, Paper } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import SendIcon from "@mui/icons-material/Send";
import { useTheme } from "@mui/material/styles";

const NewFeedback = () => {
  const [feedback, setFeedback] = useState("");

  const dispatch = useDispatch();
  let navigate = useNavigate();

  const { loading, error, success } = useSelector((state) => state.newFeedback);
  const theme = useTheme();

  const message = (message = "") =>
    toast.success(message, {
      position: toast.POSITION.BOTTOM_CENTER,
    });

  useEffect(() => {
    if (error) {
      dispatch(clearErrors());
    }

    if (success) {
      navigate("/");
      message("Feedback submitted successfully");
      dispatch({ type: NEW_FEEDBACK_RESET });
    }
  }, [dispatch, error, success, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();

    const feedbackData = {
      feedback,
    };

    dispatch(newFeedback(feedbackData));
  };

  return (
    <Fragment>
      <MetaData title={"New Feedback"} />
      <Grid
        container
        spacing={3}
        sx={{
          [theme.breakpoints.only("xs")]: {
            height: "100vh",
          },
          [theme.breakpoints.only("sm")]: {
            height: "100vh",
          },
          [theme.breakpoints.only("md")]: {
            height: "100vh",
            padding: "50px",
          },
          [theme.breakpoints.only("xl")]: {
            height: "100vh",
            padding: "50px",
          },
        }}
      >
        <Grid item xs={12} display="flex" justifyContent="center">
          <Paper
            elevation={3}
            sx={{
              [theme.breakpoints.only("xs")]: {
                p: 3,
                width: "100%",
                height: "50%",
              },
              [theme.breakpoints.only("sm")]: {
                p: 3,
                width: "100%",
                height: "40%",
              },
              [theme.breakpoints.only("md")]: {
                p: 3,
                width: "100%",
                height: "30%",
              },
              [theme.breakpoints.only("xl")]: {
                p: 3,
                width: "40%",
                height: "55%",
              },
            }}
          >
            <Typography
              variant="h4"
              component="h1"
              gutterBottom
              textAlign="center"
            >
              Feedback
            </Typography>
            <form onSubmit={submitHandler}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    id="feedback_field"
                    label="Feedback"
                    fullWidth
                    required
                    multiline
                    rows={8}
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="success"
                    disabled={loading}
                    // fullWidth
                    endIcon={<SendIcon />}
                  >
                    {loading ? "Submitting..." : "Submit"}
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default NewFeedback;
