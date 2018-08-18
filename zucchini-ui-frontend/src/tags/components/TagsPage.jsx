import PropTypes from "prop-types";
import React from "react";

import TagFilterFormContainer from "./TagFilterFormContainer";
import TagsTableContainer from "./TagsTableContainer";
import toNiceDate from "../../ui/toNiceDate";

export default class TagsPage extends React.Component {
  static propTypes = {
    testRunId: PropTypes.string.isRequired,
    testRun: PropTypes.object,
    onLoad: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.loadTestRunIfPossible();
  }

  componentDidUpdate(prevProps) {
    this.loadTestRunIfPossible(prevProps);
  }

  loadTestRunIfPossible(prevProps = {}) {
    const { testRunId } = this.props;

    if (testRunId !== prevProps.testRunId) {
      this.props.onLoad({ testRunId });
    }
  }

  render() {
    const { testRunId, testRun } = this.props;

    return (
      <div>
        <h1>
          Tous les tags <small>{`Tir du ${toNiceDate(testRun.date)}`}</small>
        </h1>

        <hr />
        <TagFilterFormContainer />
        <TagsTableContainer testRunId={testRunId} />
      </div>
    );
  }
}
