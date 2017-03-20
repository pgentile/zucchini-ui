import React from 'react';

import Comment from './Comment';


export default class CommentList extends React.PureComponent {

  render() {
    const { comments } = this.props;

    const commentList = comments.map(comment => {
      return (
        <Comment key={comment.id} comment={comment} />
      );
    })

    return (
      <div>
        {commentList}
      </div>
    );
  }

}

CommentList.propTypes = {
  comments: React.PropTypes.array.isRequired,
};
