import React from 'react';

import Comment from './Comment';


export default class CommentList extends React.PureComponent {

  render() {
    const { comments, testRunId } = this.props;

    const commentList = comments.map(comment => {
      return (
        <Comment key={comment.id} comment={comment} testRunId={testRunId} />
      );
    });

    return (
      <div>{commentList}</div>
    );
  }

}

CommentList.propTypes = {
  comments: React.PropTypes.array.isRequired,
  testRunId: React.PropTypes.string,
};
