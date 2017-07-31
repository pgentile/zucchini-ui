import PropTypes from 'prop-types';
import React from 'react';
import toNiceDate from '../../ui/toNiceDate';

import FailuresTableContainer from './FailuresTableContainer';
import StatsProgressBar from '../../stats/components/StatsProgressBar';

export default class FailuresPage extends React.Component {

  componentDidMount() {
    this.loadTestRunIfPossible();
  }

  componentDidUpdate(prevProps) {
    this.loadTestRunIfPossible(prevProps);
  }

  loadTestRunIfPossible(prevProps = {}) {
    const {testRunId} = this.props;

    if (testRunId !== prevProps.testRunId) {
      this.props.onLoad({testRunId});
    }
  }

  render() {
    const {testRun, stats} = this.props;

    return (
      <div>
        <h1>
          Échecs du
          {' '}
          <small>{`Tir du ${toNiceDate(testRun.date)}`}</small>
        </h1>
        <StatsProgressBar stats={stats}/>
        <hr />
        <FailuresTableContainer/>

      </div>
    );
  }

}

FailuresPage.propTypes = {
  testRunId: PropTypes.string.isRequired,
  testRun: PropTypes.object,
  failures: PropTypes.object,
  stats: PropTypes.object,
  onLoad: PropTypes.func.isRequired,
};
