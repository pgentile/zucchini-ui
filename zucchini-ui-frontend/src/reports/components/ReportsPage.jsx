import PropTypes from "prop-types";
import React, { Fragment } from "react";
import toNiceDate from "../../ui/toNiceDate";

import ReportsTableContainer from "./ReportsTableContainer";
import Page from "../../ui/components/Page";
import ReportsBreadcrumbContainer from "./ReportsBreadcrumbContainer";

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
      <Page
        title={
          <Fragment>
            Bilan <small>{`Tir du ${toNiceDate(testRun.date)}`}</small>
          </Fragment>
        }
        breadcrumb={<ReportsBreadcrumbContainer />}
      >
        <ReportsTableContainer />
      </Page>
    );
  }
}
