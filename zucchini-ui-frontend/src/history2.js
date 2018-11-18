import { createSelector } from "reselect";
import queryString from "query-string";

export const selectQueryParams = createSelector(
  location => location.search,
  search => queryString.parse(search)
);
