import React from 'react';

import FeatureStatsContainer from './FeatureStatsContainer';
import FeatureHistoryTableContainer from './FeatureHistoryTableContainer';
import FeatureScenarioTableContainer from './FeatureScenarioTableContainer';

import TagList from '../../ui/components/TagList';


export default class FeaturePage extends React.Component {

  componentDidMount() {
    this.loadFeatureIfNeeded();
  }

  componentDidUpdate(prevProps) {
    this.loadFeatureIfNeeded(prevProps);
  }

  render() {
    const { feature, featureId } = this.props;

    let tagList = null;
    if (feature.tags.length > 0) {
      tagList = (
        <p>
          <b>Tags :</b>{' '}
          <TagList tags={feature.tags} />
        </p>
      );
    }

    return (
      <div>
        <h1><b>{feature.info.keyword}</b> {feature.info.name}</h1>

        {feature.group && <p><b>Groupe : </b> {feature.group}</p>}

        <p>
          <b>Source :</b>{' '}
          <code>{feature.location.filename}</code>, ligne <code>{feature.location.line}</code>
        </p>

        {tagList}

        <hr />

        <h2>Statistiques</h2>
        <FeatureStatsContainer />

        <hr />

        <h2>Scénarii</h2>
        <FeatureScenarioTableContainer />

        <hr />

        <h2>Historique</h2>
        <FeatureHistoryTableContainer featureId={featureId} />

      </div>
    );
  }

  loadFeatureIfNeeded(prevProps = {}) {
    const { featureId, onLoad } = this.props;
    if (featureId !== prevProps.featureId) {
      onLoad({ featureId });
    }
  }

}

FeaturePage.propTypes = {
  onLoad: React.PropTypes.func.isRequired,
  featureId: React.PropTypes.string.isRequired,
  feature: React.PropTypes.object,
};
