// Import useState hook
import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  Badge, // Import Badge component
} from "@mui/material";
import { Logout, School as SchoolIcon } from "@mui/icons-material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { logout } from "../../actions/userActions";
import {
  getNotifications,
  markAllNotificationsAsRead, // Import markAllNotificationsAsRead action
} from "../../actions/notificationActions"; // Import getNotifications action

const Header = () => {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.auth);
  const { notifications } = useSelector((state) => state.notifications); // Get notifications from Redux state
  const notify = (error = "") =>
    toast.error(error, {
      position: toast.POSITION.BOTTOM_CENTER,
    });
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logoutHandler = () => {
    dispatch(logout())
      .then(() => {
        toast.success("Logout successful!", {
          position: toast.POSITION.BOTTOM_CENTER,
        });
      })
      .catch((error) => {
        notify(error.message);
      });
  };

  const markAllAsReadHandler = () => {
    dispatch(markAllNotificationsAsRead())
      .then(() => {
        toast.success("All notifications marked as read!", {
          position: toast.POSITION.BOTTOM_CENTER,
        });
      })
      .catch((error) => {
        notify(error.message);
      });
  };

  // Fetch notifications on component mount
  useEffect(() => {
    dispatch(getNotifications());
  }, [dispatch]);

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
                aria-label="notifications"
                style={{
                  marginTop: "10px",
                  color: "black",
                }}
                onClick={markAllAsReadHandler} 
              >
                {notifications.some(
                  (notification) => notification.status === "unread"
                ) && (
                  <Badge
                    badgeContent={
                      notifications.filter(
                        (notification) => notification.status === "unread"
                      ).length
                    }
                    color="error"
                  >
                    <NotificationsIcon />
                  </Badge>
                )}
                {!notifications.some(
                  (notification) => notification.status === "unread"
                ) && <NotificationsIcon />}
              </IconButton>
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
                style={{ marginTop: "43px", textAlign: "center" }}
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
                <Divider style={{ margin: "5px 0" }} />
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
