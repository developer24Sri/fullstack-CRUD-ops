import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "./slices/TasksSlice";

export const store = configureStore({
  reducer: {
    tasks: taskReducer,
  },
});
