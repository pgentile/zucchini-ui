import PropTypes from 'prop-types';
import React from 'react';

import toNiceDate from '../../ui/toNiceDate';
import TagDetailsStatsContainer from './TagDetailsStatsContainer';


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

        <h2>Statistiques</h2>
        <TagDetailsStatsContainer />

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
};
