import React from 'react';

import TagList from '../../ui/components/TagList';


export default class ScenarioPage extends React.Component {

  componentDidMount() {
    this.loadScenarioIfNeeded();
  }

  componentDidUpdate(prevProps) {
    this.loadScenarioIfNeeded(prevProps);
  }

  render() {
    const { scenario } = this.props;

    let tagList = null;
    if (scenario.tags.length > 0) {
      tagList = (
        <p>
          <b>Tags :</b>{' '}
          <TagList tags={scenario.tags} />
        </p>
      );
    }

    return (
      <div>
        <h1><b>{scenario.info.keyword}</b> {scenario.info.name}</h1>
        {tagList}
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
