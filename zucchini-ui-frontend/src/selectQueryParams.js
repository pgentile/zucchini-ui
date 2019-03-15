import { createSelector } from "reselect";
import queryString from "query-string";

export default createSelector(
  location => location.search,
  search => queryString.parse(search)
);
