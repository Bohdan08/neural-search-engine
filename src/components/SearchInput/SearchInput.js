import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  setSearchLimit,
  setSearchResults,
  setSearchStatus,
  setSearchTerm,
} from "../../store/searchResultsSlice";
import { API_STATUS, SEARCH_RESULTS_LIMIT } from "../../constants";
import useSearchWebWorker from "../../hooks/useSearchWebWorker";

const SearchInput = () => {
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState("");
  const getData = useSearchWebWorker();

  const handleSearchValue = (newSearchValue) => {
    setSearchValue(newSearchValue);

    getData.postMessage(
      JSON.stringify({
        searchValue: newSearchValue,
        limit: SEARCH_RESULTS_LIMIT,
      })
    );

    dispatch(setSearchTerm(newSearchValue));
    dispatch(setSearchStatus(API_STATUS.LOADING));
    dispatch(setSearchLimit(SEARCH_RESULTS_LIMIT));
  };

  useEffect(() => {
    if (window.Worker) {
      getData.onmessage = (e) => {
        dispatch(setSearchResults(JSON.parse(e.data)));
        dispatch(setSearchStatus(API_STATUS.SUCCESS));
      };
    }
  }, [getData, dispatch]);

  return (
    <div>
      <input
        className="w-full rounded shadow-xl p-2 focus:outline-none h-12"
        placeholder="Search for anything..."
        type="text"
        autoCapitalize="false"
        autoComplete="false"
        spellCheck="false"
        value={searchValue}
        onChange={(event) => handleSearchValue(event.target.value)}
        autoFocus
      />
    </div>
  );
};

export default SearchInput;
