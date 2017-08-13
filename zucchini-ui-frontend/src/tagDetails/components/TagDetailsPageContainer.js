import { connect } from 'react-redux';
import { createSelector, createStructuredSelector } from 'reselect';
import { push } from 'react-router-redux';
import isString from 'lodash/isString';
import isEmpty from 'lodash/isEmpty';

import TagDetailsPage from './TagDetailsPage';

import { loadTagDetailsPage } from '../redux';


function parseTags(tags) {
  if (isString(tags)) {
    return [tags];
  }
  if (isEmpty(tags)) {
    return [];
  }
  return tags;
}


function updatePage({ testRunId, tags, excludedTags }) {
  return push({
    pathname: `/test-runs/${testRunId}/tag-details`,
    query: {
      tag: tags,
      excludedTag: excludedTags,
    },
  });
}

const selectTags = createSelector(
  (state, ownProps) => ownProps.location.query.tag,
  parseTags,
);

const selectExcludedTags = createSelector(
  (state, ownProps) => ownProps.location.query.excludedTag,
  parseTags,
);


const selectTestRunId = createSelector(
  (state, ownProps) => ownProps.params.testRunId,
  testRunId => testRunId,
);

const selectTestRun = createSelector(
  state => state.testRun.testRun,
  testRun => testRun,
);

const selectProps = createStructuredSelector({
  testRunId: selectTestRunId,
  testRun: selectTestRun,
  tags: selectTags,
  excludedTags: selectExcludedTags,
});


const TagDetailsPageContainer = connect(
  selectProps,
  {
    onLoad: loadTagDetailsPage,
    onUpdate: updatePage,
  },
)(TagDetailsPage);

export default TagDetailsPageContainer;
