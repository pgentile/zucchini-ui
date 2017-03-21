import { connect } from 'react-redux';
import { createSelector, createStructuredSelector } from 'reselect';

import CommentList from './CommentList';


const selectComments = createSelector(
  state => state.scenario.comments,
  comments => comments,
);

const selectTestRunId = createSelector(
  state => state.scenario.scenario.testRunId || null,
  testRunId => testRunId,
);


const selectProps = createStructuredSelector({
  comments: selectComments,
  testRunId: selectTestRunId,
});


const CommentListContainer = connect(
  selectProps,
)(CommentList);

export default CommentListContainer;
