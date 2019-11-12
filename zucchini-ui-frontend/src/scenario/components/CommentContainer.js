import { connect } from "react-redux";
import { createSelector, createStructuredSelector } from "reselect";

import Comment from "./Comment";

import { deleteComment, updateCommentThenReload } from "../redux";

const selectTestRunId = createSelector(
  state => state.scenario.scenario.testRunId || null,
  testRunId => testRunId
);

const selectProps = createStructuredSelector({
  testRunId: selectTestRunId
});

const CommentContainer = connect(selectProps, {
  onDelete: deleteComment,
  onChange: updateCommentThenReload
})(Comment);

export default CommentContainer;
