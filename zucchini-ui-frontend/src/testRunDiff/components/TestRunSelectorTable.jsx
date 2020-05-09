import PropTypes from "prop-types";
import React from "react";
import Table from "react-bootstrap/Table";
import Badge from "react-bootstrap/Badge";
import { Link } from "react-router-dom";
import queryString from "query-string";

import toNiceDate from "../../ui/toNiceDate";

export default class TestRunSelectorTable extends React.PureComponent {
  static propTypes = {
    testRuns: PropTypes.arrayOf(PropTypes.object).isRequired,
    currentTestRunId: PropTypes.string.isRequired
  };

  render() {
    const { testRuns, currentTestRunId } = this.props;

    const rows = testRuns.map((testRun) => (
      <TestRunSelectorTableRow key={testRun.id} testRun={testRun} currentTestRunId={currentTestRunId} />
    ));

    return (
      <Table bordered striped>
        <thead>
          <tr>
            <th className="col-md-1">Type</th>
            <th className="col-md-1">Environnement</th>
            <th className="col-md-1">Nom</th>
            <th className="col-md-2">Tir de test</th>
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

class TestRunSelectorTableRow extends React.PureComponent {
  static propTypes = {
    testRun: PropTypes.object.isRequired,
    currentTestRunId: PropTypes.string.isRequired
  };

  render() {
    const { testRun, currentTestRunId } = this.props;

    let testRunTitle = `Tir du ${toNiceDate(testRun.date)}`;
    if (testRun.id !== currentTestRunId) {
      const target = {
        pathname: `/test-runs/${currentTestRunId}/diff`,
        search: queryString.stringify({
          otherTestRunId: testRun.id
        })
      };

      testRunTitle = <Link to={target}>{testRunTitle}</Link>;
    }

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
        <td>{testRunTitle}</td>
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
}

function nullToDash(value) {
  return value === null ? "-" : value;
}
