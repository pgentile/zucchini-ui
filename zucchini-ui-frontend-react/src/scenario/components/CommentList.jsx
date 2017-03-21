import React from 'react';

import CommentContainer from './CommentContainer';


export default class CommentList extends React.PureComponent {

  render() {
    const { comments } = this.props;

    const commentList = comments.map(comment => {
      return (
        <CommentContainer key={comment.id} comment={comment} />
      );
    });

    return (
      <div>{commentList}</div>
    );
  }

}

CommentList.propTypes = {
  comments: React.PropTypes.array.isRequired,
};
