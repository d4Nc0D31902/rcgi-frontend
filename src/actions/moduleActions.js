import axios from "axios";

import {
  MODULE_DETAILS_REQUEST,
  MODULE_DETAILS_SUCCESS,
  MODULE_DETAILS_FAIL,
  ADMIN_MODULES_REQUEST,
  ADMIN_MODULES_SUCCESS,
  ADMIN_MODULES_FAIL,
  NEW_MODULE_REQUEST,
  NEW_MODULE_SUCCESS,
  NEW_MODULE_FAIL,
  DELETE_MODULE_REQUEST,
  DELETE_MODULE_SUCCESS,
  DELETE_MODULE_FAIL,
  UPDATE_MODULE_REQUEST,
  UPDATE_MODULE_SUCCESS,
  UPDATE_MODULE_FAIL,
  CLEAR_ERRORS,
} from "../constants/moduleConstants";

export const getModuleDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: MODULE_DETAILS_REQUEST });
    const { data } = await axios.get(
      `${process.env.REACT_APP_API}/api/v1/module/${id}`
    );
    dispatch({
      type: MODULE_DETAILS_SUCCESS,
      payload: data.module,
    });
  } catch (error) {
    dispatch({
      type: MODULE_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getModules = () => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_MODULES_REQUEST });
    const { data } = await axios.get(
      `${process.env.REACT_APP_API}/api/v1/admin/modules`,
      {
        withCredentials: true,
      }
    );
    dispatch({
      type: ADMIN_MODULES_SUCCESS,
      payload: data.modules,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_MODULES_FAIL,
      payload: error.response.data.message,
    });
  }
};
export const newModule = (moduleData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_MODULE_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true, //correct
    };
    const { data } = await axios.post(
      `${process.env.REACT_APP_API}/api/v1/admin/module/new`,
      moduleData,
      config
    );
    dispatch({
      type: NEW_MODULE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NEW_MODULE_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const deleteModule = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_MODULE_REQUEST });
    const { data } = await axios.delete(
      `${process.env.REACT_APP_API}/api/v1/admin/module/${id}`,
      {
        withCredentials: true, //correct
      }
    );
    dispatch({
      type: DELETE_MODULE_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_MODULE_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const updateModule = (id, moduleData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_MODULE_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    const { data } = await axios.put(
      `${process.env.REACT_APP_API}/api/v1/admin/module/${id}`,
      moduleData,
      config
    );
    dispatch({
      type: UPDATE_MODULE_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_MODULE_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
