import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import TestRunTypeFilter from "./TestRunTypeFilter";
import { selectTestRunTypes } from "../selectors";

const selectProps = createStructuredSelector({
  testRunTypes: selectTestRunTypes
});

const TestRunTypeFilterContainer = connect(selectProps)(TestRunTypeFilter);

export default TestRunTypeFilterContainer;
