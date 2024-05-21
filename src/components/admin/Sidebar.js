import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ListItemButton from "@mui/material/ListItemButton";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import SchoolIcon from "@mui/icons-material/School";
import AssignmentIcon from "@mui/icons-material/Assignment";
import MenuIcon from "@mui/icons-material/Menu";
import { IconButton, Divider } from "@mui/material";
import TableChartIcon from "@mui/icons-material/TableChart";
import FileUploadIcon from '@mui/icons-material/FileUpload';
const Sidebar = () => {
  const [openCourses, setOpenCourses] = useState(false);
  const [openUsers, setOpenUsers] = useState(false);
  const [openQuizzes, setOpenQuizzes] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const location = useLocation();

  const handleCoursesClick = () => {
    setOpenCourses(!openCourses);
  };

  const handleUsersClick = () => {
    setOpenUsers(!openUsers);
  };

  const handleQuizzesClick = () => {
    setOpenQuizzes(!openQuizzes);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <>
      <IconButton onClick={() => setOpenDrawer(!openDrawer)}>
        <MenuIcon />
      </IconButton>
      <SwipeableDrawer
        anchor="left"
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        onOpen={() => setOpenDrawer(true)}
        sx={{
          width: 240,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: 240,
          },
        }}
      >
        <List>
          <img
            src="/images/rcgi.jpg"
            alt="RCGI Logo"
            style={{
              width: "50%",
              marginLeft: "50px",
              marginBottom: "20px",
              marginTop: "20px",
            }}
          />
          <Divider sx={{ marginBottom: "20px" }} />

          <ListItem
            component={Link}
            to="/dashboard"
            button
            selected={isActive("/dashboard")}
          >
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>

          {/* <ListItem
            component={Link}
            to="/admin/users"
            button
            selected={isActive("/admin/users")} 
          >
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Users" />
          </ListItem> */}
          <ListItem
            button
            onClick={handleUsersClick}
            component="div"
            // selected={isActive("/admin/users") || isActive("/admin/users")}
          >
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Users" />
            {openUsers ? <ExpandLess /> : <ExpandMore />}
          </ListItem>

          <Collapse in={openUsers} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem
                sx={{ marginLeft: "20px" }}
                component={Link}
                to="/admin/users"
                button
                selected={isActive("/admin/users")}
              >
                <ListItemIcon>
                  <TableChartIcon />
                </ListItemIcon>
                <ListItemText primary="All Users" />
              </ListItem>
              <ListItem
                sx={{ marginLeft: "20px" }}
                component={Link}
                to="/import/user"
                button
                selected={isActive("/import/user")}
              >
                <ListItemIcon>
                  <FileUploadIcon />
                </ListItemIcon>
                <ListItemText primary="Import" />
              </ListItem>
            </List>
          </Collapse>

          <ListItem
            component={Link}
            to="/admin/enrollments"
            button
            selected={isActive("/admin/enrollments")}
          >
            <ListItemIcon>
              <SchoolIcon />
            </ListItemIcon>
            <ListItemText primary="Enrollments" />
          </ListItem>

          <ListItem
            button
            onClick={handleCoursesClick}
            component="div"
            // selected={isActive("/admin/courses") || isActive("/admin/course")}
          >
            <ListItemIcon>
              <LibraryBooksIcon />
            </ListItemIcon>
            <ListItemText primary="Courses" />
            {openCourses ? <ExpandLess /> : <ExpandMore />}
          </ListItem>

          <Collapse in={openCourses} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem
                sx={{ marginLeft: "20px" }}
                component={Link}
                to="/admin/courses"
                button
                selected={isActive("/admin/courses")}
              >
                <ListItemIcon>
                  <LibraryBooksIcon />
                </ListItemIcon>
                <ListItemText primary="All Courses" />
              </ListItem>
              <ListItem
                sx={{ marginLeft: "20px" }}
                component={Link}
                to="/admin/course"
                button
                selected={isActive("/admin/course")}
              >
                <ListItemIcon>
                  <AssignmentIcon />
                </ListItemIcon>
                <ListItemText primary="Create" />
              </ListItem>
            </List>
          </Collapse>

          <ListItem
            button
            onClick={handleQuizzesClick}
            component="div"
            // selected={isActive("/admin/quizzes") || isActive("/admin/retake")}
          >
            <ListItemIcon>
              <LibraryBooksIcon />
            </ListItemIcon>
            <ListItemText primary="Quizzes" />
            {openQuizzes ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={openQuizzes} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem
                sx={{ marginLeft: "20px" }}
                component={Link}
                to="/admin/quizzes"
                button
                selected={isActive("/admin/quizzes")}
              >
                <ListItemIcon>
                  <LibraryBooksIcon />
                </ListItemIcon>
                <ListItemText primary="Results" />
              </ListItem>
              <ListItem
                sx={{ marginLeft: "20px" }}
                component={Link}
                to="/admin/retake"
                button
                selected={isActive("/admin/retake")}
              >
                <ListItemIcon>
                  <LibraryBooksIcon />
                </ListItemIcon>
                <ListItemText primary="Retakes" />
              </ListItem>
            </List>
          </Collapse>
        </List>
      </SwipeableDrawer>
    </>
  );
};

export default Sidebar;
