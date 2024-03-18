import axios from "axios";

import {
  CHAPTER_DETAILS_REQUEST,
  CHAPTER_DETAILS_SUCCESS,
  CHAPTER_DETAILS_FAIL,
  ADMIN_CHAPTERS_REQUEST,
  ADMIN_CHAPTERS_SUCCESS,
  ADMIN_CHAPTERS_FAIL,
  NEW_CHAPTER_REQUEST,
  NEW_CHAPTER_SUCCESS,
  NEW_CHAPTER_FAIL,
  DELETE_CHAPTER_REQUEST,
  DELETE_CHAPTER_SUCCESS,
  DELETE_CHAPTER_FAIL,
  UPDATE_CHAPTER_REQUEST,
  UPDATE_CHAPTER_SUCCESS,
  UPDATE_CHAPTER_FAIL,
  ADD_LESSON_REQUEST,
  ADD_LESSON_SUCCESS,
  ADD_LESSON_FAIL,
  ADD_QUIZ_REQUEST,
  ADD_QUIZ_SUCCESS, 
  ADD_QUIZ_FAIL, 
  CLEAR_ERRORS,
} from "../constants/chapterConstants";

export const getChapterDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: CHAPTER_DETAILS_REQUEST });
    const { data } = await axios.get(
      `${process.env.REACT_APP_API}/api/v1/chapter/${id}`
    );
    dispatch({
      type: CHAPTER_DETAILS_SUCCESS,
      payload: data.chapter,
    });
  } catch (error) {
    dispatch({
      type: CHAPTER_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getChapters = () => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_CHAPTERS_REQUEST });
    const { data } = await axios.get(
      `${process.env.REACT_APP_API}/api/v1/admin/chapters`,
      {
        withCredentials: true,
      }
    );
    dispatch({
      type: ADMIN_CHAPTERS_SUCCESS,
      payload: data.chapters,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_CHAPTERS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const newChapter = (chapterData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_CHAPTER_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true, //correct
    };
    const { data } = await axios.post(
      `${process.env.REACT_APP_API}/api/v1/admin/chapter/new`,
      chapterData,
      config
    );
    dispatch({
      type: NEW_CHAPTER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NEW_CHAPTER_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const deleteChapter = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_CHAPTER_REQUEST });
    const { data } = await axios.delete(
      `${process.env.REACT_APP_API}/api/v1/admin/chapter/${id}`,
      {
        withCredentials: true, //correct
      }
    );
    dispatch({
      type: DELETE_CHAPTER_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_CHAPTER_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const updateChapter = (id, chapterData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_CHAPTER_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    const { data } = await axios.put(
      `${process.env.REACT_APP_API}/api/v1/admin/chapter/${id}`,
      chapterData,
      config
    );
    dispatch({
      type: UPDATE_CHAPTER_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_CHAPTER_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const addLesson = (chapterId, lessonData) => async (dispatch) => {
  try {
    dispatch({ type: ADD_LESSON_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    const { data } = await axios.post(
      `${process.env.REACT_APP_API}/api/v1/admin/chapter/${chapterId}/lesson/new`,
      lessonData,
      config
    );
    dispatch({
      type: ADD_LESSON_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ADD_LESSON_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const addQuiz = (chapterId, quizData) => async (dispatch) => {
  try {
    dispatch({ type: ADD_QUIZ_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    const { data } = await axios.post(
      `${process.env.REACT_APP_API}/api/v1/admin/chapter/${chapterId}/quiz/new`,
      quizData,
      config
    );
    dispatch({
      type: ADD_QUIZ_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ADD_QUIZ_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
