import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";
import { setNotification } from "./notificationReducer";

const initialState = [];

const blogSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {
    setBlogs(state, action) {
      return action.payload;
    },
    addLike(state, action) {
      const blog = state.find((blog) => blog.id === action.payload);
      return state
        .filter((blog) => blog.id !== action.payload)
        .concat({ ...blog, likes: blog.likes + 1 });
    },
  },
});

export const { setBlogs, addLike, createNewBlog } = blogSlice.actions;

export const initialiseBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const createBlog = (newBlog) => {
  return async (dispatch) => {
    try {
      await blogService.create(newBlog);
      dispatch(initialiseBlogs());
      dispatch(
        setNotification(
          {
            message: `a new blog ${newBlog.title} by ${newBlog.author} added`,
            isError: false,
          },
          3
        )
      );
    } catch (error) {
      dispatch(setNotification({ message: error.message, isError: true }, 3));
    }
  };
};
export default blogSlice.reducer;
