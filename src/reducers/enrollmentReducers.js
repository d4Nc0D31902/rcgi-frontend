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
  UPDATE_ENROLLMENT_REQUEST,
  UPDATE_ENROLLMENT_SUCCESS,
  UPDATE_ENROLLMENT_RESET,
  UPDATE_ENROLLMENT_FAIL,
  DELETE_ENROLLMENT_REQUEST,
  DELETE_ENROLLMENT_SUCCESS,
  DELETE_ENROLLMENT_RESET,
  DELETE_ENROLLMENT_FAIL,
  CLEAR_ERRORS,
} from "../constants/enrollmentConstants";

export const newEnrollmentReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_ENROLLMENT_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case CREATE_ENROLLMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        enrollment: action.payload,
      };
    case CREATE_ENROLLMENT_FAIL:
      return {
        ...state,
        loading: false,
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

export const myEnrollmentsReducer = (state = { enrollments: [] }, action) => {
  switch (action.type) {
    case MY_ENROLLMENTS_REQUEST:
      return {
        loading: true,
      };

    case MY_ENROLLMENTS_SUCCESS:
      return {
        loading: false,
        enrollments: action.payload,
      };

    case MY_ENROLLMENTS_FAIL:
      return {
        loading: false,
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

export const enrollmentDetailsReducer = (
  state = { enrollment: {} },
  action
) => {
  switch (action.type) {
    case ENROLLMENT_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case ENROLLMENT_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        enrollment: action.payload,
      };

    case ENROLLMENT_DETAILS_FAIL:
      return {
        ...state,
        loading: false,
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

export const allEnrollmentsReducer = (state = { enrollments: [] }, action) => {
  switch (action.type) {
    case ALL_ENROLLMENTS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case ALL_ENROLLMENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        enrollments: action.payload.enrollments,
        totalAmount: action.payload.totalAmount,
      };

    case ALL_ENROLLMENTS_FAIL:
      return {
        ...state,
        loading: false,
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

export const enrollmentReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_ENROLLMENT_REQUEST:
    case DELETE_ENROLLMENT_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case UPDATE_ENROLLMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };

    case DELETE_ENROLLMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };

    case UPDATE_ENROLLMENT_FAIL:
    case DELETE_ENROLLMENT_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case UPDATE_ENROLLMENT_RESET:
      return {
        ...state,
        isUpdated: false,
      };

    case DELETE_ENROLLMENT_RESET:
      return {
        ...state,
        isDeleted: false,
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
