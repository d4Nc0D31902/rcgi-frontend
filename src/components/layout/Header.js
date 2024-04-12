import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Avatar,
  Menu,
  MenuItem,
} from "@mui/material";
import { Logout, School as SchoolIcon } from "@mui/icons-material";
import { logout } from "../../actions/userActions";

const Header = () => {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.auth);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <Fragment>
      <AppBar position="static" sx={{ backgroundColor: "white", height: 80 }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to="/">
              <img
                src="/images/rcgi_logo.png"
                alt="RCGI Logo"
                style={{ width: "90px", height: "auto", marginTop: "10px" }}
              />
            </Link>
          </Typography>
          <Link
            to="/courses"
            style={{
              textDecoration: "none",
              marginLeft: "10px",
              marginTop: "10px",
            }}
          >
            <Button
              color="inherit"
              startIcon={<SchoolIcon />}
              sx={{ color: "black" }}
            >
              Courses
            </Button>
          </Link>
          <div style={{ flexGrow: 1 }}></div>
          {user ? (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
                style={{ marginTop: "10px" }}
              >
                <Avatar alt={user.name} src={user.avatar && user.avatar.url} />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                open={open}
                onClose={handleClose}
                style={{ marginTop: "43px" }}
              >
                {user.role === "admin" && (
                  <MenuItem
                    onClick={handleClose}
                    component={Link}
                    to="/dashboard"
                  >
                    Dashboard
                  </MenuItem>
                )}
                <MenuItem
                  onClick={handleClose}
                  component={Link}
                  to="/enrollment/me"
                >
                  Enrollments
                </MenuItem>
                <MenuItem onClick={handleClose} component={Link} to="/me">
                  Profile
                </MenuItem>
                <MenuItem onClick={logoutHandler}>
                  <Logout color="error" />
                  Logout
                </MenuItem>
              </Menu>
            </div>
          ) : (
            !loading && (
              <Button
                color="inherit"
                component={Link}
                to="/login"
                sx={{ color: "black" }}
                style={{ marginTop: "10px" }}
              >
                Login
              </Button>
            )
          )}
        </Toolbar>
      </AppBar>
    </Fragment>
  );
};

export default Header;
