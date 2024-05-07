import axios from "axios";

import {
  COURSE_DETAILS_REQUEST,
  COURSE_DETAILS_SUCCESS,
  COURSE_DETAILS_FAIL,
  ADMIN_COURSES_REQUEST,
  ADMIN_COURSES_SUCCESS,
  ADMIN_COURSES_FAIL,
  NEW_COURSE_REQUEST,
  NEW_COURSE_SUCCESS,
  NEW_COURSE_FAIL,
  DELETE_COURSE_REQUEST,
  DELETE_COURSE_SUCCESS,
  DELETE_COURSE_FAIL,
  UPDATE_COURSE_REQUEST,
  UPDATE_COURSE_SUCCESS,
  UPDATE_COURSE_FAIL,
  ADD_MODULE_REQUEST,
  ADD_MODULE_SUCCESS,
  ADD_MODULE_FAIL,
  DEACTIVATE_COURSE_FAIL,
  DEACTIVATE_COURSE_REQUEST,
  DEACTIVATE_COURSE_RESET,
  DEACTIVATE_COURSE_SUCCESS,
  REACTIVATE_COURSE_FAIL,
  REACTIVATE_COURSE_REQUEST,
  REACTIVATE_COURSE_RESET,
  REACTIVATE_COURSE_SUCCESS,
  CLEAR_ERRORS,
} from "../constants/courseConstants";

export const getCourseDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: COURSE_DETAILS_REQUEST });
    const { data } = await axios.get(
      `${process.env.REACT_APP_API}/api/v1/course/${id}`
    );
    dispatch({
      type: COURSE_DETAILS_SUCCESS,
      payload: data.course,
    });
  } catch (error) {
    dispatch({
      type: COURSE_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getCourses = () => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_COURSES_REQUEST });
    const { data } = await axios.get(
      `${process.env.REACT_APP_API}/api/v1/admin/courses`,
      {
        withCredentials: true,
      }
    );
    dispatch({
      type: ADMIN_COURSES_SUCCESS,
      payload: data.courses,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_COURSES_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const newCourse = (courseData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_COURSE_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    const { data } = await axios.post(
      `${process.env.REACT_APP_API}/api/v1/admin/course/new`,
      courseData,
      config
    );
    dispatch({
      type: NEW_COURSE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NEW_COURSE_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const deleteCourse = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_COURSE_REQUEST });
    const { data } = await axios.delete(
      `${process.env.REACT_APP_API}/api/v1/admin/course/${id}`,
      {
        withCredentials: true,
      }
    );
    dispatch({
      type: DELETE_COURSE_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_COURSE_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const updateCourse = (id, courseData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_COURSE_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    const { data } = await axios.put(
      `${process.env.REACT_APP_API}/api/v1/admin/course/${id}`,
      courseData,
      config
    );
    dispatch({
      type: UPDATE_COURSE_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_COURSE_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Action creator for adding modules
export const addModule = (courseId, moduleData) => async (dispatch) => {
  try {
    dispatch({ type: ADD_MODULE_REQUEST });
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    };
    const { data } = await axios.post(
      `${process.env.REACT_APP_API}/api/v1/admin/course/${courseId}/module`,
      moduleData,
      config
    );
    dispatch({
      type: ADD_MODULE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ADD_MODULE_FAIL,
      payload: error.response.data.error,
    });
  }
};

export const deactivateCourse = (id) => async (dispatch) => {
  try {
    dispatch({ type: DEACTIVATE_COURSE_REQUEST });
    const { data } = await axios.put(
      `${process.env.REACT_APP_API}/api/v1/admin/course/deactivate/${id}`,
      null,
      { withCredentials: true }
    );
    dispatch({
      type: DEACTIVATE_COURSE_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DEACTIVATE_COURSE_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const reactivateCourse = (id) => async (dispatch) => {
  try {
    dispatch({ type: REACTIVATE_COURSE_REQUEST });
    const { data } = await axios.put(
      `${process.env.REACT_APP_API}/api/v1/admin/course/reactivate/${id}`,
      null,
      { withCredentials: true }
    );
    dispatch({
      type: REACTIVATE_COURSE_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: REACTIVATE_COURSE_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
