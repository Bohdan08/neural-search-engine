import React, { useEffect } from "react";
import useFormattedDataset from "../../hooks/useFormattedDataset";
import TicketRow from "../TicketRow/TicketRow";
import { useDispatch, useSelector } from "react-redux";
import { API_STATUS, SEARCH_RESULTS_LIMIT } from "../../constants";
import useSearchWebWorker from "../../hooks/useSearchWebWorker";
import {
  setSearchLimit,
  setSearchResults,
  setSearchStatus,
} from "../../store/searchResultsSlice";

const LOADING_BLOCKS = 5;

const TicketTable = () => {
  const dataset = useFormattedDataset();
  const dispatch = useDispatch();
  const { limit, status, results, searchTerm } = useSelector(
    (store) => store.searchResults
  );
  const getData = useSearchWebWorker();
  // const { loadMore } = useInfinitiveScroll();

  const hash = {};

  results.forEach((result) => {
    hash[result[0]] = result[1];
  });

  const filteredDataSet = dataset.filter(
    (_, index) => hash[index] !== undefined
  );

  const handleScroll = ({
    target: { scrollHeight, scrollTop, clientHeight },
  }) => {
    const bottom = scrollHeight - scrollTop === clientHeight;

    // if results less then limit, then we don't fetch anymore
    if (bottom && results.length === limit) {
      const newLimit = limit + SEARCH_RESULTS_LIMIT;

      getData.postMessage(
        JSON.stringify({ searchValue: searchTerm, limit: newLimit })
      );

      dispatch(setSearchLimit(newLimit));
    }
  };

  useEffect(() => {
    if (window.Worker) {
      getData.onmessage = (e) => {
        dispatch(setSearchResults(JSON.parse(e.data)));
        dispatch(setSearchStatus(API_STATUS.SUCCESS));
      };
    }
  }, [getData, dispatch]);

  if (status === API_STATUS.LOADING) {
    return (
      <div className="animate-pulse">
        <div className="flex flex-col space-y-4">
          {Array.from({ length: LOADING_BLOCKS }, (_, index) => index).map(
            (number) => (
              <div key={number} className="h-8 bg-slate-200 rounded" />
            )
          )}
        </div>
      </div>
    );
  }

  if (!results?.length && status === API_STATUS.SUCCESS) {
    return <div> No Data Found...</div>;
  }

  return (
    <div
      className="flex flex-col space-y-5 h-auto max-h-96 rounded overflow-scroll"
      onScroll={handleScroll}
    >
      {filteredDataSet.map((data, index) => (
        <TicketRow key={index} ticket={data} />
      ))}
    </div>
  );
};

export default TicketTable;
