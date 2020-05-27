import PropTypes from "prop-types";
import React, { memo, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import queryString from "query-string";
import { useSelector } from "react-redux";

import toNiceDate from "../../ui/toNiceDate";
import CounterBadge from "../../ui/components/CounterBadge";
import TabularDataTable, { TabularDataRow } from "../../ui/components/TabularDataTable";
import { selectLatestTestRuns } from "../../testRuns/selectors";

function TestRunSelectorTable() {
  const { sameTestRunType, sameTestRunEnvironment } = useSelector((state) => state.historyFilters);
  const { type: currentType, environment: currentEnvironment } = useSelector((state) => state.testRun.testRun);
  const testRuns = useSelector((state) => selectLatestTestRuns(state));

  const selectedTestRuns = useMemo(() => {
    let selectedTestRuns = testRuns;

    if (sameTestRunType) {
      selectedTestRuns = selectedTestRuns.filter((testRun) => testRun.type === currentType);
    }

    if (sameTestRunEnvironment) {
      selectedTestRuns = selectedTestRuns.filter((testRun) => testRun.environment === currentEnvironment);
    }

    return selectedTestRuns;
  }, [testRuns, sameTestRunType, sameTestRunEnvironment, currentType, currentEnvironment]);

  const rows = selectedTestRuns.map((testRun) => <TestRunSelectorTableRow key={testRun.id} testRun={testRun} />);

  return (
    <TabularDataTable
      columnNames={[
        "Type",
        "Environnement",
        "Nom",
        "Tir de test",
        "Total",
        "Succès",
        "Échecs",
        "En attente",
        "Non joués",
        "Analysés"
      ]}
    >
      {rows}
    </TabularDataTable>
  );
}

export default memo(TestRunSelectorTable);

const TestRunSelectorTableRow = memo(function TestRunSelectorTableRow({ testRun }) {
  const { testRunId: currentTestRunId } = useParams();

  const isSameTestRun = testRun.id === currentTestRunId;

  let testRunTitle = `Tir du ${toNiceDate(testRun.date)}`;
  if (!isSameTestRun) {
    const target = {
      pathname: `/test-runs/${currentTestRunId}/diff`,
      search: queryString.stringify({
        otherTestRunId: testRun.id
      })
    };

    testRunTitle = <Link to={target}>{testRunTitle}</Link>;
  }

  return (
    <TabularDataRow highlight={isSameTestRun}>
      <td>{testRun.type}</td>
      <td>{testRun.environment}</td>
      <td>{testRun.name}</td>
      <td>{testRunTitle}</td>
      <td>
        <CounterBadge>{testRun.stats.all.count}</CounterBadge>
      </td>
      <td>
        <CounterBadge>{testRun.stats.all.passed}</CounterBadge>
      </td>
      <td>
        <CounterBadge>{testRun.stats.all.failed}</CounterBadge>
      </td>
      <td>
        <CounterBadge>{testRun.stats.all.pending}</CounterBadge>
      </td>
      <td>
        <CounterBadge>{testRun.stats.all.notRun}</CounterBadge>
      </td>
      <td>
        <CounterBadge>{testRun.stats.reviewed.count}</CounterBadge>
      </td>
    </TabularDataRow>
  );
});

TestRunSelectorTableRow.propTypes = {
  testRun: PropTypes.object.isRequired
};
