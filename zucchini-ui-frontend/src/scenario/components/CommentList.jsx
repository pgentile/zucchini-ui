import PropTypes from "prop-types";
import React from "react";

import CommentContainer from "./CommentContainer";

export default class CommentList extends React.PureComponent {
  static propTypes = {
    comments: PropTypes.array.isRequired
  };

  render() {
    const { comments } = this.props;

    return comments.map((comment) => {
      return <CommentContainer key={comment.id} comment={comment} />;
    });
  }
}
