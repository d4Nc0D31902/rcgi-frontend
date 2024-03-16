import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CardActions from "@mui/material/CardActions";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import PlayCircleOutlineOutlinedIcon from "@mui/icons-material/PlayCircleOutlineOutlined";

const CourseModuleCard = ({ module, isAdmin }) => {
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
          startIcon={<RemoveRedEyeOutlinedIcon />}
          variant="outlined"
          color="primary"
          size="small"
        >
          View
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
