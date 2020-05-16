import PropTypes from "prop-types";
import React from "react";
import Table from "react-bootstrap/Table";
import Badge from "react-bootstrap/Badge";
import { Link } from "react-router-dom";
import queryString from "query-string";

import toNiceDate from "../../ui/toNiceDate";
import CounterBadge from "../../ui/components/CounterBadge";

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
}
