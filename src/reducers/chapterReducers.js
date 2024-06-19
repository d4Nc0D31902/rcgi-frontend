import {
  ALL_CHAPTERS_REQUEST,
  ALL_CHAPTERS_SUCCESS,
  ALL_CHAPTERS_FAIL,
  CHAPTER_DETAILS_REQUEST,
  CHAPTER_DETAILS_SUCCESS,
  CHAPTER_DETAILS_FAIL,
  ADMIN_CHAPTERS_REQUEST,
  ADMIN_CHAPTERS_SUCCESS,
  ADMIN_CHAPTERS_FAIL,
  NEW_CHAPTER_REQUEST,
  NEW_CHAPTER_SUCCESS,
  NEW_CHAPTER_RESET,
  NEW_CHAPTER_FAIL,
  DELETE_CHAPTER_REQUEST,
  DELETE_CHAPTER_SUCCESS,
  DELETE_CHAPTER_RESET,
  DELETE_CHAPTER_FAIL,
  UPDATE_CHAPTER_REQUEST,
  UPDATE_CHAPTER_SUCCESS,
  UPDATE_CHAPTER_RESET,
  UPDATE_CHAPTER_FAIL,
  ADD_LESSON_REQUEST,
  ADD_LESSON_SUCCESS,
  ADD_LESSON_FAIL,
  ADD_QUIZ_REQUEST,
  ADD_QUIZ_SUCCESS,
  ADD_QUIZ_FAIL,
  MARK_CHAPTER_AS_DONE_REQUEST,
  MARK_CHAPTER_AS_DONE_SUCCESS,
  MARK_CHAPTER_AS_DONE_FAIL,
  MARK_CHAPTER_AS_DONE_RESET,
  UPDATE_CHAPTERS_ORDER_REQUEST,
  UPDATE_CHAPTERS_ORDER_SUCCESS,
  UPDATE_CHAPTERS_ORDER_FAIL,
  UPDATE_CHAPTERS_ORDER_RESET,
  CLEAR_ERRORS,
} from "../constants/chapterConstants";

export const chaptersReducer = (state = { chapters: [] }, action) => {
  switch (action.type) {
    case ALL_CHAPTERS_REQUEST:
    case ADMIN_CHAPTERS_REQUEST:
      return {
        loading: true,
        chapters: [],
      };
    case ALL_CHAPTERS_SUCCESS:
      return {
        ...state,
        loading: false,
        chapters: action.payload.chapters,
      };
    case ALL_CHAPTERS_FAIL:
    case ADMIN_CHAPTERS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case ADMIN_CHAPTERS_SUCCESS:
      return {
        ...state,
        loading: false,
        chapters: action.payload,
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

export const chapterDetailsReducer = (state = { chapter: {} }, action) => {
  switch (action.type) {
    case CHAPTER_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CHAPTER_DETAILS_SUCCESS:
      return {
        loading: false,
        chapter: action.payload,
      };
    case CHAPTER_DETAILS_FAIL:
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

export const newChapterReducer = (state = { chapter: {} }, action) => {
  switch (action.type) {
    case NEW_CHAPTER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case NEW_CHAPTER_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        chapter: action.payload.chapter,
      };
    case NEW_CHAPTER_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case NEW_CHAPTER_RESET:
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

export const chapterReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_CHAPTER_REQUEST:
    case UPDATE_CHAPTER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_CHAPTER_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };
    case UPDATE_CHAPTER_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };
    case DELETE_CHAPTER_FAIL:
    case UPDATE_CHAPTER_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case DELETE_CHAPTER_RESET:
      return {
        ...state,
        isDeleted: false,
      };
    case UPDATE_CHAPTER_RESET:
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

export const addLessonReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_LESSON_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ADD_LESSON_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        lesson: action.payload.lesson,
      };
    case ADD_LESSON_FAIL:
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

export const addQuizReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_QUIZ_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ADD_QUIZ_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        quiz: action.payload.quiz,
      };
    case ADD_QUIZ_FAIL:
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

export const markChapterAsDoneReducer = (state = {}, action) => {
  switch (action.type) {
    case MARK_CHAPTER_AS_DONE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case MARK_CHAPTER_AS_DONE_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
      };
    case MARK_CHAPTER_AS_DONE_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case MARK_CHAPTER_AS_DONE_RESET:
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

export const reorderChapterItemsReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_CHAPTERS_ORDER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_CHAPTERS_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        success: action.payload.success,
        chapter: action.payload.chapter,
      };
    case UPDATE_CHAPTERS_ORDER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case UPDATE_CHAPTERS_ORDER_RESET:
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
