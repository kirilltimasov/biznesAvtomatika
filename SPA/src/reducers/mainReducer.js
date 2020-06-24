import {createContext} from "react";
import API from "../api/api";

export const SET_LOADED = 'SET_LOADED';
export const SET_INITIALIZE = 'SET_INITIALIZE';
export const SET_USERS_RAW = 'SET_USERS_RAW';
export const SET_USERS = 'SET_USERS';
export const SET_DEPARTMENTS = 'SET_DEPARTMENTS';
export const SET_SELECTED_USER = 'SET_SELECTED_USER';
export const SET_DIALOG_ADD = 'SET_DIALOG_ADD';
export const SET_DIALOG_EDIT = 'SET_DIALOG_EDIT';
export const SET_DIALOG_DELETE = 'SET_DIALOG_DELETE';

export const ContextApp = createContext();

export const initialState = {
    isInitialize: false,
    isLoad: false,
    usersRaw: [],
    users: [],
    departments: [],
    selectedUser: null,
    dialogs: {
        add: false,
        edit: false,
        delete: false
    }
};

export const reducer = (localState, action) => {
  switch (action.type) {
      case SET_LOADED:
          return {
              ...localState,
              isLoad: action.data
          };
      case SET_INITIALIZE:
          return {
              ...localState,
              isInitialize: action.data
          };
      case SET_USERS_RAW:
          return {
              ...localState,
              usersRaw: action.data
          };
      case SET_USERS:
          return {
              ...localState,
              users: action.data
          };
      case SET_DEPARTMENTS:
          return {
              ...localState,
              departments: action.data
          };
      case SET_SELECTED_USER:
          return {
              ...localState,
              selectedUser: action.data
          };
      case SET_DIALOG_ADD:
          return {
              ...localState,
              dialogs: {
                  ...localState.dialogs,
                  add: action.data
              },
          };
      case SET_DIALOG_EDIT:
          return {
              ...localState,
              dialogs: {
                  ...localState.dialogs,
                  edit: action.data
              },
          };
      case SET_DIALOG_DELETE:
          return {
              ...localState,
              dialogs: {
                  ...localState.dialogs,
                  delete: action.data
              },
          };
      default:
          throw new Error();
  }
};

export const actions = {
    getUsers: () => dispatch => {
        return API.user.get()
            .then(response => {
                dispatch({type: SET_USERS_RAW, data: response});
            })
            .catch(error => {
                console.log(error);
            })
    },
    getDepartments: () => dispatch => {
        return API.department.get()
            .then(response => {
                dispatch({type: SET_DEPARTMENTS, data: response})
            })
            .catch(error => {
                console.log(error);
            })
    },
};