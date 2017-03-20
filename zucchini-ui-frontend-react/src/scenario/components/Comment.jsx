import React from 'react';

import toNiceDate from '../../ui/toNiceDate';


export default class Comment extends React.PureComponent {

  render() {
    const { comment } = this.props;

    return (
      <div>
        <h4>
          Le {toNiceDate(comment.date)}
          {' '}
          <small>
            (TODO TEST RUN REFERENCE)
          </small>
        </h4>
        <p>{comment.content}</p>
      </div>
    );
  }

}

Comment.propTypes = {
  comment: React.PropTypes.object.isRequired,
};
