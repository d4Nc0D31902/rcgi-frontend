import React, { Fragment, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MetaData from "../layout/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { addUser, clearErrors } from "../../actions/userActions";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  TextField,
  Button,
  Typography,
  CircularProgress,
  Grid,
  Container,
  InputAdornment,
  Box,
  MenuItem,
} from "@mui/material";
import HowToRegOutlinedIcon from "@mui/icons-material/HowToRegOutlined";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import EmailIcon from "@mui/icons-material/Email";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import BusinessIcon from "@mui/icons-material/Business";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import BadgeIcon from "@mui/icons-material/Badge";
import "../../App.css";

const AddUser = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    company: "",
    employee_id: "",
    branch: "",
  });
  const { name, email, password, company, employee_id, branch } = user;
  // const [avatar, setAvatar] = useState("");
  // const [avatarPreview, setAvatarPreview] = useState({
  //   avatar: "/images/default_avatar.jpg",
  // });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, loading } = useSelector((state) => state.addUser);

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set("name", name);
    formData.set("email", email);
    formData.set("password", password);
    // formData.set("avatar", avatar);
    formData.set("company", company);
    formData.set("branch", branch);
    formData.set("employee_id", employee_id);

    try {
      dispatch(addUser(formData)).then(() => {
        toast.success("Add User Success!");
        navigate("/admin/users");
      });
    } catch (error) {
      toast.error("Failed to add user. Please try again.");
      console.error("Error adding user:", error);
    }
  };

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <Fragment>
      <MetaData title={"Add User"} />

      <Grid
        container
        spacing={2}
        justifyContent="center"
        alignItems="center"
        style={{
          height: "100vh",
        }}
      >
        <Grid item xs={12} sm={8} md={6} lg={4}>
          <Box
            sx={{
              backgroundColor: "white",
              boxShadow: "0px 4px 24px rgba(0, 0, 0, 0.1)",
              borderRadius: "8px",
              padding: "20px",
            }}
          >
            <form onSubmit={submitHandler} encType="multipart/form-data">
              <Typography
                variant="h4"
                align="center"
                gutterBottom
                sx={{ color: "black" }}
              >
                Add User
              </Typography>

              <TextField
                id="name_field"
                label="Full Name"
                variant="outlined"
                name="name"
                value={name}
                onChange={onChange}
                fullWidth
                margin="normal"
                placeholder="Full Name"
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <DriveFileRenameOutlineIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                id="email_field"
                label="Email"
                variant="outlined"
                name="email"
                value={email}
                onChange={onChange}
                fullWidth
                margin="normal"
                placeholder="Email"
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                id="password_field"
                label="Password"
                variant="outlined"
                name="password"
                value={password}
                onChange={onChange}
                fullWidth
                margin="normal"
                placeholder="Password"
                required
                type={showPassword ? "text" : "password"}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <VpnKeyIcon />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <Button onClick={togglePasswordVisibility}>
                      {showPassword ? (
                        <VisibilityIcon color="action" />
                      ) : (
                        <VisibilityOffIcon color="action" />
                      )}
                    </Button>
                  ),
                }}
              />

              <TextField
                id="company_field"
                select
                label="Company"
                variant="outlined"
                name="company"
                value={company}
                onChange={onChange}
                fullWidth
                margin="normal"
                placeholder="Select a company"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <BusinessIcon />
                    </InputAdornment>
                  ),
                }}
              >
                <MenuItem disabled value="">
                  <em>Choose a company</em>
                </MenuItem>
                {[
                  "Barcino",
                  "Meat Depot",
                  "Single Origin",
                  "Bluesmith",
                  "None",
                ].map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                id="branch_field"
                label="Branch"
                variant="outlined"
                name="branch"
                value={branch}
                onChange={onChange}
                fullWidth
                margin="normal"
                placeholder="Branch"
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <DriveFileRenameOutlineIcon />
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                id="employee_id_field"
                label="Employee ID"
                variant="outlined"
                name="employee_id"
                value={employee_id}
                onChange={onChange}
                fullWidth
                margin="normal"
                placeholder="Employee ID"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <BadgeIcon />
                    </InputAdornment>
                  ),
                }}
              />

              {/* <div className="form-group">
                <label htmlFor="avatar_upload">Avatar</label>
                <div className="d-flex align-items-center">
                  <div>
                    <figure className="avatar mr-3 item-rtl">
                      <img
                        src={avatarPreview}
                        className="rounded-circle avatar-preview"
                        alt="Avatar Preview"
                      />
                    </figure>
                  </div>
                  <div className="custom-file" style={{ cursor: "pointer" }}>
                    <input
                      type="file"
                      name="avatar"
                      className="custom-file-input"
                      id="customFile"
                      accept="images/*"
                      onChange={onChange}
                    />
                    <label className="custom-file-label" htmlFor="customFile">
                      Choose Avatar
                    </label>
                  </div>
                </div>
              </div> */}

              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  height: "50px",
                }}
              >
                <Button
                  id="add_button"
                  type="submit"
                  variant="contained"
                  className="btn btn-block py-3"
                  color="success"
                  disabled={loading ? true : false}
                  endIcon={<HowToRegOutlinedIcon />}
                  style={{
                    borderRadius: "50px",
                    width: "40%",
                  }}
                >
                  Add
                </Button>
              </div>
            </form>
          </Box>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default AddUser;
