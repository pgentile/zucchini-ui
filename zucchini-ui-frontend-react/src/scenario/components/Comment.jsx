import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router'

import toNiceDate from '../../ui/toNiceDate';
import SimpleText from '../../ui/components/SimpleText';


export default class Comment extends React.PureComponent {

  render() {
    const { comment, testRunId } = this.props;

    let testRunInfo = null;
    if (comment.testRunId === testRunId) {
      testRunInfo = (
        <small><i>(tir de test actuel)</i></small>
      );
    } else if (comment.testRun) {
      testRunInfo = (
        <small>
          (tir du
          {' '}
          <Link to={`/scenarios/${comment.scenarioId}`}>{toNiceDate(comment.testRun.date)}</Link>,
          {' '}
          type <Link to={{ pathname: '/', query: { type: comment.testRun.type } }}>{comment.testRun.type}</Link>
          )
        </small>
      );
    } else {
      testRunInfo = (
        <small><i>(tir supprimé)</i></small>
      );
    }

    return (
      <div>
        <h4>
          Le {toNiceDate(comment.date)}
          {' '}
          {testRunInfo}
        </h4>
        <SimpleText text={comment.content} />
      </div>
    );
  }

}

Comment.propTypes = {
  comment: PropTypes.object.isRequired,
  testRunId: PropTypes.string,
};
