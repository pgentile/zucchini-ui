import { connect } from 'react-redux';
import { createSelector, createStructuredSelector } from 'reselect';

import Comment from './Comment';


const selectComment = createSelector(
  (state, ownProps) => ownProps.comment,
  comment => comment,
);

const selectTestRunId = createSelector(
  state => state.scenario.scenario.testRunId || null,
  testRunId => testRunId,
);


const selectProps = createStructuredSelector({
  comment: selectComment,
  testRunId: selectTestRunId,
});


const CommentContainer = connect(
  selectProps,
)(Comment);

export default CommentContainer;
