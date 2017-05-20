import PropTypes from 'prop-types';
import React from 'react';

import toNiceDate from '../../ui/toNiceDate';
import FeatureStateFilterContainer from '../../filters/components/FeatureStateFilterContainer';
import ScenarioStateFilterContainer from '../../filters/components/ScenarioStateFilterContainer';
import TagDetailsStatsContainer from './TagDetailsStatsContainer';
import TagDetailsFeatureTableContainer from './TagDetailsFeatureTableContainer';
import TagDetailsScenarioTableContainer from './TagDetailsScenarioTableContainer';
import TagSelectionForm from './TagSelectionForm';


export default class TagDetailsPage extends React.Component {

  componentDidMount() {
    this.loadPageIfPossible();
  }

  componentDidUpdate(prevProps) {
    this.loadPageIfPossible(prevProps);
  }

  loadPageIfPossible(prevProps = {}) {
    const { testRunId, tags, excludedTags } = this.props;

    if (testRunId !== prevProps.testRunId || tags !== prevProps.tags || excludedTags !== prevProps.excludedTags) {
      this.props.onLoad({ testRunId, tags, excludedTags });
    }
  }

  onUpdateTags = ({ tags, excludedTags }) => {
    return this.props.onUpdate({
      testRunId: this.props.testRunId,
      tags: tags.filter(tag => !!tag),
      excludedTags: excludedTags.filter(tag => !!tag),
    });
  };

  render() {
    const { testRun, tags, excludedTags } = this.props;

    const includedTagsStr = tags
      .map(tag => `@${tag}`)
      .join(' ');

    const excludedTagsStr = excludedTags
      .map(tag => `~@${tag}`)
      .join(' ');

    return (
      <div>
        <h1>
          Tags {includedTagsStr} {excludedTagsStr}
          {' '}
          <small>{`Tir du ${toNiceDate(testRun.date)}`}</small>
        </h1>

        <hr />

        <TagSelectionForm
          initialValues={{ tags, excludedTags }}
          enableReinitialize
          onSubmit={this.onUpdateTags} />

        <hr />

        <h2>Statistiques</h2>
        <TagDetailsStatsContainer />

        <hr />

        <h2>Fonctionnalités</h2>
        <FeatureStateFilterContainer />
        <TagDetailsFeatureTableContainer />

        <hr />

        <h2>Scénarios</h2>
        <ScenarioStateFilterContainer />
        <TagDetailsScenarioTableContainer />

      </div>
    );
  }
}

TagDetailsPage.propTypes = {
  testRunId: PropTypes.string.isRequired,
  testRun: PropTypes.object,
  tags: PropTypes.array.isRequired,
  excludedTags: PropTypes.array.isRequired,
  onLoad: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
};
