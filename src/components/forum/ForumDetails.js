import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getForumDetails } from "../../actions/forumActions";
import {
  Container,
  Box,
  Paper,
  Stack,
  Card,
  CardHeader,
  Avatar,
  IconButton,
  Checkbox, // Import Checkbox component
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Collapse,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";

const ForumDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getForumDetails(id));
  }, [dispatch, id]);

  const { forum } = useSelector((state) => state.forumDetails);

  const [isChecked, setIsChecked] = useState(false); // State to manage checkbox

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked); // Toggle checkbox state
  };

  return (
    <Box
      sx={{
        // border: "2px solid black",
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
                      <IconButton aria-label="settings">
                        <MoreVertIcon />
                      </IconButton>
                    }
                    title={reply.user.name}
                    subheader={new Date(reply.createdAt).toLocaleString()}
                  />
                  <CardContent>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      dangerouslySetInnerHTML={{ __html: reply.reply }}
                    ></Typography>
                  </CardContent>
                  <CardActions disableSpacing>
                    {/* Use Checkbox component */}
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
