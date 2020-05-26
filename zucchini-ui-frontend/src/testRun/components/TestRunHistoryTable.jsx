import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import toNiceDate from "../../ui/toNiceDate";
import CounterBadge from "../../ui/components/CounterBadge";
import TabularDataTable, { TabularDataRow } from "../../ui/components/TabularDataTable";

export default function TestRunHistoryTable() {
  const history = useSelector((state) => state.testRun.history);

  const rows = history.map((testRun) => {
    return <TestRunHistoryTableTableRow key={testRun.id} testRun={testRun} />;
  });

  return (
    <TabularDataTable columnNames={["Tir de test", "Total", "Succès", "Échecs", "En attente", "Non joués", "Analysés"]}>
      {rows}
    </TabularDataTable>
  );
}

function TestRunHistoryTableTableRow({ testRun }) {
  const testRunId = useSelector((state) => state.testRun.testRun.id);

  return (
    <TabularDataRow highlight={testRun.id === testRunId}>
      <td>
        <Link to={`/test-runs/${testRun.id}`}>Tir du {toNiceDate(testRun.date)}</Link>
      </td>
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
}

TestRunHistoryTableTableRow.propTypes = {
  testRun: PropTypes.object.isRequired
};
