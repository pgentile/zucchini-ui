import PropTypes from "prop-types";
import React, { useMemo } from "react";
import Table from "react-bootstrap/Table";
import Badge from "react-bootstrap/Badge";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import toNiceDate from "../../ui/toNiceDate";
import { selectLatestTestRuns } from "../selectors";
import useQueryParams from "../../useQueryParams";

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
        <Badge pill>{nullToDash(testRun.stats.all.count)}</Badge>
      </td>
      <td>
        <Badge pill>{nullToDash(testRun.stats.all.passed)}</Badge>
      </td>
      <td>
        <Badge pill>{nullToDash(testRun.stats.all.failed)}</Badge>
      </td>
      <td>
        <Badge pill>{nullToDash(testRun.stats.all.pending)}</Badge>
      </td>
      <td>
        <Badge pill>{nullToDash(testRun.stats.all.notRun)}</Badge>
      </td>
      <td>
        <Badge pill>{nullToDash(testRun.stats.reviewed.count)}</Badge>
      </td>
    </tr>
  );
}

TestRunTableRow.propTypes = {
  testRun: PropTypes.object.isRequired
};

function nullToDash(value) {
  return value === null ? "-" : value;
}
