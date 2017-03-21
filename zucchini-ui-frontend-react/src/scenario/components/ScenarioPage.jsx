import React from 'react';

import TagList from '../../ui/components/TagList';
import Status from '../../ui/components/Status';
import HistoryFilterContainer from '../../filters/components/HistoryFilterContainer';
import ScenarioHistoryTableContainer from './ScenarioHistoryTableContainer';
import CommentListContainer from './CommentListContainer';
import ScenarioChangeTable from './ScenarioChangeTable';
import ScenarioDetails from './ScenarioDetails';


export default class ScenarioPage extends React.Component {

  componentDidMount() {
    this.loadScenarioIfNeeded();
  }

  componentDidUpdate(prevProps) {
    this.loadScenarioIfNeeded(prevProps);
  }

  render() {
    const { scenario } = this.props;

    return (
      <div>
        <h1>
          <b>{scenario.info.keyword}</b> {scenario.info.name}
          {' '}
          {scenario.status && <small><Status status={scenario.status} /></small>}
        </h1>

        {scenario.allTags.length > 0 && <p><b>Tags :</b> <TagList tags={scenario.allTags} /></p>}

        <hr />

        <h2>Étapes du scénario</h2>
        <ScenarioDetails scenario={scenario} />

        <hr />

        <h2>Commentaires</h2>
        <CommentListContainer />

        <hr />

        <h2>Changements</h2>
        <ScenarioChangeTable changes={this.props.scenario.changes} />

        <hr />

        <h2>Historique</h2>
        <HistoryFilterContainer />
        <ScenarioHistoryTableContainer scenarioId={this.props.scenarioId} />

      </div>
    );
  }

  loadScenarioIfNeeded(prevProps = {}) {
    const { scenarioId, onLoad } = this.props;
    if (scenarioId !== prevProps.scenarioId) {
      onLoad({ scenarioId });
    }
  }

}

ScenarioPage.propTypes = {
  onLoad: React.PropTypes.func.isRequired,
  scenarioId: React.PropTypes.string.isRequired,
  scenario: React.PropTypes.object,
};
