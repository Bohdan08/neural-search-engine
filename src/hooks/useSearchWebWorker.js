import { useMemo } from "react";

const useSearchWebWorker = () => {
  // search worker
  const getData = useMemo(
    () =>
      new Worker(
        new URL("../longProcesses/getSearchResults.js", import.meta.url)
      ),
    []
  );

  return getData;
};

export default useSearchWebWorker;
