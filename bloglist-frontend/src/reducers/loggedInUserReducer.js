import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";
import loginService from "../services/login";
import { setNotification } from "./notificationReducer";

const loggedInUserSlice = createSlice({
  name: "loggedInUser",
  initialState: null,
  reducers: {
    setLoggedInUser(state, action) {
      return action.payload;
    },
  },
});

export const { setLoggedInUser } = loggedInUserSlice.actions;

export const userLogin = (username, password) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login({
        username,
        password,
      });
      blogService.setToken(user.token);
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      dispatch(setLoggedInUser(user));
    } catch (e) {
      dispatch(
        setNotification(
          {
            message: e.response?.status
              ? "wrong username or password"
              : "something went wrong",
            isError: true,
          },
          3
        )
      );
    }
  };
};

export const userLogout = () => {
  return async (dispatch) => {
    dispatch(setLoggedInUser(null));
    window.localStorage.removeItem("loggedBlogappUser");
  };
};

export const resumeSession = () => {
  return async (dispatch) => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON);
      dispatch(setLoggedInUser(loggedUser));
      blogService.setToken(loggedUser.token);
    }
  };
};

export default loggedInUserSlice.reducer;
