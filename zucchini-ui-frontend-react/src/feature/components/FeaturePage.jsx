import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router'
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';

import FeatureStatsContainer from './FeatureStatsContainer';
import FeatureHistoryTableContainer from './FeatureHistoryTableContainer';
import ScenarioTableContainer from './ScenarioTableContainer';
import HistoryFilterContainer from '../../filters/components/HistoryFilterContainer';
import TagList from '../../ui/components/TagList';
import SimpleText from '../../ui/components/SimpleText';
import Status from '../../ui/components/Status';
import ScenarioStateFilterContainer from './ScenarioStateFilterContainer';
import DeleteFeatureButtonContainer from './DeleteFeatureButtonContainer';


export default class FeaturePage extends React.Component {

  componentDidMount() {
    this.loadFeatureIfNeeded();
  }

  componentDidUpdate(prevProps) {
    this.loadFeatureIfNeeded(prevProps);
  }

  loadFeatureIfNeeded(prevProps = {}) {
    const { featureId, onLoad } = this.props;
    if (featureId !== prevProps.featureId) {
      onLoad({ featureId });
    }
  }

  render() {
    const { feature, featureId } = this.props;

    return (
      <div>
        <h1>
          <b>{feature.info.keyword}</b> {feature.info.name}
          {' '}
          {feature.status && <small><Status status={feature.status} /></small>}
        </h1>

        {feature.group && <p><b>Groupe : </b> <Link to={{ pathname: `/test-runs/${feature.testRunId}`, query: { featureGroup: feature.group } }}>{feature.group}</Link></p>}

        <p>
          <b>Source :</b>{' '}
          <code>{feature.location.filename}</code>, ligne <code>{feature.location.line}</code>
        </p>

        {feature.tags.length > 0 && <p><b>Tags :</b> <TagList testRunId={feature.testRunId} tags={feature.tags} /></p>}

        <hr />
        <ButtonToolbar>
          <DeleteFeatureButtonContainer featureId={featureId} />
        </ButtonToolbar>
        <hr />

        <h2>Statistiques</h2>
        <FeatureStatsContainer />

        <hr />

        <h2>Description</h2>
        <SimpleText text={feature.description} />

        <hr />

        <h2>Scénarii</h2>
        <ScenarioStateFilterContainer />
        <ScenarioTableContainer />

        <hr />

        <h2>Historique</h2>
        <HistoryFilterContainer />
        <FeatureHistoryTableContainer featureId={featureId} />

      </div>
    );
  }

}

FeaturePage.propTypes = {
  onLoad: PropTypes.func.isRequired,
  featureId: PropTypes.string.isRequired,
  feature: PropTypes.object,
};
