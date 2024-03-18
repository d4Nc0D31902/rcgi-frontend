import axios from "axios";
import {
  CREATE_ENROLLMENT_REQUEST,
  CREATE_ENROLLMENT_SUCCESS,
  CREATE_ENROLLMENT_FAIL,
  MY_ENROLLMENTS_REQUEST,
  MY_ENROLLMENTS_SUCCESS,
  MY_ENROLLMENTS_FAIL,
  ENROLLMENT_DETAILS_REQUEST,
  ENROLLMENT_DETAILS_SUCCESS,
  ENROLLMENT_DETAILS_FAIL,
  ALL_ENROLLMENTS_REQUEST,
  ALL_ENROLLMENTS_SUCCESS,
  ALL_ENROLLMENTS_FAIL,
  UPDATE_ENROLLMENT_SUCCESS,
  UPDATE_ENROLLMENT_REQUEST,
  UPDATE_ENROLLMENT_FAIL,
  DELETE_ENROLLMENT_REQUEST,
  DELETE_ENROLLMENT_SUCCESS,
  DELETE_ENROLLMENT_FAIL,
  CLEAR_ERRORS,
} from "../constants/enrollmentConstants";

export const createEnrollment = (enrollment) => async (dispatch, getState) => {
  try {
    dispatch({ type: CREATE_ENROLLMENT_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    const { data } = await axios.post(
      `${process.env.REACT_APP_API}/api/v1/admin/enrollment/new`,
      enrollment,
      config
    );
    dispatch({
      type: CREATE_ENROLLMENT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CREATE_ENROLLMENT_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const myEnrollments = () => async (dispatch) => {
  try {
    dispatch({ type: MY_ENROLLMENTS_REQUEST });
    const { data } = await axios.get(
      `${process.env.REACT_APP_API}/api/v1/enrollment/me`,
      { withCredentials: true }
    );
    dispatch({
      type: MY_ENROLLMENTS_SUCCESS,
      payload: data.enrollments,
    });
  } catch (error) {
    dispatch({
      type: MY_ENROLLMENTS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getEnrollmentDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: ENROLLMENT_DETAILS_REQUEST });
    const { data } = await axios.get(
      `${process.env.REACT_APP_API}/api/v1/enrollment/${id}`,
      { withCredentials: true }
    );
    dispatch({
      type: ENROLLMENT_DETAILS_SUCCESS,
      payload: data.enrollment,
    });
  } catch (error) {
    dispatch({
      type: ENROLLMENT_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const allEnrollments = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_ENROLLMENTS_REQUEST });
    const { data } = await axios.get(
      `${process.env.REACT_APP_API}/api/v1/admin/enrollments`,
      {
        // AxiosRequestConfig parameter
        withCredentials: true, //correct
      }
    );
    dispatch({
      type: ALL_ENROLLMENTS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ALL_ENROLLMENTS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const updateEnrollment = (id, enrollmentData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_ENROLLMENT_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    const { data } = await axios.put(
      `${process.env.REACT_APP_API}/api/v1/admin/enrollment/${id}`,
      enrollmentData,
      config
    );
    dispatch({
      type: UPDATE_ENROLLMENT_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_ENROLLMENT_FAIL,
      payload: error.response.data.message,
    });
  }
};
export const deleteEnrollment = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_ENROLLMENT_REQUEST });
    const { data } = await axios.delete(
      `${process.env.REACT_APP_API}/api/v1/admin/enrollment/${id}`,
      { withCredentials: true }
    );
    dispatch({
      type: DELETE_ENROLLMENT_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_ENROLLMENT_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
