import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "../slices/userSlice";
const reducers = combineReducers({ user: userReducer });

export default reducers;
