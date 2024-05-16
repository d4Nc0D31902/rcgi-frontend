import {
  FEEDBACK_DETAILS_REQUEST,
  FEEDBACK_DETAILS_SUCCESS,
  FEEDBACK_DETAILS_FAIL,
  ADMIN_FEEDBACKS_REQUEST,
  ADMIN_FEEDBACKS_SUCCESS,
  ADMIN_FEEDBACKS_FAIL,
  NEW_FEEDBACK_REQUEST,
  NEW_FEEDBACK_SUCCESS,
  NEW_FEEDBACK_RESET,
  NEW_FEEDBACK_FAIL,
  DELETE_FEEDBACK_REQUEST,
  DELETE_FEEDBACK_SUCCESS,
  DELETE_FEEDBACK_RESET,
  DELETE_FEEDBACK_FAIL,
  UPDATE_FEEDBACK_REQUEST,
  UPDATE_FEEDBACK_SUCCESS,
  UPDATE_FEEDBACK_RESET,
  UPDATE_FEEDBACK_FAIL,
  CLEAR_ERRORS,
} from "../constants/feedbackConstants";

export const feedbacksReducer = (state = { feedbacks: [] }, action) => {
  switch (action.type) {
    case ADMIN_FEEDBACKS_REQUEST:
      return {
        loading: true,
        feedbacks: [],
      };
    case ADMIN_FEEDBACKS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case ADMIN_FEEDBACKS_SUCCESS:
      return {
        ...state,
        loading: false,
        feedbacks: action.payload,
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

export const feedbackDetailsReducer = (state = { feedback: {} }, action) => {
  switch (action.type) {
    case FEEDBACK_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FEEDBACK_DETAILS_SUCCESS:
      return {
        loading: false,
        feedback: action.payload,
      };
    case FEEDBACK_DETAILS_FAIL:
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

export const newFeedbackReducer = (state = { feedback: {} }, action) => {
  switch (action.type) {
    case NEW_FEEDBACK_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case NEW_FEEDBACK_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        feedback: action.payload.feedback,
      };
    case NEW_FEEDBACK_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case NEW_FEEDBACK_RESET:
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

export const feedbackReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_FEEDBACK_REQUEST:
    case UPDATE_FEEDBACK_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_FEEDBACK_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };
    case UPDATE_FEEDBACK_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };
    case DELETE_FEEDBACK_FAIL:
    case UPDATE_FEEDBACK_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case DELETE_FEEDBACK_RESET:
      return {
        ...state,
        isDeleted: false,
      };
    case UPDATE_FEEDBACK_RESET:
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
