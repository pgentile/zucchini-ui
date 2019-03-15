import { connect } from "react-redux";
import { createSelector, createStructuredSelector } from "reselect";

import TestRunsTable from "./TestRunsTable";

import { selectLatestTestRuns } from "../selectors";

import * as utils from "../../utils/testRunUtils";

const selectTestRuns = createSelector(
  state => selectLatestTestRuns(state),
  (state, ownProps) => ownProps.selectedType,
  (state, ownProps) => ownProps.selectedNom,
  (testRuns, selectedType, selectedNom) => {
    var selectedTestRuns = testRuns;
    if (selectedType && selectedNom) {
      //On filtre une première fois selon le type
      selectedTestRuns = selectedTestRuns.filter(testRun => utils.getType(testRun.type) === selectedType);
      //On filtre une première fois selon le nom
      //selectedTestRuns = selectedTestRuns.filter(testRun => utils.getNom(testRun.nom,testRun.type) === selectedNom);
      selectedTestRuns = selectedTestRuns.filter(testRun => utils.getType(testRun.type) === selectedType);
    } else if (selectedType) {
      selectedTestRuns = selectedTestRuns.filter(testRun => utils.getType(testRun.type) === selectedType);
    } else if (selectedNom) {
      selectedTestRuns = selectedTestRuns.filter(testRun => utils.getNom(testRun.nom, testRun.type) === selectedNom);
    }
    return selectedTestRuns;
  }
);

const selectProps = createStructuredSelector({
  testRuns: selectTestRuns
});

const TestRunsTableContainer = connect(selectProps)(TestRunsTable);

export default TestRunsTableContainer;
