import axios from "axios";

import {
  LESSON_DETAILS_REQUEST,
  LESSON_DETAILS_SUCCESS,
  LESSON_DETAILS_FAIL,
  ADMIN_LESSONS_REQUEST,
  ADMIN_LESSONS_SUCCESS,
  ADMIN_LESSONS_FAIL,
  NEW_LESSON_REQUEST,
  NEW_LESSON_SUCCESS,
  NEW_LESSON_FAIL,
  DELETE_LESSON_REQUEST,
  DELETE_LESSON_SUCCESS,
  DELETE_LESSON_FAIL,
  UPDATE_LESSON_REQUEST,
  UPDATE_LESSON_SUCCESS,
  UPDATE_LESSON_FAIL,
  MARK_LESSON_AS_DONE_REQUEST,
  MARK_LESSON_AS_DONE_SUCCESS,
  MARK_LESSON_AS_DONE_FAIL,
  CLEAR_ERRORS,
} from "../constants/lessonConstants";

export const getLessonDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: LESSON_DETAILS_REQUEST });
    const { data } = await axios.get(
      `${process.env.REACT_APP_API}/api/v1/lesson/${id}`
    );
    dispatch({
      type: LESSON_DETAILS_SUCCESS,
      payload: data.lesson,
    });
  } catch (error) {
    dispatch({
      type: LESSON_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getLessons = () => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_LESSONS_REQUEST });
    const { data } = await axios.get(
      `${process.env.REACT_APP_API}/api/v1/admin/lessons`,
      {
        withCredentials: true,
      }
    );
    dispatch({
      type: ADMIN_LESSONS_SUCCESS,
      payload: data.lessons,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_LESSONS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const newLesson = (lessonData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_LESSON_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    const { data } = await axios.post(
      `${process.env.REACT_APP_API}/api/v1/admin/lesson/new`,
      lessonData,
      config
    );
    dispatch({
      type: NEW_LESSON_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NEW_LESSON_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const deleteLesson = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_LESSON_REQUEST });
    const { data } = await axios.delete(
      `${process.env.REACT_APP_API}/api/v1/admin/lesson/${id}`,
      {
        withCredentials: true,
      }
    );
    dispatch({
      type: DELETE_LESSON_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_LESSON_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const updateLesson = (id, lessonData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_LESSON_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    const { data } = await axios.put(
      `${process.env.REACT_APP_API}/api/v1/admin/lesson/${id}`,
      lessonData,
      config
    );
    dispatch({
      type: UPDATE_LESSON_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_LESSON_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const markLessonAsDone = (id) => async (dispatch) => {
  try {
    dispatch({ type: MARK_LESSON_AS_DONE_REQUEST });
    const { data } = await axios.put(
      `${process.env.REACT_APP_API}/api/v1/admin/lesson/${id}/done`,
      null,
      {
        withCredentials: true,
      }
    );
    dispatch({
      type: MARK_LESSON_AS_DONE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: MARK_LESSON_AS_DONE_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
