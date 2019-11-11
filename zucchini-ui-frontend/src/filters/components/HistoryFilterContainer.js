import { connect } from "react-redux";
import { createSelector, createStructuredSelector } from "reselect";

import HistoryFilter from "./HistoryFilter";
import { updateHistoryFilters } from "../../filters/redux";

const selectFilters = createSelector(
  state => state.historyFilters,
  historyFilters => historyFilters
);

const selectProps = createStructuredSelector({
  filters: selectFilters
});

const HistoryFilterContainer = connect(selectProps, {
  onFilterChange: updateHistoryFilters
})(HistoryFilter);

export default HistoryFilterContainer;
