import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import PurgeDialog from "./PurgeDialog";
import { purgeTestRuns } from "../redux";
import { selectTestRunTypes, selectLatestTestRuns } from "../selectors";

const selectProps = createStructuredSelector({
  testRunTypes: selectTestRunTypes,
  testRuns: selectLatestTestRuns
});

const PurgeDialogContainer = connect(selectProps, {
  onPurge: purgeTestRuns
})(PurgeDialog);

export default PurgeDialogContainer;
