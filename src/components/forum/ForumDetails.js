import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getForumDetails, deleteReply } from "../../actions/forumActions";
import {
  Container,
  Box,
  Paper,
  Stack,
  Card,
  CardHeader,
  Avatar,
  IconButton,
  Checkbox,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Collapse,
  Popover,
  MenuItem,
  ListItemIcon,
  Divider,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const ForumDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const isAdmin = user && user.role === "admin";

  useEffect(() => {
    dispatch(getForumDetails(id));
  }, [dispatch, id]);

  const { forum } = useSelector((state) => state.forumDetails);

  const [isChecked, setIsChecked] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [deleteReplyId, setDeleteReplyId] = useState(null);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const errMsg = (message = "") =>
    toast.error(message, {
      position: toast.POSITION.BOTTOM_CENTER,
    });

  const successMsg = (message = "") =>
    toast.success(message, {
      position: toast.POSITION.BOTTOM_CENTER,
    });

  const handleDelete = async (replyId) => {
    try {
      setDeleteReplyId(replyId);
      await dispatch(deleteReply(id, replyId));
      dispatch(getForumDetails(id));
      successMsg("Reply Deleted successfully");
    } catch (error) {
      errMsg("There is an Error");
    } finally {
      handlePopoverClose();
    }
  };

  const open = Boolean(anchorEl);

  return (
    <Box
      sx={{
        height: "100vh",
        marginLeft: "20px",
        marginRight: "20px",
      }}
      mt={15}
    >
      <Stack
        spacing={2}
        direction={"row"}
        alignItems={"flex-start"}
        justifyContent={"space-around"}
        p={2}
      >
        <Paper
          sx={{
            width: "50%",
            height: "50%",
            padding: "20px",
            textAlign: "center",
          }}
          elevation={6}
        >
          {forum && (
            <>
              <Typography variant="h4">{forum.title}</Typography>
              <Typography
                variant="subtitle1"
                dangerouslySetInnerHTML={{ __html: forum.body }}
              />
            </>
          )}
        </Paper>
        <Box sx={{ width: "100%", height: "100%" }}>
          <Stack
            justifyContent={"center"}
            alignItems={"center"}
            direction={"column"}
            spacing={2}
          >
            {forum && forum.reply && forum.reply.length > 0 ? (
              forum.reply.map((reply) => (
                <Card key={reply._id} sx={{ width: "100%" }} elevation={6}>
                  <CardHeader
                    avatar={
                      <Avatar
                        aria-label="user"
                        alt={reply.user.name}
                        src={reply.user.avatar && reply.user.avatar.url}
                      >
                        {reply.user.avatar.url.charAt(0)}
                      </Avatar>
                    }
                    action={
                      (isAdmin || (user && reply.user._id === user._id)) && (
                        <IconButton
                          aria-label="settings"
                          onClick={handlePopoverOpen}
                        >
                          <MoreVertIcon />
                        </IconButton>
                      )
                    }
                    title={reply.user.name}
                    subheader={new Date(reply.createdAt).toLocaleString()}
                  />
                  <Popover
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handlePopoverClose}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "left",
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                  >
                    <MenuItem
                      to={`/forum/${id}/reply/${reply._id}`}
                      component={Link}
                      onClick={handlePopoverClose}
                    >
                      <ListItemIcon>
                        <EditIcon fontSize="small" color="primary" />
                      </ListItemIcon>
                      Edit
                    </MenuItem>
                    <Divider />
                    <MenuItem onClick={() => handleDelete(reply._id)}>
                      <ListItemIcon>
                        <DeleteIcon fontSize="small" color="error" />
                      </ListItemIcon>
                      Delete
                    </MenuItem>
                  </Popover>
                  <CardContent>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      dangerouslySetInnerHTML={{ __html: reply.reply }}
                    ></Typography>
                  </CardContent>
                  <CardActions disableSpacing>
                    <Checkbox
                      checked={isChecked}
                      onChange={handleCheckboxChange}
                      icon={<FavoriteIcon />}
                      checkedIcon={<FavoriteIcon style={{ color: "red" }} />}
                    />
                  </CardActions>
                </Card>
              ))
            ) : (
              <Typography variant="body1">No Replies Yet</Typography>
            )}
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
};

export default ForumDetails;
