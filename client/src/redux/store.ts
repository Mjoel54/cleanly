import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "./TaskDataSlice";
import roomsSlice from "./reducers/roomReducer";

const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    rooms: roomsSlice.reducer,
  },
});

// Get the type of our store variable
export type AppStore = typeof store;

// RootState represents the shape of the entire Redux store state
export type RootState = ReturnType<typeof store.getState>;

// AppDispatch represents the dispatch function in our store. It ensures that the actions we dispatch are correctly typed.
export type AppDispatch = typeof store.dispatch;

export default store;
