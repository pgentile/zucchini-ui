import { connect } from 'react-redux';
import { createSelector, createStructuredSelector } from 'reselect';
///// import { push } from 'react-router-redux';

import TagDetailsPage from './TagDetailsPage';

import { loadTagDetailsPage } from '../redux';


function parseTags(tags) {
  if (_.isString(tags)) {
    return [tags];
  }
  if (_.isEmpty(tags)) {
    return [];
  }
  return tags;
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
  },
)(TagDetailsPage);

export default TagDetailsPageContainer;
