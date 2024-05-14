import React, { Fragment, useState, useEffect } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
} from "@mui/material";
import MetaData from "../layout/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { forgotPassword, clearErrors } from "../../actions/userActions";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const { error, loading, message } = useSelector(
    (state) => state.forgotPassword
  );

  useEffect(() => {
    if (error) {
      notify(error);
      dispatch(clearErrors());
    }
    if (message) {
      success(message);
    }
  }, [dispatch, error, message]);

  const success = (message = "") =>
    toast.success(message, {
      position: toast.POSITION.BOTTOM_CENTER,
    });
  const notify = (error = "") =>
    toast.error(error, {
      position: toast.POSITION.BOTTOM_CENTER,
    });

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set("email", email);
    dispatch(forgotPassword(formData));
  };

  return (
    <Fragment>
      <MetaData title={"Forgot Password"} />
      <Container maxWidth="md" sx={{ mt: 5 }}>
        <Grid container justifyContent="center">
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 4, marginTop: "50px" }}>
              <Typography variant="h4" align="center" gutterBottom>
                Forgot Password
              </Typography>
              <form onSubmit={submitHandler}>
                <TextField
                  id="email"
                  name="email"
                  type="email"
                  label="Enter Email"
                  variant="outlined"
                  fullWidth
                  mb={3}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  disabled={loading}
                  style={{ marginTop: 20 }}
                >
                  Send Email
                </Button>
              </form>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Fragment>
  );
};

export default ForgotPassword;
