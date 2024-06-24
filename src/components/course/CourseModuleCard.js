import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteModule, getModuleDetails } from "../../actions/moduleActions";
import { toast } from "react-toastify";
import { Button } from "@mui/material";
import "react-toastify/dist/ReactToastify.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CardActions from "@mui/material/CardActions";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

const CourseModuleCard = ({ module }) => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const isAdmin = user && user.role === "admin";

  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this module?")) {
      dispatch(deleteModule(module._id))
        .then(() => {
          dispatch(getModuleDetails(module._id));
          toast.success("Module deleted successfully!");
        })
        .catch((error) => {
          console.error("Error deleting module:", error);
          toast.error("Failed to delete module.");
        });
    }
  };

  return (
    <Card sx={{ maxWidth: 345 }} style={{ marginBottom: "50px" }} elevation={6}>
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
        <Typography gutterBottom variant="body2" component="div">
          {expanded
            ? module.description
            : `${module.description.slice(0, 350)}...`}
          {!expanded && (
            <Button onClick={toggleExpanded} color="primary" size="small">
              See More
            </Button>
          )}
          {expanded && (
            <Button onClick={toggleExpanded} color="primary" size="small">
              See Less
            </Button>
          )}
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
          fullWidth
        >
          View
        </Button>
        {isAdmin && (
          <IconButton
            component={Link}
            to={`/admin/module/${module._id}`}
            color="primary"
            size="small"
          >
            <EditOutlinedIcon />
          </IconButton>
        )}
        {isAdmin && (
          <IconButton color="error" size="small" onClick={handleDelete}>
            <DeleteOutlineOutlinedIcon />
          </IconButton>
        )}
      </CardActions>
    </Card>
  );
};

export default CourseModuleCard;
