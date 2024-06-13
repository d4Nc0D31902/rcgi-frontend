import React, { Fragment, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MetaData from "../layout/MetaData";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
  getForumDetails,
  updateReply,
  clearErrors,
} from "../../actions/forumActions";
import { UPDATE_REPLY_RESET } from "../../constants/forumConstants";
import CachedOutlinedIcon from "@mui/icons-material/CachedOutlined";
import {
  TextField,
  Button,
  Typography,
  Grid,
  Paper,
  Stack,
  Box,
  useTheme,
} from "@mui/material";

const UpdateReply = () => {
  const [reply, setReply] = useState("");
  const theme = useTheme();

  const dispatch = useDispatch();
  const { error, forum } = useSelector((state) => state.forumDetails);
  const {
    loading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.forum);
  const { forumId, replyId } = useParams();
  const navigate = useNavigate();

  const errMsg = (message = "") =>
    toast.error(message, {
      position: toast.POSITION.BOTTOM_CENTER,
    });

  const successMsg = (message = "") =>
    toast.success(message, {
      position: toast.POSITION.BOTTOM_CENTER,
    });

  useEffect(() => {
    if (forum && forum._id !== forumId) {
      dispatch(getForumDetails(forumId));
    } else {
      const reply = forum.reply.find((r) => r._id === replyId);
      setReply(reply ? reply.reply : "");
    }
    if (error) {
      errMsg(error);
      dispatch(clearErrors());
    }
    if (updateError) {
      errMsg(updateError);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      navigate(-1);
      successMsg("Reply updated successfully");
      dispatch({ type: UPDATE_REPLY_RESET });
    }
  }, [
    dispatch,
    error,
    isUpdated,
    navigate,
    updateError,
    forum,
    forumId,
    replyId,
  ]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await dispatch(updateReply(forumId, replyId, reply));
      navigate(-1);
      successMsg("Reply updated successfully");
    } catch (error) {
      errMsg("There is an Error");
    }
  };

  return (
    <Stack
      // sx={{
      //   height: "100vh",
      //   marginTop: "100px",
      //   padding: "20px",
      // }}
      sx={{
        [theme.breakpoints.only("xs")]: { height: "100vh" },
        [theme.breakpoints.only("sm")]: { height: "100vh" },
        [theme.breakpoints.only("md")]: {
          height: "100vh",
          marginTop: "120px",
        },
        [theme.breakpoints.only("lg")]: {
          height: "100vh",
          marginTop: "120px",
        },
        [theme.breakpoints.only("xl")]: {
          height: "100vh",
          marginTop: "100px",
          padding: "20px",
        },
      }}
      alignItems={"center"}
    >
      <MetaData title={"Update Reply"} />
      <Paper
        elevation={3}
        // sx={{
        //   height: "60%",
        //   borderRadius: "20px",
        //   width: "50%",
        //   padding: "20px",
        // }}
        sx={{
          [theme.breakpoints.only("xs")]: {
            height: "80%",
            padding: "10px",
          },
          [theme.breakpoints.only("sm")]: { height: "80%", padding: "10px" },
          [theme.breakpoints.only("md")]: {
            height: "80%",
            padding: "10px",
          },
          [theme.breakpoints.only("lg")]: {
            height: "80%",
            padding: "20px",
            borderRadius: "20px",
          },
          [theme.breakpoints.only("xl")]: {
            height: "60%",
            borderRadius: "20px",
            width: "50%",
            padding: "20px",
          },
        }}
      >
        <Stack flexDirection={"column"} sx={{ height: "100%" }}>
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            textAlign={"center"}
          >
            Update Reply
          </Typography>
          <form onSubmit={submitHandler} encType="multipart/form-data">
            <Box
              // sx={{
              //   height: "100%",
              //   // border: "2px solid black",
              //   marginBottom: "70px",
              // }}
              sx={{
                [theme.breakpoints.only("xs")]: {
                  marginBottom: "20px",
                },
                [theme.breakpoints.only("sm")]: {
                  marginBottom: "20px",
                },
                [theme.breakpoints.only("md")]: {
                  marginBottom: "20px",
                },
                [theme.breakpoints.only("lg")]: {
                  marginBottom: "20px",
                },
                [theme.breakpoints.only("xl")]: {
                  marginBottom: "20px",
                },
              }}
            >
              <ReactQuill
                id="reply_field"
                theme="snow"
                value={reply}
                onChange={(value) => setReply(value)}
                modules={{
                  toolbar: [
                    [{ header: [1, 2, 3, 4, 5, false] }],
                    [{ size: [] }],
                    ["bold", "italic", "underline", "strike", "blockquote"],
                    [
                      { list: "ordered" },
                      { list: "bullet" },
                      { indent: "-1" },
                      { indent: "+1" },
                    ],
                    ["link", "image"],
                    [{ script: "sub" }, { script: "super" }],
                    [{ color: [] }, { background: [] }],
                    [{ align: [] }],
                    ["code-block"],
                    ["formula"],
                    ["clean"],
                  ],
                  clipboard: {
                    matchVisual: false,
                  },
                }}
                formats={[
                  "header",
                  "font",
                  "size",
                  "bold",
                  "italic",
                  "underline",
                  "strike",
                  "blockquote",
                  "list",
                  "bullet",
                  "indent",
                  "link",
                  "image",
                  "script",
                  "color",
                  "background",
                  "align",
                  "code-block",
                  "formula",
                ]}
              />
            </Box>

            <Box
              // sx={{
              //   // border: "2px solid black",
              //   textAlign: "right",
              //   marginTop: "100px",
              // }}
              sx={{
                [theme.breakpoints.only("xs")]: {
                  textAlign: "right",
                },
                [theme.breakpoints.only("sm")]: {
                  textAlign: "right",
                },
                [theme.breakpoints.only("md")]: {
                  textAlign: "right",
                },
                [theme.breakpoints.only("lg")]: {
                  textAlign: "right",
                },
                [theme.breakpoints.only("xl")]: {
                  textAlign: "right",
                },
              }}
            >
              <Button
                sx={{ borderRadius: "50px" }}
                type="submit"
                variant="contained"
                color="success"
                disabled={loading ? true : false}
                startIcon={<CachedOutlinedIcon />}
              >
                UPDATE
              </Button>
            </Box>
          </form>
        </Stack>
      </Paper>
    </Stack>
  );
};

export default UpdateReply;
