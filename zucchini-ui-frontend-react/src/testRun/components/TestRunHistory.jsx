import React from 'react';
import Table from 'react-bootstrap/lib/Table';
import Badge from 'react-bootstrap/lib/Badge';
import { Link } from 'react-router'

import toNiceDate from '../../ui/toNiceDate';


export default class TestRunHistory extends React.Component {

  componentDidMount() {
    this.loadHistoryIfPossible({});
  }

  componentDidUpdate(prevProps) {
    this.loadHistoryIfPossible(prevProps);
  }

  render() {
    const { history, testRunId } = this.props;

    const rows = history.map(testRun => {
      const isActive = (testRun.id === testRunId);
      return (
        <TestRunHistoryTableRow key={testRun.id} testRun={testRun} isActive={isActive} />
      )
    });

    return (
      <Table bordered striped hover>
        <thead>
          <tr>
            <th className="col-md-6">Tir de test</th>
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

  loadHistoryIfPossible(prevProps) {
    const { testRunType, testRunId } = this.props;

    if (testRunType && testRunType !== prevProps.testRunType) {
      this.props.onLoad({ testRunType, testRunId });
    }
  }

}

TestRunHistory.propTypes = {
  testRunId: React.PropTypes.string.isRequired,
  testRunType: React.PropTypes.string,
  history: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  onLoad: React.PropTypes.func.isRequired,
};


class TestRunHistoryTableRow extends React.PureComponent {

  render() {
    const { testRun, isActive } = this.props;
    const className = isActive ? 'info' : null;

    return (
      <tr className={className}>
        <td>
          <Link to={`/test-runs/${testRun.id}`}>Tir du {toNiceDate(testRun.date)}</Link>
        </td>
        <td><Badge>{testRun.stats.all.count}</Badge></td>
        <td><Badge>{testRun.stats.all.passed}</Badge></td>
        <td><Badge>{testRun.stats.all.failed}</Badge></td>
        <td><Badge>{testRun.stats.all.pending}</Badge></td>
        <td><Badge>{testRun.stats.all.notRun}</Badge></td>
        <td><Badge>{testRun.stats.reviewed.count}</Badge></td>
      </tr>
    );
  }

}

TestRunHistoryTableRow.propTypes = {
  testRun: React.PropTypes.object.isRequired,
  isActive: React.PropTypes.bool.isRequired,
};
