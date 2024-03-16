import {
  ALL_MODULES_REQUEST,
  ALL_MODULES_SUCCESS,
  ALL_MODULES_FAIL,
  MODULE_DETAILS_REQUEST,
  MODULE_DETAILS_SUCCESS,
  MODULE_DETAILS_FAIL,
  ADMIN_MODULES_REQUEST,
  ADMIN_MODULES_SUCCESS,
  ADMIN_MODULES_FAIL,
  NEW_MODULE_REQUEST,
  NEW_MODULE_SUCCESS,
  NEW_MODULE_RESET,
  NEW_MODULE_FAIL,
  DELETE_MODULE_REQUEST,
  DELETE_MODULE_SUCCESS,
  DELETE_MODULE_RESET,
  DELETE_MODULE_FAIL,
  UPDATE_MODULE_REQUEST,
  UPDATE_MODULE_SUCCESS,
  UPDATE_MODULE_RESET,
  UPDATE_MODULE_FAIL,
  ADD_CHAPTER_REQUEST, // Added new action type
  ADD_CHAPTER_SUCCESS, // Added new action type
  ADD_CHAPTER_RESET, // Added new action type
  ADD_CHAPTER_FAIL, // Added new action type
  CLEAR_ERRORS,
} from "../constants/moduleConstants";

export const modulesReducer = (state = { modules: [] }, action) => {
  switch (action.type) {
    case ALL_MODULES_REQUEST:
    case ADMIN_MODULES_REQUEST:
      return {
        loading: true,
        modules: [],
      };
    case ALL_MODULES_SUCCESS:
      return {
        ...state,
        loading: false,
        modules: action.payload.modules,
      };
    case ALL_MODULES_FAIL:
    case ADMIN_MODULES_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case ADMIN_MODULES_SUCCESS:
      return {
        ...state,
        loading: false,
        modules: action.payload,
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

export const moduleDetailsReducer = (state = { module: {} }, action) => {
  switch (action.type) {
    case MODULE_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case MODULE_DETAILS_SUCCESS:
      return {
        loading: false,
        module: action.payload,
      };
    case MODULE_DETAILS_FAIL:
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

export const newModuleReducer = (state = { module: {} }, action) => {
  switch (action.type) {
    case NEW_MODULE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case NEW_MODULE_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        module: action.payload.module,
      };
    case NEW_MODULE_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case NEW_MODULE_RESET:
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

export const moduleReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_MODULE_REQUEST:
    case UPDATE_MODULE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_MODULE_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };
    case UPDATE_MODULE_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };
    case DELETE_MODULE_FAIL:
    case UPDATE_MODULE_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case DELETE_MODULE_RESET:
      return {
        ...state,
        isDeleted: false,
      };
    case UPDATE_MODULE_RESET:
      return {
        ...state,
        isUpdated: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    // Handling the new action types related to adding a chapter
    case ADD_CHAPTER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ADD_CHAPTER_SUCCESS:
      return {
        ...state,
        loading: false,
        chapterAdded: action.payload,
      };
    case ADD_CHAPTER_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case ADD_CHAPTER_RESET:
      return {
        ...state,
        chapterAdded: false,
      };
    default:
      return state;
  }
};
