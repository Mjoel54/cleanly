import { combineReducers } from "@reduxjs/toolkit";
import roomSlice from "./roomReducer";
import tasksSlice from "./taskReducer";

const rootReducer = combineReducers({
  rooms: roomSlice.reducer,
  tasks: tasksSlice.reducer,
});

export default rootReducer;
