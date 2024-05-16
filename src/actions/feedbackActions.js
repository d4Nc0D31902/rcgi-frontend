import axios from "axios";

import {
  FEEDBACK_DETAILS_REQUEST,
  FEEDBACK_DETAILS_SUCCESS,
  FEEDBACK_DETAILS_FAIL,
  ADMIN_FEEDBACKS_REQUEST,
  ADMIN_FEEDBACKS_SUCCESS,
  ADMIN_FEEDBACKS_FAIL,
  NEW_FEEDBACK_REQUEST,
  NEW_FEEDBACK_SUCCESS,
  NEW_FEEDBACK_FAIL,
  DELETE_FEEDBACK_REQUEST,
  DELETE_FEEDBACK_SUCCESS,
  DELETE_FEEDBACK_FAIL,
  UPDATE_FEEDBACK_REQUEST,
  UPDATE_FEEDBACK_SUCCESS,
  UPDATE_FEEDBACK_FAIL,
  CLEAR_ERRORS,
} from "../constants/feedbackConstants";

export const getFeedbackDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: FEEDBACK_DETAILS_REQUEST });
    const { data } = await axios.get(
      `${process.env.REACT_APP_API}/api/v1/feedback/${id}`
    );
    dispatch({
      type: FEEDBACK_DETAILS_SUCCESS,
      payload: data.feedback,
    });
  } catch (error) {
    dispatch({
      type: FEEDBACK_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getFeedbacks = () => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_FEEDBACKS_REQUEST });
    const { data } = await axios.get(
      `${process.env.REACT_APP_API}/api/v1/admin/feedbacks`,
      {
        withCredentials: true,
      }
    );
    dispatch({
      type: ADMIN_FEEDBACKS_SUCCESS,
      payload: data.feedbacks,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_FEEDBACKS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const newFeedback = (feedbackData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_FEEDBACK_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    const { data } = await axios.post(
      `${process.env.REACT_APP_API}/api/v1/feedback/new`,
      feedbackData,
      config
    );
    console.log("Feedback submitted successfully:", data);
    dispatch({
      type: NEW_FEEDBACK_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.error("Error submitting feedback:", error); 
    dispatch({
      type: NEW_FEEDBACK_FAIL,
      payload: error.response.data.message,
    });
  }
};
export const deleteFeedback = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_FEEDBACK_REQUEST });
    const { data } = await axios.delete(
      `${process.env.REACT_APP_API}/api/v1/admin/feedback/${id}`,
      {
        withCredentials: true,
      }
    );
    dispatch({
      type: DELETE_FEEDBACK_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_FEEDBACK_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const updateFeedback = (id, feedbackData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_FEEDBACK_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    const { data } = await axios.put(
      `${process.env.REACT_APP_API}/api/v1/admin/feedback/${id}`,
      feedbackData,
      config
    );
    dispatch({
      type: UPDATE_FEEDBACK_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_FEEDBACK_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
