import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Button, Divider, Paper, Typography } from "@mui/material";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import SendIcon from "@mui/icons-material/Send";
import { getForumDetails } from "../../actions/forumActions";
import { createReply } from "../../actions/enrollmentActions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EnrollmentForum = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [text, setText] = useState("");

  const forumDetails = useSelector((state) => state.forumDetails);
  const { loading, error, forum } = forumDetails;

  useEffect(() => {
    dispatch(getForumDetails(id));
  }, [dispatch, id]);

  const handleSend = () => {
    const replyData = {
      forumId: id,
      reply: text,
    };
    dispatch(createReply(replyData, forum._id));
    setText("");
    navigate(`/forumDetails/${forum._id}`);
    toast.success("Reply sent successfully!"); 
  };

  return (
    <>
      <ToastContainer />
      <Box
        sx={{
          height: "100vh",
          padding: "20px",
          border: "2px solid black",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Paper
          elevation={6}
          sx={{ height: "100%", width: "50%", padding: "20px" }}
        >
          {loading ? (
            <Typography variant="h4" textAlign={"center"}>
              Loading...
            </Typography>
          ) : error ? (
            <Typography variant="h4" textAlign={"center"} color="error">
              {error}
            </Typography>
          ) : (
            <>
              <Typography variant="h4" textAlign={"center"}>
                {forum?.title}
              </Typography>
              <Divider sx={{ margin: "20px" }} />
              <Typography
                variant="subtitle"
                textAlign={"center"}
                dangerouslySetInnerHTML={{ __html: forum?.body }}
              ></Typography>
              <Divider sx={{ margin: "20px" }} />
            </>
          )}

          <ReactQuill value={text} onChange={setText} />

          <Box sx={{ display: "flex", justifyContent: "right" }}>
            <Button
              variant="contained"
              color="success"
              endIcon={<SendIcon />}
              sx={{ marginTop: "20px" }}
              onClick={handleSend}
            >
              Send
            </Button>
          </Box>
        </Paper>
      </Box>
    </>
  );
};

export default EnrollmentForum;
