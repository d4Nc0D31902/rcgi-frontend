import {
  ALL_LESSONS_REQUEST,
  ALL_LESSONS_SUCCESS,
  ALL_LESSONS_FAIL,
  LESSON_DETAILS_REQUEST,
  LESSON_DETAILS_SUCCESS,
  LESSON_DETAILS_FAIL,
  ADMIN_LESSONS_REQUEST,
  ADMIN_LESSONS_SUCCESS,
  ADMIN_LESSONS_FAIL,
  NEW_LESSON_REQUEST,
  NEW_LESSON_SUCCESS,
  NEW_LESSON_RESET,
  NEW_LESSON_FAIL,
  DELETE_LESSON_REQUEST,
  DELETE_LESSON_SUCCESS,
  DELETE_LESSON_RESET,
  DELETE_LESSON_FAIL,
  UPDATE_LESSON_REQUEST,
  UPDATE_LESSON_SUCCESS,
  UPDATE_LESSON_RESET,
  UPDATE_LESSON_FAIL,
  MARK_LESSON_AS_DONE_REQUEST,
  MARK_LESSON_AS_DONE_SUCCESS,
  MARK_LESSON_AS_DONE_FAIL,
  MARK_LESSON_AS_DONE_RESET,
  CLEAR_ERRORS,
} from "../constants/lessonConstants";

export const lessonsReducer = (state = { lessons: [] }, action) => {
  switch (action.type) {
    case ALL_LESSONS_REQUEST:
    case ADMIN_LESSONS_REQUEST:
      return {
        loading: true,
        lessons: [],
      };
    case ALL_LESSONS_SUCCESS:
      return {
        ...state,
        loading: false,
        lessons: action.payload.lessons,
      };
    case ALL_LESSONS_FAIL:
    case ADMIN_LESSONS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case ADMIN_LESSONS_SUCCESS:
      return {
        ...state,
        loading: false,
        lessons: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const lessonDetailsReducer = (state = { lesson: {} }, action) => {
  switch (action.type) {
    case LESSON_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case LESSON_DETAILS_SUCCESS:
      return {
        loading: false,
        lesson: action.payload,
      };
    case LESSON_DETAILS_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const newLessonReducer = (state = { lesson: {} }, action) => {
  switch (action.type) {
    case NEW_LESSON_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case NEW_LESSON_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        lesson: action.payload.lesson,
      };
    case NEW_LESSON_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case NEW_LESSON_RESET:
      return {
        ...state,
        success: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const lessonReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_LESSON_REQUEST:
    case UPDATE_LESSON_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_LESSON_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };
    case UPDATE_LESSON_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };
    case DELETE_LESSON_FAIL:
    case UPDATE_LESSON_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case DELETE_LESSON_RESET:
      return {
        ...state,
        isDeleted: false,
      };
    case UPDATE_LESSON_RESET:
      return {
        ...state,
        isUpdated: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const markLessonAsDoneReducer = (state = {}, action) => {
  switch (action.type) {
    case MARK_LESSON_AS_DONE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case MARK_LESSON_AS_DONE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: action.payload.success,
        lesson: action.payload.lesson,
      };
    case MARK_LESSON_AS_DONE_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
