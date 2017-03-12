import React from 'react';

import BasePage from '../../ui/components/BasePage';
import toNiceDate from '../../ui/toNiceDate';
import FeatureStateFilterContainer from '../../filters/components/FeatureStateFilterContainer';
import TestRunHistoryTableContainer from './TestRunHistoryTableContainer';
import ScenarioStatsContainer from './ScenarioStatsContainer';
import TestRunFeatureTableContainer from './TestRunFeatureTableContainer';
import FeatureGroupFilterContainer from './FeatureGroupFilterContainer';


export default class TestRunPage extends React.Component {

  componentDidMount() {
    this.loadTestRunIfPossible({});
  }

  componentDidUpdate(prevProps) {
    this.loadTestRunIfPossible(prevProps);
  }

  render() {
    const { testRunId, testRun, selectedFeatureGroup } = this.props;

    return (
      <BasePage title={`Tir du ${toNiceDate(testRun.date)}`}>

        <hr />
        <h2>Statistiques</h2>
        <ScenarioStatsContainer />

        <hr />
        <h2>Fonctionnalités</h2>
        <FeatureGroupFilterContainer testRunId={testRunId} />
        <FeatureStateFilterContainer />
        <TestRunFeatureTableContainer testRunId={testRunId} selectedFeatureGroup={selectedFeatureGroup} />

        <h2>Historique</h2>
        <TestRunHistoryTableContainer testRunId={testRunId} />

      </BasePage>
    );
  }

  loadTestRunIfPossible(prevProps) {
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
