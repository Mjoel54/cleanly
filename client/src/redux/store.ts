import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers/rootReducer";

const store = configureStore({
  reducer: {
    reducer: rootReducer,
  },
});

// Get the type of our store variable
export type AppStore = typeof store;

// RootState represents the shape of the entire Redux store state
export type RootState = ReturnType<typeof store.getState>;

// AppDispatch represents the dispatch function in our store. It ensures that the actions we dispatch are correctly typed.
export type AppDispatch = typeof store.dispatch;

export default store;
