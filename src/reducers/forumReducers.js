import {
  FORUM_DETAILS_REQUEST,
  FORUM_DETAILS_SUCCESS,
  FORUM_DETAILS_FAIL,
  ADMIN_FORUMS_REQUEST,
  ADMIN_FORUMS_SUCCESS,
  ADMIN_FORUMS_FAIL,
  NEW_FORUM_REQUEST,
  NEW_FORUM_SUCCESS,
  NEW_FORUM_RESET,
  NEW_FORUM_FAIL,
  DELETE_FORUM_REQUEST,
  DELETE_FORUM_SUCCESS,
  DELETE_FORUM_RESET,
  DELETE_FORUM_FAIL,
  UPDATE_FORUM_REQUEST,
  UPDATE_FORUM_SUCCESS,
  UPDATE_FORUM_RESET,
  UPDATE_FORUM_FAIL,
  CREATE_REPLY_REQUEST,
  CREATE_REPLY_SUCCESS,
  CREATE_REPLY_FAIL,
  CREATE_REPLY_RESET,
  UPDATE_REPLY_REQUEST,
  UPDATE_REPLY_SUCCESS,
  UPDATE_REPLY_FAIL,
  UPDATE_REPLY_RESET,
  DELETE_REPLY_FAIL,
  DELETE_REPLY_REQUEST,
  DELETE_REPLY_RESET,
  DELETE_REPLY_SUCCESS,
  CLEAR_ERRORS,
} from "../constants/forumConstants";

export const forumsReducer = (state = { forums: [] }, action) => {
  switch (action.type) {
    case ADMIN_FORUMS_REQUEST:
      return {
        loading: true,
        forums: [],
      };
    case ADMIN_FORUMS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case ADMIN_FORUMS_SUCCESS:
      return {
        ...state,
        loading: false,
        forums: action.payload,
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

export const forumDetailsReducer = (state = { forum: {} }, action) => {
  switch (action.type) {
    case FORUM_DETAILS_REQUEST:
      console.log("Fetching forum details...");
      return {
        ...state,
        loading: true,
      };
    case FORUM_DETAILS_SUCCESS:
      console.log("Forum details fetched successfully:", action.payload);
      return {
        loading: false,
        forum: action.payload,
      };
    case FORUM_DETAILS_FAIL:
      console.log("Failed to fetch forum details:", action.payload);
      return {
        ...state,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      console.log("Clearing errors...");
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const createForumReducer = (state = { forum: {} }, action) => {
  switch (action.type) {
    case NEW_FORUM_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case NEW_FORUM_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        forum: action.payload.forum,
      };
    case NEW_FORUM_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case NEW_FORUM_RESET:
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

export const forumReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_FORUM_REQUEST:
    case UPDATE_FORUM_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_FORUM_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };
    case UPDATE_FORUM_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };
    case DELETE_FORUM_FAIL:
    case UPDATE_FORUM_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case DELETE_FORUM_RESET:
      return {
        ...state,
        isDeleted: false,
      };
    case UPDATE_FORUM_RESET:
      return {
        ...state,
        isUpdated: false,
      };
    case DELETE_REPLY_REQUEST:
    case UPDATE_REPLY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_REPLY_SUCCESS:
      return {
        ...state,
        loading: false,
        forum: action.payload.forum,
      };
    case UPDATE_REPLY_SUCCESS:
      return {
        ...state,
        loading: false,
        forum: action.payload.forum,
      };
    case DELETE_REPLY_FAIL:
    case UPDATE_REPLY_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case DELETE_REPLY_RESET:
    case UPDATE_REPLY_RESET:
      return {
        ...state,
        loading: false,
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

export const createReplyReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_REPLY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CREATE_REPLY_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        forum: action.payload.forum,
      };
    case CREATE_REPLY_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case CREATE_REPLY_RESET:
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
