import React, { Fragment, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  updateUser,
  getUserDetails,
  clearErrors,
} from "../../actions/userActions";
import { UPDATE_USER_RESET } from "../../constants/userConstants";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MetaData from "../layout/MetaData";
import Sidebar from "./Sidebar";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
  Paper,
} from "@mui/material";

const UpdateUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [company, setCompany] = useState("");
  const [employeeId, setEmployeeId] = useState("");

  const dispatch = useDispatch();
  let navigate = useNavigate();
  const { error, isUpdated } = useSelector((state) => state.user);
  const { user } = useSelector((state) => state.userDetails);
  const { id } = useParams();

  const errMsg = (message = "") =>
    toast.error(message, {
      position: toast.POSITION.BOTTOM_CENTER,
    });

  const successMsg = (message = "") =>
    toast.success(message, {
      position: toast.POSITION.BOTTOM_CENTER,
    });

  useEffect(() => {
    if (user && user._id !== id) {
      dispatch(getUserDetails(id));
    } else {
      setName(user.name);
      setEmail(user.email);
      setRole(user.role);
      setCompany(user.company);
      setEmployeeId(user.employee_id);
    }

    if (error) {
      errMsg(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      successMsg("User updated successfully");
      navigate("/admin/users");
      dispatch({
        type: UPDATE_USER_RESET,
      });
    }
  }, [dispatch, error, navigate, isUpdated, id, user]);

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set("name", name);
    formData.set("email", email);
    formData.set("role", role);
    formData.set("company", company);
    formData.set("employee_id", employeeId);
    dispatch(updateUser(user._id, formData));
  };

  return (
    <Fragment>
      <MetaData title={`Update User`} />
      <Grid container spacing={2} sx={{ height: "100vh" }}>
        <Grid item xs={12} md={2}>
          <Sidebar />
        </Grid>
        <Grid
          item
          xs={12}
          md={10}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <Grid container justifyContent="center" display={"flex"}>
            <Grid item xs={10} lg={5}>
              <Paper
                elevation={3}
                // className="p-4"
                sx={{ marginTop: "50px", width: "100%", padding: "40px" }}
              >
                <form onSubmit={submitHandler}>
                  <h1
                    className="mt-2 mb-5"
                    style={{ color: "black", textAlign: "center" }}
                  >
                    Update User
                  </h1>
                  <TextField
                    fullWidth
                    label="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    sx={{ marginTop: "20px" }}
                  />
                  <TextField
                    fullWidth
                    label="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    sx={{ marginTop: "20px" }}
                  />
                  <FormControl fullWidth sx={{ marginTop: "20px" }}>
                    <InputLabel>Role</InputLabel>
                    <Select
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                    >
                      <MenuItem value="user">user</MenuItem>
                      <MenuItem value="admin">admin</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl fullWidth sx={{ marginTop: "20px" }}>
                    <InputLabel>Company</InputLabel>
                    <Select
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                    >
                      <MenuItem value="None">None</MenuItem>
                      <MenuItem value="Barcino">Barcino</MenuItem>
                      <MenuItem value="Meat Depot">Meat Depot</MenuItem>
                      <MenuItem value="Single Origin">Single Origin</MenuItem>
                      <MenuItem value="Bluesmith">Bluesmith</MenuItem>
                    </Select>
                  </FormControl>
                  <TextField
                    fullWidth
                    label="Employee ID"
                    value={employeeId}
                    onChange={(e) => setEmployeeId(e.target.value)}
                    sx={{ marginTop: "20px" }}
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    className="mt-4 mb-3"
                  >
                    Update
                  </Button>
                </form>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default UpdateUser;
