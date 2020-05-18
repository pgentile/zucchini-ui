import PropTypes from "prop-types";
import React, { useMemo } from "react";
import Table from "react-bootstrap/Table";
import Badge from "react-bootstrap/Badge";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import toNiceDate from "../../ui/toNiceDate";
import { selectLatestTestRuns } from "../selectors";
import useQueryParams from "../../useQueryParams";
import CounterBadge from "../../ui/components/CounterBadge";

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
    <Table bordered striped responsive>
      <thead>
        <tr>
          <th>Type</th>
          <th>Environnement</th>
          <th>Nom</th>
          <th>Tir de test</th>
          <th>Total</th>
          <th>Succès</th>
          <th>Échecs</th>
          <th>En attente</th>
          <th>Non joués</th>
          <th>Analysés</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </Table>
  );
}

function TestRunTableRow({ testRun }) {
  return (
    <tr>
      <td>
        <Badge>{testRun.type}</Badge>
      </td>
      <td>
        <Badge>{testRun.environment}</Badge>
      </td>
      <td>
        <Badge>{testRun.name}</Badge>
      </td>
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
    </tr>
  );
}

TestRunTableRow.propTypes = {
  testRun: PropTypes.object.isRequired
};
