import axios from "axios";

import {
  QUIZ_DETAILS_REQUEST,
  QUIZ_DETAILS_SUCCESS,
  QUIZ_DETAILS_FAIL,
  ADMIN_QUIZZES_REQUEST,
  ADMIN_QUIZZES_SUCCESS,
  ADMIN_QUIZZES_FAIL,
  NEW_QUIZ_REQUEST,
  NEW_QUIZ_SUCCESS,
  NEW_QUIZ_FAIL,
  DELETE_QUIZ_REQUEST,
  DELETE_QUIZ_SUCCESS,
  DELETE_QUIZ_FAIL,
  UPDATE_QUIZ_REQUEST,
  UPDATE_QUIZ_SUCCESS,
  UPDATE_QUIZ_FAIL,
  CLEAR_ERRORS,
} from "../constants/quizConstants";

export const getQuizDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: QUIZ_DETAILS_REQUEST });
    const { data } = await axios.get(
      `${process.env.REACT_APP_API}/api/v1/quiz/${id}`
    );
    dispatch({
      type: QUIZ_DETAILS_SUCCESS,
      payload: data.quiz,
    });
  } catch (error) {
    dispatch({
      type: QUIZ_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getQuizzes = () => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_QUIZZES_REQUEST });
    const { data } = await axios.get(
      `${process.env.REACT_APP_API}/api/v1/admin/quizzes`,
      {
        withCredentials: true,
      }
    );
    dispatch({
      type: ADMIN_QUIZZES_SUCCESS,
      payload: data.quizzes,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_QUIZZES_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const newQuiz = (quizData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_QUIZ_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    const { data } = await axios.post(
      `${process.env.REACT_APP_API}/api/v1/admin/quiz/new`,
      quizData,
      config
    );
    dispatch({
      type: NEW_QUIZ_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NEW_QUIZ_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const deleteQuiz = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_QUIZ_REQUEST });
    const { data } = await axios.delete(
      `${process.env.REACT_APP_API}/api/v1/admin/quiz/${id}`,
      {
        withCredentials: true,
      }
    );
    dispatch({
      type: DELETE_QUIZ_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_QUIZ_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const updateQuiz = (id, quizData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_QUIZ_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    const { data } = await axios.put(
      `${process.env.REACT_APP_API}/api/v1/admin/quiz/${id}`,
      quizData,
      config
    );
    dispatch({
      type: UPDATE_QUIZ_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_QUIZ_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};

