import { combineReducers } from "@reduxjs/toolkit";
import roomSlice from "./roomReducer";
import tasksSlice from "../TaskDataSlice";

const rootReducer = combineReducers({
  rooms: roomSlice.reducer,
  tasks: tasksSlice.reducer,
});

export default rootReducer;
