import { connect } from "react-redux";
import { createSelector, createStructuredSelector } from "reselect";

import CommentList from "./CommentList";

const selectComments = createSelector(
  (state) => state.scenario.comments,
  (comments) => comments
);

const selectProps = createStructuredSelector({
  comments: selectComments
});

const CommentListContainer = connect(selectProps)(CommentList);

export default CommentListContainer;
