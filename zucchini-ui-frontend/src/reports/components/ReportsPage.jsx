import PropTypes from "prop-types";
import React from "react";
import toNiceDate from "../../ui/toNiceDate";

import ReportsTableContainer from "./ReportsTableContainer";

export default class ReportsPage extends React.Component {
  static propTypes = {
    testRunId: PropTypes.string.isRequired,
    testRun: PropTypes.object,
    onLoad: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.loadTestRunReportsIfPossible();
  }

  componentDidUpdate(prevProps) {
    this.loadTestRunReportsIfPossible(prevProps);
  }

  loadTestRunReportsIfPossible(prevProps = {}) {
    const { testRunId } = this.props;

    if (testRunId !== prevProps.testRunId) {
      this.props.onLoad({ testRunId });
    }
  }

  render() {
    const { testRun } = this.props;

    return (
      <div>
        <h1>
          Bilan <small>{`Tir du ${toNiceDate(testRun.date)}`}</small>
        </h1>
        <ReportsTableContainer />
      </div>
    );
  }
}
