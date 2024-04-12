import React, { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import MetaData from "../layout/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../actions/userActions";
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

const Register = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    company: "",
    employee_id: "",
  });
  const { name, email, password, company, employee_id } = user;
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState(
    "/images/default_avatar.jpg"
  );
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading } = useSelector((state) => state.auth);

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set("name", name);
    formData.set("email", email);
    formData.set("password", password);
    formData.set("avatar", avatar);
    formData.set("company", company);
    formData.set("employee_id", employee_id);

    dispatch(register(formData)).then(() => {
      toast.success("Registration successful!");
      navigate("/admin/users");
    });
  };

  const onChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <Fragment>
      <MetaData title={"Register User"} />

      <Grid
        container
        spacing={2}
        justifyContent="center"
        alignItems="center"
        style={{ minHeight: "100vh" }}
      >
        <Grid item xs={12} sm={8} md={6} lg={4}>
          <Box
            sx={{
              backgroundColor: "white",
              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
              borderRadius: "8px",
              padding: "20px",
            }}
          >
            <form onSubmit={submitHandler} encType="multipart/form-data">
              <h1 className="mb-3">Register</h1>

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
                {["Barcino", "Meat Depot", "Single Origin", "Bluesmith"].map(
                  (option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  )
                )}
              </TextField>

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

              <div className="form-group">
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
              </div>

              <Button
                id="register_button"
                type="submit"
                variant="contained"
                className="btn btn-block py-3"
                color="primary"
                disabled={loading ? true : false}
                endIcon={<HowToRegOutlinedIcon />}
              >
                REGISTER
              </Button>
            </form>
          </Box>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default Register;
