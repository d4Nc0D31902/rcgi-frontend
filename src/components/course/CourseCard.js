import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { deleteCourse } from "../../actions/courseActions";
import { joinEnrollment, myEnrollments } from "../../actions/enrollmentActions";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import PlayCircleFilledWhiteOutlinedIcon from "@mui/icons-material/PlayCircleFilledWhiteOutlined";

const Course = ({ course }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { enrollments, loading: enrollmentsLoading } = useSelector(
    (state) => state.enrollment
  );

  const isAdmin = user && user.role === "admin";

  const [isEnrolled, setIsEnrolled] = useState(false);

  useEffect(() => {
    if (user) {
      dispatch(myEnrollments());
    }
  }, [dispatch, user]);

  useEffect(() => {
    if (user && enrollments) {
      const enrolledCourseIds = enrollments.map(
        (enrollment) => enrollment.courseId
      );
      setIsEnrolled(enrolledCourseIds.includes(course._id));
    }
  }, [enrollments, course, user]);

  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      try {
        await dispatch(deleteCourse(id));
        toast.success("Course deleted successfully!");
      } catch (error) {
        console.error("Error deleting course:", error);
        toast.error("Failed to delete course.");
      }
    }
  };
  // const startCourseHandler = () => {
  //   if (isEnrolled) {
  //     toast.info("You are already enrolled in this course.");
  //     return;
  //   }

  //   if (!user) {
  //     return;
  //   }

  //   if (!course) {
  //     console.error("Course is empty.");
  //     return;
  //   }

  //   const enrollment = {
  //     userId: user._id,
  //     courseId: course._id,
  //   };

  //   dispatch(joinEnrollment(enrollment))
  //     .then(() => {
  //       toast.success("Enrollment created successfully!");
  //     })
  //     .catch((error) => {
  //       console.error("Error creating enrollment:", error);
  //       toast.error("Failed to create enrollment.");
  //     });
  // };

  const startCourseHandler = () => {
    if (isEnrolled) {
      toast.info("You are already enrolled in this course.");
      return;
    }

    if (!user) {
      return;
    }

    if (!course) {
      console.error("Course is empty.");
      return;
    }

    const enrollment = {
      userId: user._id,
      courseId: course._id,
    };

    dispatch(joinEnrollment(enrollment))
      .then(() => {
        dispatch(myEnrollments());
        toast.success("Enrollment created successfully!");
      })
      .catch((error) => {
        console.error("Error creating enrollment:", error);
        toast.error("Failed to create enrollment.");
      });
  };

  return (
    <div className="col-sm-12 col-md-6 col-lg-3 my-3">
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          component="img"
          height="140"
          image={course.images[0].url}
          alt={course.title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {course.title}
          </Typography>
          <Typography gutterBottom variant="caption" component="div">
            {course.description}
          </Typography>
          <Link to="/enrollment/me" style={{ textDecoration: "none" }}>
            <Button
              variant="outlined"
              color="success"
              size="small"
              fullWidth
              startIcon={<PlayCircleFilledWhiteOutlinedIcon />}
              onClick={startCourseHandler}
              disabled={isEnrolled || enrollmentsLoading}
            >
              {isEnrolled ? "Enrolled" : "Start"}
            </Button>
          </Link>
          {isAdmin && (
            <>
              <Button
                component={Link}
                to={`/admin/courseDetails/${course._id}`}
                variant="outlined"
                size="small"
                fullWidth
                startIcon={<RemoveRedEyeOutlinedIcon />}
              >
                View Course
              </Button>
              <Button
                component={Link}
                to={`/admin/course/${course._id}`}
                variant="outlined"
                size="small"
                color="primary"
                startIcon={<EditOutlinedIcon />}
              >
                Edit
              </Button>
              <Button
                variant="outlined"
                size="small"
                color="error"
                startIcon={<DeleteOutlineOutlinedIcon />}
                onClick={() => deleteHandler(course._id)}
              >
                Delete
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Course;
