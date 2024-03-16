import React, { Fragment, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../layout/Loader";
import { useDispatch } from "react-redux";
import { deleteModule } from "../../actions/moduleActions";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CardActions from "@mui/material/CardActions";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import PlayCircleOutlineOutlinedIcon from "@mui/icons-material/PlayCircleOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

const CourseModuleCard = ({ module, isAdmin }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this module?")) {
      dispatch(deleteModule(module._id))
        .then(() => {
          toast.success("Module deleted successfully!");
        })
        .catch((error) => {
          console.error("Error deleting module:", error);
          toast.error("Failed to delete module.");
        });
    }
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      {module.images && module.images.length > 0 && (
        <CardMedia
          sx={{ height: 140 }}
          image={module.images[0].url}
          title={module.title}
        />
      )}
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {module.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {module.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          component={Link}
          to={`/admin/moduleDetails/${module._id}`}
          startIcon={<RemoveRedEyeOutlinedIcon />}
          variant="outlined"
          color="primary"
          size="small"
        >
          View
        </Button>
        <Button
          component={Link}
          to={`/admin/module/${module._id}`}
          startIcon={<EditOutlinedIcon />}
          variant="outlined"
          color="primary"
          size="small"
        >
          Edit
        </Button>
        <Button
          startIcon={<DeleteOutlineOutlinedIcon />}
          variant="outlined"
          color="error"
          size="small"
          onClick={handleDelete} // Call handleDelete function when delete button is clicked
        >
          Delete
        </Button>
        {isAdmin && (
          <Button
            startIcon={<PlayCircleOutlineOutlinedIcon />}
            variant="outlined"
            color="success"
            size="small"
          >
            Start
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default CourseModuleCard;
