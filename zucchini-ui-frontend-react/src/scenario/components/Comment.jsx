import React from 'react';

import toNiceDate from '../../ui/toNiceDate';
import SimpleText from '../../ui/components/SimpleText';


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
        <SimpleText text={comment.content} />
      </div>
    );
  }

}

Comment.propTypes = {
  comment: React.PropTypes.object.isRequired,
};
