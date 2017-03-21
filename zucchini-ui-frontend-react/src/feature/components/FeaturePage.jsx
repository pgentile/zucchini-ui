import React from 'react';

import FeatureStatsContainer from './FeatureStatsContainer';
import FeatureHistoryTableContainer from './FeatureHistoryTableContainer';
import FeatureScenarioTableContainer from './FeatureScenarioTableContainer';
import HistoryFilterContainer from '../../filters/components/HistoryFilterContainer';
import TagList from '../../ui/components/TagList';
import SimpleText from '../../ui/components/SimpleText';


export default class FeaturePage extends React.Component {

  componentDidMount() {
    this.loadFeatureIfNeeded();
  }

  componentDidUpdate(prevProps) {
    this.loadFeatureIfNeeded(prevProps);
  }

  render() {
    const { feature, featureId } = this.props;

    return (
      <div>
        <h1><b>{feature.info.keyword}</b> {feature.info.name}</h1>

        {feature.group && <p><b>Groupe : </b> {feature.group}</p>}

        <p>
          <b>Source :</b>{' '}
          <code>{feature.location.filename}</code>, ligne <code>{feature.location.line}</code>
        </p>

        {feature.tags.length > 0 && <p><b>Tags :</b> <TagList tags={feature.tags} /></p>}

        <hr />

        <h2>Statistiques</h2>
        <FeatureStatsContainer />

        <hr />

        <h2>Description</h2>
        <SimpleText text={feature.description} />

        <hr />

        <h2>Scénarii</h2>
        <FeatureScenarioTableContainer />

        <hr />

        <h2>Historique</h2>
        <HistoryFilterContainer/>
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
