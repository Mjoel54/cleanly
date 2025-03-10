import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "./TaskDataSlice";
import roomsSlice from "./roomsSlice";

const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    rooms: roomsSlice.reducer,
  },
});

// Get the type of our store variable
export type AppStore = typeof store;

// Infer the 'RootState' and 'AppDispatch' types from the store itself
export type RootState = ReturnType<typeof store.getState>;

// Inferred type: {tasks: TasksState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
