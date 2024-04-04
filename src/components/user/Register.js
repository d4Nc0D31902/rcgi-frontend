import React, { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import MetaData from "../layout/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../actions/userActions";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Grid from "@mui/material/Unstable_Grid2";
import Box from "@mui/material/Box";
import HowToRegOutlinedIcon from "@mui/icons-material/HowToRegOutlined";
import DriveFileRenameOutlineOutlinedIcon from "@mui/icons-material/DriveFileRenameOutlineOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import ApartmentOutlinedIcon from "@mui/icons-material/ApartmentOutlined";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

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
        style={{ minHeight: "100vh", backgroundColor: "#f5f5f5" }}
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
                label="Name"
                variant="outlined"
                name="name"
                value={name}
                onChange={onChange}
                fullWidth
                margin="normal"
                required
                InputProps={{
                  startAdornment: (
                    <DriveFileRenameOutlineOutlinedIcon color="action" />
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
                required
                InputProps={{
                  startAdornment: <EmailOutlinedIcon color="action" />,
                }}
              />

              {/* <TextField
                id="password_field"
                label="Password"
                variant="outlined"
                name="password"
                value={password}
                onChange={onChange}
                fullWidth
                margin="normal"
                required
                type={showPassword ? "text" : "password"} 
                InputProps={{
                  endAdornment: (
                    <Button onClick={togglePasswordVisibility}>
                      {showPassword ? (
                        <VisibilityIcon />
                      ) : (
                        <VisibilityOffIcon />
                      )}
                    </Button>
                  ),
                }}
              /> */}

              <TextField
                id="password_field"
                label="Password"
                variant="outlined"
                name="password"
                value={password}
                onChange={onChange}
                fullWidth
                margin="normal"
                required
                type={showPassword ? "text" : "password"}
                InputProps={{
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
                required
                InputProps={{
                  startAdornment: <ApartmentOutlinedIcon color="action" />,
                }}
              >
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
                required
                InputProps={{
                  startAdornment: <BadgeOutlinedIcon color="action" />,
                }}
              />

              <div className="form-group">
                <label htmlFor="avatar_upload">Avatar</label>
                <div className="d-flex align-items-center">
                  <div>
                    <figure className="avatar mr-3 item-rtl">
                      <img
                        src={avatarPreview}
                        className="rounded-circle"
                        alt="Avatar Preview"
                      />
                    </figure>
                  </div>
                  <div className="custom-file">
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
                color="success"
                disabled={loading ? true : false}
                startIcon={<HowToRegOutlinedIcon />}
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
