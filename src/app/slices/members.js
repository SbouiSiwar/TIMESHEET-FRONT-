import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ProjectDataService from "../services/project.service";
const initialState = [];
export const retrieveProjectMembers = createAsyncThunk(
  "members/retrieve",
  async ({ id }) => {
    const res = await ProjectDataService.getProjetMembers(id);

    return res.data;
  }
);
export const retrieveAvailableMembers = createAsyncThunk(
  "members/retrieve",
  async ({ id }) => {
    const res = await ProjectDataService.getAvailableMembers(id);

    return res.data;
  }
);
export const addMember = createAsyncThunk(
  "members/add",
  async ({ id, data }) => {
    const res = await ProjectDataService.addMember(id, data);

    return res.data;
  }
);
export const deleteMember = createAsyncThunk(
  "Members/delete",
  async ({ idp, idu }) => {
    await ProjectDataService.deleteMember(idp, idu);
    return { idu };
  }
);
const memberSlice = createSlice({
  name: "member",
  initialState,
  extraReducers: {
    [retrieveProjectMembers.fulfilled]: (state, action) => {
      return [...action.payload];
    },
    [retrieveAvailableMembers.fulfilled]: (state, action) => {
      return [...action.payload];
    },
    [addMember.fulfilled]: (state, action) => {
      let index = state.findIndex(({ id }) => id === action.payload.id);
      state.splice(index, 1);
    },
    [deleteMember.fulfilled]: (state, action) => {
      let index = state.findIndex(({ id }) => id === action.payload.id);
      state.splice(index, 1);
    },
  },
});

const { reducer } = memberSlice;
export default reducer;
