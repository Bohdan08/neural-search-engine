import { createSlice } from "@reduxjs/toolkit";
import { API_STATUS, SEARCH_RESULTS_LIMIT } from "../constants";

const initialState = {
  status: API_STATUS.IDLE,
  searchTerm: "",
  results: [],
  limit: SEARCH_RESULTS_LIMIT,
};

const searchResultsSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchTerm: (state, { payload }) => {
      state.searchTerm = payload;
    },
    setSearchStatus: (state, { payload }) => {
      state.status = payload;
    },
    setSearchResults: (state, { payload }) => {
      state.results = payload;
    },
    setSearchLimit: (state, { payload }) => {
      state.limit = payload;
    },
  },
});

export const {
  setSearchLimit,
  setSearchStatus,
  setSearchResults,
  setSearchTerm,
} = searchResultsSlice.actions;

export default searchResultsSlice.reducer;
