import {
  ALL_COURSES_REQUEST,
  ALL_COURSES_SUCCESS,
  ALL_COURSES_FAIL,
  COURSE_DETAILS_REQUEST,
  COURSE_DETAILS_SUCCESS,
  COURSE_DETAILS_FAIL,
  ADMIN_COURSES_REQUEST,
  ADMIN_COURSES_SUCCESS,
  ADMIN_COURSES_FAIL,
  NEW_COURSE_REQUEST,
  NEW_COURSE_SUCCESS,
  NEW_COURSE_RESET,
  NEW_COURSE_FAIL,
  DELETE_COURSE_REQUEST,
  DELETE_COURSE_SUCCESS,
  DELETE_COURSE_RESET,
  DELETE_COURSE_FAIL,
  UPDATE_COURSE_REQUEST,
  UPDATE_COURSE_SUCCESS,
  UPDATE_COURSE_RESET,
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

export const coursesReducer = (state = { courses: [] }, action) => {
  switch (action.type) {
    case ALL_COURSES_REQUEST:
    case ADMIN_COURSES_REQUEST:
      return {
        loading: true,
        courses: [],
      };
    case ALL_COURSES_SUCCESS:
      return {
        ...state,
        loading: false,
        courses: action.payload.courses,
      };
    case ALL_COURSES_FAIL:
    case ADMIN_COURSES_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case ADMIN_COURSES_SUCCESS:
      return {
        ...state,
        loading: false,
        courses: action.payload,
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

export const courseDetailsReducer = (state = { course: {} }, action) => {
  switch (action.type) {
    case COURSE_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case COURSE_DETAILS_SUCCESS:
      return {
        loading: false,
        course: action.payload,
      };
    case COURSE_DETAILS_FAIL:
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

export const newCourseReducer = (state = { course: {} }, action) => {
  switch (action.type) {
    case NEW_COURSE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case NEW_COURSE_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        course: action.payload.course,
      };
    case NEW_COURSE_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case NEW_COURSE_RESET:
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

export const courseReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_COURSE_REQUEST:
    case UPDATE_COURSE_REQUEST:
    case DEACTIVATE_COURSE_REQUEST:
    case REACTIVATE_COURSE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_COURSE_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };
    case UPDATE_COURSE_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };
    case DEACTIVATE_COURSE_SUCCESS:
    case REACTIVATE_COURSE_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };
    case DELETE_COURSE_FAIL:
    case UPDATE_COURSE_FAIL:
    case DEACTIVATE_COURSE_FAIL:
    case REACTIVATE_COURSE_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case DELETE_COURSE_RESET:
      return {
        ...state,
        isDeleted: false,
      };
    case UPDATE_COURSE_RESET:
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

// Add new reducer for adding modules
export const addModuleReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_MODULE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ADD_MODULE_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        module: action.payload.module,
      };
    case ADD_MODULE_FAIL:
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
