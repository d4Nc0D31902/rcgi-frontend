import axios from "axios";

import {
  FORUM_DETAILS_REQUEST,
  FORUM_DETAILS_SUCCESS,
  FORUM_DETAILS_FAIL,
  ADMIN_FORUMS_REQUEST,
  ADMIN_FORUMS_SUCCESS,
  ADMIN_FORUMS_FAIL,
  NEW_FORUM_REQUEST,
  NEW_FORUM_SUCCESS,
  NEW_FORUM_FAIL,
  DELETE_FORUM_REQUEST,
  DELETE_FORUM_SUCCESS,
  DELETE_FORUM_FAIL,
  UPDATE_FORUM_REQUEST,
  UPDATE_FORUM_SUCCESS,
  UPDATE_FORUM_FAIL,
  CREATE_REPLY_REQUEST,
  CREATE_REPLY_SUCCESS,
  CREATE_REPLY_FAIL,
  UPDATE_REPLY_SUCCESS,
  UPDATE_REPLY_FAIL,
  UPDATE_REPLY_REQUEST,
  UPDATE_REPLY_RESET,
  DELETE_REPLY_FAIL,
  DELETE_REPLY_REQUEST,
  DELETE_REPLY_RESET,
  DELETE_REPLY_SUCCESS,
  CLEAR_ERRORS,
} from "../constants/forumConstants";

export const getForumDetails = (id) => async (dispatch) => {
  try {
    console.log("Dispatching FORUM_DETAILS_REQUEST for forum ID:", id);
    dispatch({ type: FORUM_DETAILS_REQUEST });

    const { data } = await axios.get(
      `${process.env.REACT_APP_API}/api/v1/forum/${id}`
    );
    console.log("Received data:", data);

    dispatch({
      type: FORUM_DETAILS_SUCCESS,
      payload: data, // Use 'data' directly as the payload
    });
    console.log("Dispatched FORUM_DETAILS_SUCCESS with payload:", data);
  } catch (error) {
    console.error("Error fetching forum details:", error);
    dispatch({
      type: FORUM_DETAILS_FAIL,
      payload: error.response.data.message,
    });
    console.log(
      "Dispatched FORUM_DETAILS_FAIL with message:",
      error.response.data.message
    );
  }
};

export const getForums = () => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_FORUMS_REQUEST });
    const { data } = await axios.get(
      `${process.env.REACT_APP_API}/api/v1/forums`,
      {
        withCredentials: true,
      }
    );
    dispatch({
      type: ADMIN_FORUMS_SUCCESS,
      payload: data.forums,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_FORUMS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const newForum = (forumData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_FORUM_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    const { data } = await axios.post(
      `${process.env.REACT_APP_API}/api/v1/forum/new`,
      forumData,
      config
    );
    console.log("Forum created successfully:", data);
    dispatch({
      type: NEW_FORUM_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.error("Error creating forum:", error);
    dispatch({
      type: NEW_FORUM_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const deleteForum = (id) => async (dispatch) => {
  try {
    console.log("Deleting forum with ID:", id);
    dispatch({ type: DELETE_FORUM_REQUEST });
    const { data } = await axios.delete(
      `${process.env.REACT_APP_API}/api/v1/admin/forum/${id}`,
      {
        withCredentials: true,
      }
    );
    dispatch({
      type: DELETE_FORUM_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    console.error("Error deleting forum:", error);
    dispatch({
      type: DELETE_FORUM_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const updateForum = (id, forumData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_FORUM_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    const { data } = await axios.put(
      `${process.env.REACT_APP_API}/api/v1/forum/${id}`,
      forumData,
      config
    );
    dispatch({
      type: UPDATE_FORUM_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_FORUM_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};

export const createReply = (forumId, replyData) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_REPLY_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    const { data } = await axios.post(
      `${process.env.REACT_APP_API}/api/v1/forum/${forumId}/reply`,
      replyData,
      config
    );
    dispatch({
      type: CREATE_REPLY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CREATE_REPLY_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const updateReply =
  (forumId, replyId, updatedReply) => async (dispatch) => {
    try {
      dispatch({ type: UPDATE_REPLY_REQUEST });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      };

      const { data } = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/forum/${forumId}/reply/${replyId}`,
        { reply: updatedReply },
        config
      );

      dispatch({
        type: UPDATE_REPLY_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: UPDATE_REPLY_FAIL,
        payload: error.response.data.message,
      });
    }
  };

export const deleteReply = (forumId, replyId) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_REPLY_REQUEST });

    const { data } = await axios.delete(
      `${process.env.REACT_APP_API}/api/v1/forum/${forumId}/reply/${replyId}`,
      {
        withCredentials: true,
      }
    );

    dispatch({
      type: DELETE_REPLY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DELETE_REPLY_FAIL,
      payload: error.response.data.message,
    });
  }
};
