import React, { Fragment, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MetaData from "../layout/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { register, clearErrors } from "../../actions/userActions";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";

const NewUser = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    company: "",
  });
  const { name, email, password, company } = user;

  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState(
    "/images/default_avatar.jpg"
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    if (error) {
      dispatch(clearErrors());
    }
  }, [dispatch, error]);

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set("name", name);
    formData.set("email", email);
    formData.set("password", password);
    formData.set("company", company);
    formData.set("avatar", avatar);

    dispatch(register(formData));
    navigate("/admin/users");
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

  return (
    <Fragment>
      <MetaData title={"Register User"} />

      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form
            className="shadow-lg"
            onSubmit={submitHandler}
            encType="multipart/form-data"
          >
            <h1 className="mb-3">Register</h1>

            <TextField
              label="Name"
              variant="outlined"
              fullWidth
              value={name}
              onChange={onChange}
              name="name"
              margin="normal"
              required
            />

            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              value={email}
              onChange={onChange}
              name="email"
              margin="normal"
              required
            />

            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              value={password}
              onChange={onChange}
              name="password"
              margin="normal"
              required
            />

            {/* <TextField
              label="Company"
              variant="outlined"
              fullWidth
              value={company}
              onChange={onChange}
              name="company"
              margin="normal"
              required
            /> */}

            <TextField
              select
              label="Company"
              variant="outlined"
              fullWidth
              value={company}
              onChange={onChange}
              name="company"
              margin="normal"
              required
            >
              <MenuItem value="Barcino">Barcino</MenuItem>
              <MenuItem value="Bluesmith">Bluesmith</MenuItem>
              <MenuItem value="Meat Depot">Meat Depot</MenuItem>
              <MenuItem value="Single Origin">Single Origin</MenuItem>
            </TextField>

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
              variant="contained"
              type="submit"
              fullWidth
              disabled={loading}
            >
              Register
            </Button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default NewUser;
