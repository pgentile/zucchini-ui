import PropTypes from "prop-types";
import React from "react";
import Table from "react-bootstrap/lib/Table";
import Badge from "react-bootstrap/lib/Badge";
import Label from "react-bootstrap/lib/Label";
import { Link } from "react-router-dom";

import toNiceDate from "../../ui/toNiceDate";

export default class TestRunsTable extends React.PureComponent {
  static propTypes = {
    testRuns: PropTypes.arrayOf(PropTypes.object).isRequired
  };

  render() {
    const { testRuns } = this.props;

    const rows = testRuns.map(testRun => <TestRunTableRow key={testRun.id} testRun={testRun} />);

    return (
      <Table bordered striped>
        <thead>
          <tr>
            <th className="col-md-1">Type</th>
            <th className="col-md-1">Environnement</th>
            <th className="col-md-1">Nom</th>
            <th className="col-md-3">Tir de test</th>
            <th className="col-md-1">Total</th>
            <th className="col-md-1">Succès</th>
            <th className="col-md-1">Échecs</th>
            <th className="col-md-1">En attente</th>
            <th className="col-md-1">Non joués</th>
            <th className="col-md-1">Analysés</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    );
  }
}

class TestRunTableRow extends React.PureComponent {
  static propTypes = {
    testRun: PropTypes.object.isRequired
  };

  render() {
    const { testRun } = this.props;

    return (
      <tr>
        <td>
          <Label>{testRun.type}</Label>
        </td>
        <td>
          <Label>{testRun.environment}</Label>
        </td>
        <td>
          <Label>{testRun.name}</Label>
        </td>
        <td>
          <Link to={`/test-runs/${testRun.id}`}>Tir du {toNiceDate(testRun.date)}</Link>
        </td>
        <td>
          <Badge>{nullToDash(testRun.stats.all.count)}</Badge>
        </td>
        <td>
          <Badge>{nullToDash(testRun.stats.all.passed)}</Badge>
        </td>
        <td>
          <Badge>{nullToDash(testRun.stats.all.failed)}</Badge>
        </td>
        <td>
          <Badge>{nullToDash(testRun.stats.all.pending)}</Badge>
        </td>
        <td>
          <Badge>{nullToDash(testRun.stats.all.notRun)}</Badge>
        </td>
        <td>
          <Badge>{nullToDash(testRun.stats.reviewed.count)}</Badge>
        </td>
      </tr>
    );
  }
}

function nullToDash(value) {
  return value === null ? "-" : value;
}
