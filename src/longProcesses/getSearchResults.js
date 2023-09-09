/* eslint-disable no-restricted-globals */
import { Search, Engine } from "../search-engine";
import formatDataset from "../utils/formatDataset";

self.onmessage = (e) => {
  const docs = formatDataset();
  const engine = Engine(docs);

  const { searchValue, limit } = JSON.parse(e.data);

  const response = Search(engine, searchValue, limit);

  self.postMessage(JSON.stringify(response));
};

export {};
