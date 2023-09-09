import { configureStore } from "@reduxjs/toolkit";
import searchResultsSlice from "./searchResultsSlice";

export const store = configureStore({
  reducer: {
    searchResults: searchResultsSlice,
  },
});
