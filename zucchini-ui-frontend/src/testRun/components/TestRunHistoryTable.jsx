import PropTypes from "prop-types";
import React from "react";
import Table from "react-bootstrap/Table";
import Badge from "react-bootstrap/Badge";
import { Link } from "react-router-dom";

import toNiceDate from "../../ui/toNiceDate";

export default class TestRunHistoryTable extends React.PureComponent {
  static propTypes = {
    testRunId: PropTypes.string.isRequired,
    testRunType: PropTypes.string,
    history: PropTypes.arrayOf(PropTypes.object)
  };

  render() {
    const { history, testRunId } = this.props;

    const rows = history.map((testRun) => {
      const isActive = testRun.id === testRunId;
      return <TestRunHistoryTableTableRow key={testRun.id} testRun={testRun} isActive={isActive} />;
    });

    return (
      <Table bordered striped hover>
        <thead>
          <tr>
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

class TestRunHistoryTableTableRow extends React.PureComponent {
  static propTypes = {
    testRun: PropTypes.object.isRequired,
    isActive: PropTypes.bool.isRequired
  };

  render() {
    const { testRun, isActive } = this.props;
    const className = isActive ? "info" : null;

    return (
      <tr className={className}>
        <td>
          <Link to={`/test-runs/${testRun.id}`}>Tir du {toNiceDate(testRun.date)}</Link>
        </td>
        <td>
          <Badge>{testRun.stats.all.count}</Badge>
        </td>
        <td>
          <Badge>{testRun.stats.all.passed}</Badge>
        </td>
        <td>
          <Badge>{testRun.stats.all.failed}</Badge>
        </td>
        <td>
          <Badge>{testRun.stats.all.pending}</Badge>
        </td>
        <td>
          <Badge>{testRun.stats.all.notRun}</Badge>
        </td>
        <td>
          <Badge>{testRun.stats.reviewed.count}</Badge>
        </td>
      </tr>
    );
  }
}
