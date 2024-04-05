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
  JOIN_ENROLLMENT_REQUEST,
  JOIN_ENROLLMENT_SUCCESS,
  JOIN_ENROLLMENT_FAIL,
  GET_ENROLLMENT_MODULE_REQUEST,
  GET_ENROLLMENT_MODULE_SUCCESS,
  GET_ENROLLMENT_MODULE_FAIL,
  GET_ENROLLMENT_CHAPTER_REQUEST,
  GET_ENROLLMENT_CHAPTER_SUCCESS,
  GET_ENROLLMENT_CHAPTER_FAIL,
  GET_SINGLE_LESSON_REQUEST,
  GET_SINGLE_LESSON_SUCCESS,
  GET_SINGLE_LESSON_FAIL,
  GET_SINGLE_QUIZ_REQUEST,
  GET_SINGLE_QUIZ_SUCCESS,
  GET_SINGLE_QUIZ_FAIL,
  MARK_CHAPTER_AS_DONE_REQUEST,
  MARK_CHAPTER_AS_DONE_SUCCESS,
  MARK_CHAPTER_AS_DONE_FAIL,
  MARK_LESSON_AS_DONE_REQUEST, // Adding MARK_LESSON_AS_DONE_REQUEST
  MARK_LESSON_AS_DONE_SUCCESS, // Adding MARK_LESSON_AS_DONE_SUCCESS
  MARK_LESSON_AS_DONE_FAIL, // Adding MARK_LESSON_AS_DONE_FAIL
  MARK_QUIZ_AS_DONE_REQUEST,
  MARK_QUIZ_AS_DONE_SUCCESS,
  MARK_QUIZ_AS_DONE_FAIL,
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
      `${process.env.REACT_APP_API}/api/v1/enrollment/new`,
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
    console.log("Enrollment details data:", data); // Log fetched data
    dispatch({
      type: ENROLLMENT_DETAILS_SUCCESS,
      payload: data.enrollment,
    });
  } catch (error) {
    console.error("Error fetching enrollment details:", error); // Log error
    dispatch({
      type: ENROLLMENT_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const joinEnrollment = (enrollment) => async (dispatch) => {
  try {
    console.log("Attempting to join enrollment...");
    dispatch({ type: JOIN_ENROLLMENT_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    const { data } = await axios.post(
      `${process.env.REACT_APP_API}/api/v1/enrollment/join`,
      enrollment,
      config
    );
    console.log("Enrollment joined successfully.");
    dispatch({
      type: JOIN_ENROLLMENT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.error("Error joining enrollment:", error);
    dispatch({
      type: JOIN_ENROLLMENT_FAIL,
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
        withCredentials: true,
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

export const getEnrollmentModule =
  (enrollmentId, moduleId) => async (dispatch) => {
    try {
      dispatch({ type: GET_ENROLLMENT_MODULE_REQUEST });
      console.log("Fetching enrollment module...");
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/enrollment/${enrollmentId}/module/${moduleId}`,
        { withCredentials: true }
      );
      console.log("Enrollment module data:", data);
      dispatch({
        type: GET_ENROLLMENT_MODULE_SUCCESS,
        payload: data.module,
      });
    } catch (error) {
      console.error("Error fetching enrollment module:", error);
      dispatch({
        type: GET_ENROLLMENT_MODULE_FAIL,
        payload: error.response.data.message,
      });
    }
  };

export const getEnrollmentChapter =
  (enrollmentId, moduleId, chapterId) => async (dispatch) => {
    try {
      dispatch({ type: GET_ENROLLMENT_CHAPTER_REQUEST });
      console.log("Fetching enrollment chapter...");
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/enrollment/${enrollmentId}/module/${moduleId}/chapter/${chapterId}`,
        { withCredentials: true }
      );
      console.log("Enrollment chapter data:", data);
      dispatch({
        type: GET_ENROLLMENT_CHAPTER_SUCCESS,
        payload: data.chapter,
      });
    } catch (error) {
      console.error("Error fetching enrollment chapter:", error);
      dispatch({
        type: GET_ENROLLMENT_CHAPTER_FAIL,
        payload: error.response.data.message,
      });
    }
  };

export const getSingleLesson =
  (enrollmentId, moduleId, chapterId, lessonId) => async (dispatch) => {
    try {
      console.log("Fetching single lesson...");
      dispatch({ type: GET_SINGLE_LESSON_REQUEST });

      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/enrollment/${enrollmentId}/module/${moduleId}/chapter/${chapterId}/lesson/${lessonId}`,
        { withCredentials: true }
      );

      console.log("Single lesson fetched successfully:", data.lesson);
      dispatch({
        type: GET_SINGLE_LESSON_SUCCESS,
        payload: data.lesson,
      });
    } catch (error) {
      console.error("Failed to fetch single lesson:", error);
      dispatch({
        type: GET_SINGLE_LESSON_FAIL,
        payload: error.response.data.message,
      });
    }
  };

export const getSingleQuiz =
  (enrollmentId, moduleId, chapterId, quizId) => async (dispatch) => {
    try {
      console.log("Fetching single quiz...");
      dispatch({ type: GET_SINGLE_QUIZ_REQUEST });

      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/enrollment/${enrollmentId}/module/${moduleId}/chapter/${chapterId}/quiz/${quizId}`,
        { withCredentials: true }
      );

      console.log("Single quiz fetched successfully:", data.quiz);
      dispatch({
        type: GET_SINGLE_QUIZ_SUCCESS,
        payload: data.quiz,
      });
    } catch (error) {
      console.error("Failed to fetch single quiz:", error);
      dispatch({
        type: GET_SINGLE_QUIZ_FAIL,
        payload: error.response.data.message,
      });
    }
  };

export const markChapterAsDone =
  (enrollmentId, moduleId, chapterId) => async (dispatch) => {
    try {
      dispatch({ type: MARK_CHAPTER_AS_DONE_REQUEST });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      };

      const { data } = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/enrollment/${enrollmentId}/module/${moduleId}/chapter/${chapterId}/mark-as-done`,
        {},
        config
      );

      dispatch({
        type: MARK_CHAPTER_AS_DONE_SUCCESS,
        payload: data.success,
      });
    } catch (error) {
      dispatch({
        type: MARK_CHAPTER_AS_DONE_FAIL,
        payload: error.response.data.message,
      });
    }
  };

export const markLessonAsDone =
  (enrollmentId, moduleId, chapterId, lessonId) => async (dispatch) => {
    try {
      console.log("Marking lesson as done...");
      dispatch({ type: MARK_LESSON_AS_DONE_REQUEST });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      };

      const { data } = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/enrollment/${enrollmentId}/module/${moduleId}/chapter/${chapterId}/lesson/${lessonId}/mark-as-done`,
        {},
        config
      );

      console.log("Lesson marked as done successfully.");
      dispatch({
        type: MARK_LESSON_AS_DONE_SUCCESS,
        payload: data.success,
      });
    } catch (error) {
      console.error("Error marking lesson as done:", error);
      dispatch({
        type: MARK_LESSON_AS_DONE_FAIL,
        payload: error.response.data.message,
      });
    }
  };

export const markQuizAsDone =
  (enrollmentId, moduleId, chapterId, quizId) => async (dispatch) => {
    try {
      dispatch({ type: MARK_QUIZ_AS_DONE_REQUEST });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      };

      console.log("Sending request to mark quiz as done...");

      const { data } = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/enrollment/${enrollmentId}/module/${moduleId}/chapter/${chapterId}/quiz/${quizId}/mark-as-done`,
        {},
        config
      );

      console.log("Quiz marked as done successfully:", data);

      dispatch({
        type: MARK_QUIZ_AS_DONE_SUCCESS,
        payload: data.success,
      });
    } catch (error) {
      console.error("Failed to mark quiz as done:", error);
      dispatch({
        type: MARK_QUIZ_AS_DONE_FAIL,
        payload: error.response.data.message,
      });
    }
  };

export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
