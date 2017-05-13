import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router'

import toNiceDate from '../../ui/toNiceDate';
import CommentText from './CommentText';
import CommentEditor from './CommentEditor';


export default class Comment extends React.PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      editMode: false,
    };
  }

  onEdit = () => {
    this.setState({
      editMode: true,
    });
  };

  onDelete = () => {
    this.props.onDelete({
      scenarioId: this.props.comment.scenarioId,
      commentId: this.props.comment.id,
    });
  };

  onSave = ({ newContent }) => {
    this.props.onChange({
      scenarioId: this.props.comment.scenarioId,
      commentId: this.props.comment.id,
      newContent,
    });

    this.setState({
      editMode: false,
    });
  };

  onCancelEdit = () => {
    this.setState({
      editMode: false,
    });
  };

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

    let commentComponent = null;
    if (this.state.editMode) {
      commentComponent = (
        <CommentEditor comment={comment} onSave={this.onSave} onCancel={this.onCancelEdit} />
      );
    } else {
      commentComponent = (
        <CommentText comment={comment} onEdit={this.onEdit} onDelete={this.onDelete} />
      );
    }

    return (
      <div>
        <h4>
          Le {toNiceDate(comment.date)}
          {' '}
          {testRunInfo}
        </h4>
        {commentComponent}
      </div>
    );
  }

}

Comment.propTypes = {
  comment: PropTypes.object.isRequired,
  testRunId: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};
