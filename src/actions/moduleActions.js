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
  ADD_CHAPTER_REQUEST,
  ADD_CHAPTER_SUCCESS,
  ADD_CHAPTER_FAIL,
  NEW_FORUM_REQUEST,
  NEW_FORUM_SUCCESS,
  NEW_FORUM_FAIL,
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

export const addChapter = (moduleId, chapterData) => async (dispatch) => {
  try {
    dispatch({ type: ADD_CHAPTER_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    const { data } = await axios.post(
      `${process.env.REACT_APP_API}/api/v1/admin/module/${moduleId}/chapter/new`,
      chapterData,
      config
    );
    dispatch({
      type: ADD_CHAPTER_SUCCESS,
      payload: data.chapter,
    });
  } catch (error) {
    dispatch({
      type: ADD_CHAPTER_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};

export const addForum = (moduleId, forumData) => async (dispatch) => {
  try {
    console.log("Adding forum:", forumData); // Logging forumData before dispatching the action
    dispatch({ type: NEW_FORUM_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    const { data } = await axios.post(
      `${process.env.REACT_APP_API}/api/v1/admin/module/${moduleId}/forum/new`,
      forumData,
      config
    );
    dispatch({
      type: NEW_FORUM_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.error("Error adding forum:", error); // Logging error if there's an exception
    dispatch({
      type: NEW_FORUM_FAIL,
      payload: error.response.data.message,
    });
  }
};
