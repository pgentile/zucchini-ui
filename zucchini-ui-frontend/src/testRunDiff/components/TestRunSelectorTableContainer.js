import { connect } from "react-redux";
import { createSelector, createStructuredSelector } from "reselect";

import { selectLatestTestRuns } from "../../testRuns/selectors";
import TestRunSelectorTable from "./TestRunSelectorTable";
import * as utils from "../../utils/testRunUtils";

const selectTestRuns = createSelector(
  state => selectLatestTestRuns(state),
  state => state.testRun.testRun.type || null,
  state => state.testRun.testRun.plateforme,
  state => state.historyFilters.sameTestRunType,
  state => state.historyFilters.sameTestRunEnvironnement,
  (
    testRuns,
    currentTestRunType,
    currentTestRunPlateformeInput,
    sameTestRunTypeFilter,
    sameTestRunEnvironnementFilter
  ) => {
    let selectedTestRuns = testRuns;
    var currentTestRunPlateforme = utils.getPlateforme(currentTestRunPlateformeInput, currentTestRunType);

    if (sameTestRunTypeFilter && sameTestRunEnvironnementFilter) {
      //On filtre une première fois selon le type
      selectedTestRuns = selectedTestRuns.filter(
        testRun => utils.getType(testRun.type) === utils.getType(currentTestRunType)
      );

      //On filtre une première fois selon l'environnement
      selectedTestRuns = selectedTestRuns.filter(
        testRun => utils.getPlateforme(testRun.plateforme, testRun.type) === currentTestRunPlateforme
      );
    } else if (sameTestRunTypeFilter) {
      selectedTestRuns = selectedTestRuns.filter(
        testRun => utils.getType(testRun.type) === utils.getType(currentTestRunType)
      );
    } else if (sameTestRunEnvironnementFilter) {
      selectedTestRuns = selectedTestRuns.filter(
        testRun => utils.getPlateforme(testRun.plateforme, testRun.type) === currentTestRunPlateforme
      );
    }

    return selectedTestRuns;
  }
);

const selectProps = createStructuredSelector({
  testRuns: selectTestRuns
});

export default connect(selectProps)(TestRunSelectorTable);
