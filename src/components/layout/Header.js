import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import io from "socket.io-client";
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
  Badge,
  Popover,
  List,
  ListItem,
  ListItemText,
  Box,
  Container,
  ListItemIcon,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Logout, School as SchoolIcon } from "@mui/icons-material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { logout } from "../../actions/userActions";
import {
  getNotifications,
  markAllNotificationsAsRead,
} from "../../actions/notificationActions";
import InsertCommentIcon from "@mui/icons-material/InsertComment";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";

const Header = () => {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.auth);
  const { notifications } = useSelector((state) => state.notifications);
  const notify = (error = "") =>
    toast.error(error, {
      position: toast.POSITION.BOTTOM_CENTER,
    });

  const [anchorEl, setAnchorEl] = useState(null);
  const [notificationAnchorEl, setNotificationAnchorEl] = useState(null);

  const open = Boolean(anchorEl);
  const notificationOpen = Boolean(notificationAnchorEl);

  const isAdmin = user && user.role === "admin";

  // const REACT_APP_API = process.env.REACT_APP_API;

  const theme = useTheme();

  const linkStyles = {
    textDecoration: "none",
    marginLeft: "10px",
    marginTop: "10px",
    [theme.breakpoints.only("xs")]: {
      marginLeft: "5px",
      marginTop: "5px",
    },
    [theme.breakpoints.only("md")]: {
      marginLeft: "15px",
      marginTop: "15px",
    },
    [theme.breakpoints.only("xl")]: {
      marginLeft: "20px",
      marginTop: "20px",
    },
  };

  const buttonStyles = {
    color: "black",
    [theme.breakpoints.only("xs")]: {
      // fontSize: "12px",
    },
    [theme.breakpoints.only("md")]: {
      // fontSize: "16px",
    },
    [theme.breakpoints.only("xl")]: {
      // fontSize: "20px",
    },
  };

  const isXs = useMediaQuery(theme.breakpoints.only("xs"));
  const isMd = useMediaQuery(theme.breakpoints.only("md"));
  const isXl = useMediaQuery(theme.breakpoints.only("xl"));

  // const socket = io.connect("http://localhost:4000", {
  //   withCredentials: true,
  // });

  //TRUE SOCKET USE THIS
  // const socket = io(REACT_APP_API, {
  //   transports: ["websocket"],
  //   withCredentials: true,
  // });

  // const socket = io("https://rcgi-backend.vercel.app", {
  //   transports: ["websocket"],
  //   withCredentials: true,
  // });

  // const socket = io("http://localhost:4000", {
  //   transports: ["websocket"],
  //   withCredentials: true,
  // });

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNotificationClick = (event) => {
    setNotificationAnchorEl(event.currentTarget);
    dispatch(markAllNotificationsAsRead());
  };

  const handleNotificationClose = () => {
    dispatch(getNotifications());
    setNotificationAnchorEl(null);
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

  useEffect(() => {
    dispatch(getNotifications());
  }, [dispatch]);

  // useEffect(() => {
  //   // console.log("Test")
  //   // socket.on("connection", () => {
  //   //   console.log("Connected to Socket io");
  //   // });
  //   socket.on("notification", () => {
  //     dispatch(getNotifications());
  //   });
  // }, [socket, dispatch]); TRUE SOCKET

  return (
    // <AppBar position="static" sx={{ backgroundColor: "white" }}>

    <AppBar
      sx={{
        backgroundColor: "white",
        [theme.breakpoints.only("xs")]: {
          position: "static",
        },
        [theme.breakpoints.only("md")]: {
          position: "fixed",
          height: 80,
          borderRadius: "20px",
          marginTop: "20px",
          width: "50%",
          left: "25%",
        },
        [theme.breakpoints.only("xl")]: {
          position: "fixed",
          height: 80,
          borderRadius: "20px",
          marginTop: "20px",
          width: "50%",
          left: "25%",
        },
      }}
    >
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
        {/* <Link
          to="/courses"
          // style={{
          //   textDecoration: "none",
          //   marginLeft: "10px",
          //   marginTop: "10px",
          // }}
          style={linkStyles}
        >
          <Button
            color="inherit"
            startIcon={<SchoolIcon />}
            // sx={{ color: "black" }}
            sx={buttonStyles}
          >
            Courses
          </Button>
        </Link>
        <Link to="/feedback" style={linkStyles}>
          <Button
            color="inherit"
            startIcon={<InsertCommentIcon />}
            sx={buttonStyles}
          >
            Feedback
          </Button>
        </Link> */}
        <Link to="/courses" style={linkStyles}>
          {isXs ? (
            <IconButton sx={{ color: "black" }}>
              <SchoolIcon />
            </IconButton>
          ) : (
            <Button
              color="inherit"
              startIcon={<SchoolIcon />}
              sx={buttonStyles}
            >
              Courses
            </Button>
          )}
        </Link>

        <Link to="/feedback" style={linkStyles}>
          {isXs ? (
            <IconButton sx={{ color: "black" }}>
              <InsertCommentIcon />
            </IconButton>
          ) : (
            <Button
              color="inherit"
              startIcon={<InsertCommentIcon />}
              sx={buttonStyles}
            >
              Feedback
            </Button>
          )}
        </Link>
        <div style={{ flexGrow: 1 }}></div>
        {user ? (
          <div>
            <IconButton
              aria-label="notifications"
              style={{
                marginTop: "10px",
                color: "black",
                cursor: "pointer",
              }}
              onClick={handleNotificationClick}
            >
              <Badge
                badgeContent={
                  notifications
                    ? notifications.filter(
                        (notification) => notification.status === "unread"
                      ).length
                    : 0
                }
                color="error"
              >
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <Popover
              open={notificationOpen}
              anchorEl={notificationAnchorEl}
              onClose={handleNotificationClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            >
              <Box style={{ width: 300 }}>
                {notifications && notifications.length > 0 ? (
                  <div style={{ maxHeight: 300, overflowY: "auto" }}>
                    <List>
                      <Typography
                        variant="subtitle1"
                        align="center"
                        style={{ fontWeight: "bold", marginBottom: "10px" }}
                      >
                        Latest Notifications
                      </Typography>
                      {notifications
                        .slice()
                        .sort(
                          (a, b) =>
                            new Date(b.createdAt) - new Date(a.createdAt)
                        )
                        .map((notification) => (
                          <ListItem
                            key={notification.id}
                            style={{ cursor: "pointer" }}
                          >
                            <Divider style={{ margin: "5px 0" }} />
                            <ListItemText
                              primary={
                                <>
                                  <span
                                    style={{ color: "black" }}
                                    onMouseEnter={(e) =>
                                      (e.target.style.color = "blue")
                                    }
                                    onMouseLeave={(e) =>
                                      (e.target.style.color = "black")
                                    }
                                    dangerouslySetInnerHTML={{
                                      __html: notification.message,
                                    }}
                                  />
                                  <span
                                    style={{
                                      marginLeft: "10px",
                                      fontSize: "10px",
                                    }}
                                  >
                                    {new Date(
                                      notification.createdAt
                                    ).toLocaleDateString()}
                                  </span>
                                </>
                              }
                            />
                          </ListItem>
                        ))}
                    </List>
                  </div>
                ) : (
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <Typography style={{ padding: "10px", color: "gray" }}>
                      Inbox is Empty
                    </Typography>
                  </div>
                )}
              </Box>
            </Popover>

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
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              keepMounted
              open={open}
              onClose={handleClose}
              style={{
                marginTop: "60px",
                textAlign: "center",
                // marginRight: "60px",
              }}
              PaperProps={{
                style: {
                  width: "200px",
                },
              }}
            >
              {user.role === "admin" && (
                <MenuItem
                  onClick={handleClose}
                  component={Link}
                  to="/dashboard"
                >
                  <ListItemIcon>
                    <DashboardIcon />
                  </ListItemIcon>
                  Dashboard
                </MenuItem>
              )}
              {/* <MenuItem
                  onClick={handleClose}
                  component={Link}
                  to="/enrollment/me"
                >
                  Enrollments
                </MenuItem> */}
              {!isAdmin && (
                <MenuItem
                  onClick={handleClose}
                  component={Link}
                  to="/enrollment/me"
                >
                  <ListItemIcon>
                    <LibraryBooksIcon />
                  </ListItemIcon>
                  Enrollments
                </MenuItem>
              )}
              <MenuItem onClick={handleClose} component={Link} to="/me">
                <ListItemIcon>
                  <AccountCircleIcon />
                </ListItemIcon>
                Profile
              </MenuItem>
              <Divider style={{ margin: "5px 0" }} />
              <MenuItem onClick={logoutHandler}>
                <ListItemIcon>
                  <Logout color="error" />
                </ListItemIcon>
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
  );
};

export default Header;
