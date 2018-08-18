import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import TestRunTypeFilterPopover from "./TestRunTypeFilterPopover";
import { selectTestRunTypes } from "../selectors";

const selectProps = createStructuredSelector({
  testRunTypes: selectTestRunTypes
});

export default connect(selectProps)(TestRunTypeFilterPopover);
