import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ProjectDataService from "../services/project.service";
import { addMember } from "./members";
const initialState = [];
export const createProject = createAsyncThunk(
  "projects/create",
  async ({ titre, descreption, dateDebut, dateFin }) => {
    const res = await ProjectDataService.create({
      titre,
      descreption,
      dateDebut,
      dateFin,
    });
    return res.data;
  }
);
export const retrieveProjects = createAsyncThunk(
  "Projects/retrieve",
  async () => {
    const res = await ProjectDataService.getAll();
    return res.data;
  }
);
export const updateProject = createAsyncThunk(
  "Projects/update",
  async ({ id, data }) => {
    const res = await ProjectDataService.update(id, data);
    return res.data;
  }
);
export const deleteProject = createAsyncThunk(
  "Projects/delete",
  async ({ id }) => {
    await ProjectDataService.delete(id);
    return { id };
  }
);
export const retrieveProjectsByTitle = createAsyncThunk(
  "Projects/findByTitle",
  async ({ title }) => {
    const res = await ProjectDataService.getByTitle(title);
    return res.data;
  }
);

const projectSlice = createSlice({
  name: "project",
  initialState,
  extraReducers: {
    [createProject.fulfilled]: (state, action) => {
      state.push(action.payload);
    },
    [retrieveProjects.fulfilled]: (state, action) => {
      return [...action.payload];
    },
    [updateProject.fulfilled]: (state, action) => {
      const index = state.findIndex(
        (Project) => Project.id === action.payload.id
      );
      state[index] = {
        ...state[index],
        ...action.payload,
      };
    },
    [deleteProject.fulfilled]: (state, action) => {
      let index = state.findIndex(({ id }) => id === action.payload.id);
      state.splice(index, 1);
    },
    [retrieveProjectsByTitle.fulfilled]: (state, action) => {
      return [...action.payload];
    },
  },
});
const { reducer } = projectSlice;
export default reducer;
