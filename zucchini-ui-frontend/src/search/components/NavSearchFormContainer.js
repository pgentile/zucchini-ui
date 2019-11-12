// FIXME A réintégrer

import { connect } from "react-redux";
import { createSelector, createStructuredSelector } from "reselect";

import NavSearchForm from "./NavSearchForm";
import { search } from "../redux";

const selectTestRunId = createSelector(
  state => state.testRun.testRun.id,
  testRunId => testRunId || null
);

const selectProps = createStructuredSelector({
  testRunId: selectTestRunId
});

const FeatureGroupFilterContainer = connect(selectProps, {
  onSearch: search
})(NavSearchForm);

export default FeatureGroupFilterContainer;
