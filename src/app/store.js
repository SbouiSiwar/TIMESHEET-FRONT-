import { configureStore } from "@reduxjs/toolkit";
import projectReducer from "./slices/projects";
import memberReducer from "./slices/members";
const reducer = {
  projects: projectReducer,
  members: memberReducer,
};
const store = configureStore({
  reducer: reducer,
  devTools: true,
});
export default store;
