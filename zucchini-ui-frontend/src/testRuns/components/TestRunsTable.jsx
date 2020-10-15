import PropTypes from "prop-types";
import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import toNiceDate from "../../ui/toNiceDate";
import { selectLatestTestRuns } from "../selectors";
import useQueryParams from "../../useQueryParams";
import CounterBadge from "../../ui/components/CounterBadge";
import TabularDataTable, { TabularDataRow } from "../../ui/components/TabularDataTable";

export default function TestRunsTable() {
  const testRuns = useSelector(selectLatestTestRuns);
  const { type } = useQueryParams();

  const selectedTestRuns = useMemo(() => {
    let selectedTestRuns = testRuns;
    if (type) {
      selectedTestRuns = selectedTestRuns.filter((testRun) => testRun.type === type);
    }
    return selectedTestRuns;
  }, [testRuns, type]);

  const rows = selectedTestRuns.map((testRun) => <TestRunTableRow key={testRun.id} testRun={testRun} />);

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
      emptyDescription="Aucun tir"
    >
      {rows}
    </TabularDataTable>
  );
}

function TestRunTableRow({ testRun }) {
  return (
    <TabularDataRow>
      <td>{testRun.type}</td>
      <td>{testRun.environment}</td>
      <td>{testRun.name}</td>
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

TestRunTableRow.propTypes = {
  testRun: PropTypes.object.isRequired
};
