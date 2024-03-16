import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
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
import { toast } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css"; 

const Course = ({ course }) => {
  const dispatch = useDispatch();

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
          <Button
            component={Link}
            to={`/admin/courseDetails/${course._id}`}
            variant="contained"
            size="small"
            fullWidth
          >
            View Course
          </Button>
          <Button
            component={Link}
            to={`/admin/courseDetails/${course._id}`}
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
        </CardContent>
      </Card>
    </div>
  );
};

export default Course;
