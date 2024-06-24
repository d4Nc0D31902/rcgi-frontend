import React, { Fragment, useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  TextField,
  Button,
  Typography,
  CircularProgress,
  Grid,
  Container,
  InputAdornment,
  Paper,
} from "@mui/material";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { login, clearErrors } from "../../actions/userActions";
import MetaData from "../layout/MetaData";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import LoginIcon from "@mui/icons-material/Login";

const Login = () => {
  // const [email, setEmail] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let location = useLocation();
  const { isAuthenticated, error, loading, user } = useSelector(
    (state) => state.auth
  );
  const isAdmin = user && user.role === "admin";
  const redirect = new URLSearchParams(location.search).get("redirect");
  const notify = (error = "") =>
    toast.error(error, {
      position: toast.POSITION.BOTTOM_CENTER,
    });

  useEffect(() => {
    if (isAuthenticated) {
      if (isAdmin) {
        navigate("/dashboard", { replace: true });
      } else if (redirect === "shipping") {
        navigate(`/${redirect}`, { replace: true });
      } else {
        if (user.company === "Barcino") {
          navigate("/barcino", { replace: true });
        } else if (user.company === "Meat Depot") {
          navigate("/meat-depot", { replace: true });
        } else if (user.company === "Single Origin") {
          navigate("/single-origin", { replace: true });
        } else if (user.company === "Bluesmith") {
          navigate("/bluesmith", { replace: true });
        } else {
          navigate("/enrollment/me", { replace: true });
        }
      }
    }

    if (error) {
      notify(error);
      dispatch(clearErrors());
    }
  }, [
    dispatch,
    isAuthenticated,
    isAdmin,
    error,
    navigate,
    redirect,
    user,
  ]);

  const submitHandler = (e) => {
    e.preventDefault();
    // dispatch(login(email, password));
    dispatch(login(employeeId, password));
  };

  const toggleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <Fragment>
      <MetaData title={"Login"} />
      <Container maxWidth="sm">
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          style={{ minHeight: "70vh" }}
        >
          <Grid item xs={12}>
            <Paper elevation={3} style={{ padding: "20px" }}>
              <form onSubmit={submitHandler}>
                <Typography variant="h4" align="center" gutterBottom>
                  Login
                </Typography>
                <TextField
                  type="text"
                  id="employee_id_field"
                  label="Employee ID"
                  variant="outlined"
                  required
                  fullWidth
                  placeholder="Employee ID"
                  margin="normal"
                  value={employeeId}
                  onChange={(e) => setEmployeeId(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccountCircleIcon />
                      </InputAdornment>
                    ),
                  }}
                />

                <TextField
                  type={showPassword ? "text" : "password"}
                  id="password_field"
                  label="Password"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  placeholder="Password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <VpnKeyIcon />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        {showPassword ? (
                          <VisibilityOff
                            onClick={toggleShowPassword}
                            style={{ cursor: "pointer" }}
                          />
                        ) : (
                          <Visibility
                            onClick={toggleShowPassword}
                            style={{ cursor: "pointer" }}
                          />
                        )}
                      </InputAdornment>
                    ),
                  }}
                />
                <Typography variant="body2" align="right" gutterBottom>
                  <Link
                    style={{ textDecoration: "none" }}
                    to="/password/forgot"
                  >
                    Forgot Password?
                  </Link>
                </Typography>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    height: "60px",
                  }}
                >
                  <Button
                    variant="contained"
                    color="success"
                    type="submit"
                    size="large"
                    disabled={loading}
                    endIcon={<LoginIcon />}
                    sx={{ mt: 2 }}
                    style={{ borderRadius: "50px", width: "40%" }}
                  >
                    {loading ? (
                      <CircularProgress size={24} color="inherit" />
                    ) : (
                      "LOGIN"
                    )}
                  </Button>
                </div>
                <Typography
                  variant="body2"
                  align="center"
                  gutterBottom
                  style={{ marginTop: "20px" }}
                >
                  <Link style={{ textDecoration: "none" }} to="/register">
                    New User?
                  </Link>
                </Typography>
              </form>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Fragment>
  );
};

export default Login;
