import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";
import queryString from "query-string";

import toNiceDate from "../../ui/toNiceDate";
import CounterBadge from "../../ui/components/CounterBadge";
import TabularDataTable, { TabularDataRow } from "../../ui/components/TabularDataTable";

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
}

class TestRunSelectorTableRow extends React.PureComponent {
  static propTypes = {
    testRun: PropTypes.object.isRequired,
    currentTestRunId: PropTypes.string.isRequired
  };

  render() {
    const { testRun, currentTestRunId } = this.props;

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
  }
}
