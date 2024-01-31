import { createSlice } from "@reduxjs/toolkit";

const initialState = { message: null, isError: false };

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setMessage(state, action) {
      return {
        message: action.payload.message,
        isError: action.payload.isError,
      };
    },
    removeNotification(state, action) {
      return initialState;
    },
  },
});

export const { setMessage, removeNotification } = notificationSlice.actions;

export const setNotification = (messageObj, seconds) => {
  return (dispatch) => {
    dispatch(setMessage(messageObj));
    setTimeout(() => dispatch(removeNotification()), seconds * 1000);
  };
};

export default notificationSlice.reducer;
