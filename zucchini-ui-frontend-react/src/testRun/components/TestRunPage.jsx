import React from 'react';

import toNiceDate from '../../ui/toNiceDate';
import FeatureStateFilterContainer from './FeatureStateFilterContainer';
import TestRunHistoryTableContainer from './TestRunHistoryTableContainer';
import TestRunStatsContainer from './TestRunStatsContainer';
import TestRunFeatureTableContainer from './TestRunFeatureTableContainer';
import FeatureGroupFilterContainer from './FeatureGroupFilterContainer';


export default class TestRunPage extends React.Component {

  componentDidMount() {
    this.loadTestRunIfPossible();
  }

  componentDidUpdate(prevProps) {
    this.loadTestRunIfPossible(prevProps);
  }

  render() {
    const { testRunId, testRun, selectedFeatureGroup } = this.props;

    const labels = testRun.labels.map(label => {
      let value = label.value;
      if (label.url) {
        value = (
          <a href={label.url} target="_blank">{label.value}</a>
        );
      }

      return (
        <p>
          <b>{label.name} :</b> {value}
        </p>
      );
    });

    return (
      <div>
        <h1>{`Tir du ${toNiceDate(testRun.date)}`}</h1>
        {labels}

        <hr />
        <h2>Statistiques</h2>
        <TestRunStatsContainer />

        <hr />
        <h2>Fonctionnalités</h2>
        <FeatureGroupFilterContainer testRunId={testRunId} />
        <FeatureStateFilterContainer />
        <TestRunFeatureTableContainer testRunId={testRunId} selectedFeatureGroup={selectedFeatureGroup} />

        <h2>Historique</h2>
        <TestRunHistoryTableContainer testRunId={testRunId} />

      </div>
    );
  }

  loadTestRunIfPossible(prevProps = {}) {
    const { testRunId } = this.props;

    if (testRunId !== prevProps.testRunId) {
      this.props.onLoad({ testRunId: this.props.testRunId });
    }
  }

}

TestRunPage.propTypes = {
  testRunId: React.PropTypes.string.isRequired,
  selectedFeatureGroup: React.PropTypes.string,
  testRun: React.PropTypes.object,
  onLoad: React.PropTypes.func.isRequired,
};
