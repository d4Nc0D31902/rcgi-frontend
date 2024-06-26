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
  MARK_LESSON_AS_DONE_REQUEST,
  MARK_LESSON_AS_DONE_SUCCESS,
  MARK_LESSON_AS_DONE_FAIL,
  MARK_QUIZ_AS_DONE_REQUEST,
  MARK_QUIZ_AS_DONE_SUCCESS,
  MARK_QUIZ_AS_DONE_FAIL,
  MARK_MODULE_AS_DONE_FAIL,
  MARK_MODULE_AS_DONE_REQUEST,
  MARK_MODULE_AS_DONE_SUCCESS,
  CREATE_SUBMISSION_REQUEST,
  CREATE_SUBMISSION_SUCCESS,
  CREATE_SUBMISSION_FAIL,
  CREATE_SUBMISSION_RESET,
  CREATE_RETAKE_REQUEST,
  CREATE_RETAKE_SUCCESS,
  CREATE_RETAKE_FAIL,
  CREATE_RETAKE_RESET,
  CHECK_PROGRESS_REQUEST,
  CHECK_PROGRESS_SUCCESS,
  CHECK_PROGRESS_FAIL,
  CREATE_REPLY_REQUEST,
  CREATE_REPLY_SUCCESS,
  CREATE_REPLY_FAIL,
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
    case JOIN_ENROLLMENT_REQUEST:
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

    case JOIN_ENROLLMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        isJoined: action.payload,
      };

    case UPDATE_ENROLLMENT_FAIL:
    case DELETE_ENROLLMENT_FAIL:
    case JOIN_ENROLLMENT_FAIL:
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

export const getEnrollmentModuleReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ENROLLMENT_MODULE_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case GET_ENROLLMENT_MODULE_SUCCESS:
      return {
        ...state,
        loading: false,
        enrollmentModule: action.payload,
      };

    case GET_ENROLLMENT_MODULE_FAIL:
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

export const getEnrollmentChapterReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ENROLLMENT_CHAPTER_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case GET_ENROLLMENT_CHAPTER_SUCCESS:
      return {
        ...state,
        loading: false,
        chapter: action.payload,
      };

    case GET_ENROLLMENT_CHAPTER_FAIL:
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

export const getSingleLessonReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_SINGLE_LESSON_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case GET_SINGLE_LESSON_SUCCESS:
      return {
        ...state,
        loading: false,
        lesson: action.payload,
      };

    case GET_SINGLE_LESSON_FAIL:
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

export const getSingleQuizReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_SINGLE_QUIZ_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case GET_SINGLE_QUIZ_SUCCESS:
      return {
        ...state,
        loading: false,
        quiz: action.payload,
      };

    case GET_SINGLE_QUIZ_FAIL:
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

export const markChapterAsDoneReducer = (state = {}, action) => {
  switch (action.type) {
    case MARK_CHAPTER_AS_DONE_REQUEST:
      return { loading: true };
    case MARK_CHAPTER_AS_DONE_SUCCESS:
      return { loading: false, success: true };
    case MARK_CHAPTER_AS_DONE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const markLessonAsDoneReducer = (state = {}, action) => {
  switch (action.type) {
    case MARK_LESSON_AS_DONE_REQUEST:
      return { loading: true };
    case MARK_LESSON_AS_DONE_SUCCESS:
      return { loading: false, success: true };
    case MARK_LESSON_AS_DONE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const markQuizAsDoneReducer = (state = {}, action) => {
  switch (action.type) {
    case MARK_QUIZ_AS_DONE_REQUEST:
      return { loading: true };
    case MARK_QUIZ_AS_DONE_SUCCESS:
      return { loading: false, success: true };
    case MARK_QUIZ_AS_DONE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const markModuleAsDoneReducer = (state = {}, action) => {
  switch (action.type) {
    case MARK_MODULE_AS_DONE_REQUEST:
      return { loading: true };
    case MARK_MODULE_AS_DONE_SUCCESS:
      return { loading: false, success: true };
    case MARK_MODULE_AS_DONE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const createSubmitReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_SUBMISSION_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case CREATE_SUBMISSION_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        submission: action.payload.submission,
      };

    case CREATE_SUBMISSION_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case CREATE_SUBMISSION_RESET:
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

export const createRetakeReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_RETAKE_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case CREATE_RETAKE_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        retake: action.payload.retake,
      };

    case CREATE_RETAKE_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case CREATE_RETAKE_RESET:
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

export const checkProgressReducer = (state = {}, action) => {
  switch (action.type) {
    case CHECK_PROGRESS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case CHECK_PROGRESS_SUCCESS:
      return {
        ...state,
        loading: false,
        progress: action.payload,
      };

    case CHECK_PROGRESS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const createReplyReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_REPLY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CREATE_REPLY_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        forum: action.payload,
      };
    case CREATE_REPLY_FAIL:
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
