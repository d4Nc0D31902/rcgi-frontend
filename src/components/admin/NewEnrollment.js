import React, { Fragment, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MetaData from "../layout/MetaData";
import Sidebar from "./Sidebar";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { createEnrollment, clearErrors } from "../../actions/enrollmentActions";
import { CREATE_ENROLLMENT_RESET } from "../../constants/enrollmentConstants";
import { FormControl, InputLabel } from "@mui/material";
import { allUsers } from "../../actions/userActions";
import { getCourses } from "../../actions/courseActions";
import axios from "axios";
import {
  Checkbox,
  TextField,
  Button,
  FormControlLabel,
  MenuItem,
  Select,
  Container,
  Grid,
  Paper,
  Typography,
} from "@mui/material";

const NewEnrollment = () => {
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [course, setCourse] = useState("");
  const [companyFilter, setCompanyFilter] = useState("All"); // Default value

  const [users, setUsers] = useState([]);
  const [allCompanies, setAllCompanies] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, success } = useSelector((state) => state.enrollment);
  const { courses, loading: coursesLoading } = useSelector(
    (state) => state.courses
  );
  const message = (message = "") =>
    toast.success(message, {
      position: toast.POSITION.BOTTOM_CENTER,
    });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API}/api/v1/admin/users`,
          { withCredentials: true }
        );
        const filteredUsers = response.data.users.filter(
          (user) => user.role !== "admin"
        );
        setUsers(filteredUsers);
        const companies = Array.from(
          new Set(filteredUsers.map((user) => user.company))
        );
        setAllCompanies(companies);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    if (error) {
      dispatch(clearErrors());
    }
    if (success) {
      navigate("/admin/enrollments");
      message("Enrollment created successfully");
      dispatch({ type: CREATE_ENROLLMENT_RESET });
    }
  }, [dispatch, error, success, navigate]);

  useEffect(() => {
    const fetchCoursesData = async () => {
      try {
        await dispatch(getCourses());
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCoursesData();
  }, [dispatch]);

  const handleCheckboxChange = (e) => {
    const userId = e.target.value;
    if (e.target.checked) {
      setSelectedUsers([...selectedUsers, userId]);
    } else {
      setSelectedUsers(selectedUsers.filter((id) => id !== userId));
    }
  };

  const handleCompanyFilterChange = (e) => {
    setCompanyFilter(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    selectedUsers.forEach((userId) => {
      const enrollmentData = { user: userId, course };
      dispatch(createEnrollment(enrollmentData));
    });
    message("Enrollment creation process initiated.");
    navigate("/admin/courses");
  };

  // Apply company filter
  const filteredUsers =
    companyFilter === "All"
      ? users
      : users.filter((user) => user.company === companyFilter);

  return (
    <Fragment>
      <MetaData title={"New Enrollment"} />
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item xs={12} md={2}>
            <Sidebar />
          </Grid>
          <Grid item xs={12} md={10}>
            <Paper elevation={3}>
              <Container maxWidth="md" style={{ padding: "20px 0" }}>
                <Typography
                  variant="h4"
                  align="center"
                  textAlign={"center"}
                  gutterBottom
                >
                  New Enrollment
                </Typography>
                <form onSubmit={submitHandler}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth>
                        <InputLabel id="company_filter_label">
                          Company
                        </InputLabel>
                        <Select
                          labelId="company_filter_label"
                          id="company_filter"
                          value={companyFilter}
                          onChange={handleCompanyFilterChange}
                        >
                          <MenuItem value="All">All</MenuItem>
                          {allCompanies.map((company) => (
                            <MenuItem key={company} value={company}>
                              {company}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth>
                        <InputLabel id="course_field_label">Courses</InputLabel>
                        <Select
                          labelId="course_field_label"
                          id="course_field"
                          value={course}
                          onChange={(e) => setCourse(e.target.value)}
                        >
                          <MenuItem value="">Select Course</MenuItem>
                          {coursesLoading ? (
                            <MenuItem disabled>Loading...</MenuItem>
                          ) : (
                            courses.map((course) => (
                              <MenuItem key={course._id} value={course._id}>
                                {course.title}
                              </MenuItem>
                            ))
                          )}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <div style={{ maxHeight: "200px", overflowY: "auto" }}>
                        <FormControl fullWidth>
                          {filteredUsers.map((user) => (
                            <FormControlLabel
                              key={user._id}
                              control={
                                <Checkbox
                                  id={user._id}
                                  value={user._id}
                                  onChange={handleCheckboxChange}
                                />
                              }
                              label={user.name}
                            />
                          ))}
                        </FormControl>
                      </div>
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        disabled={loading}
                      >
                        CREATE
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </Container>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Fragment>
  );
};

export default NewEnrollment;
