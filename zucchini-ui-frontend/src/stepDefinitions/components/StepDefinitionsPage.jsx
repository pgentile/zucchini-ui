import PropTypes from "prop-types";
import React, { Fragment } from "react";
import toNiceDate from "../../ui/toNiceDate";

import StepDefinitionsTableContainer from "./StepDefinitionsTableContainer";
import Page from "../../ui/components/Page";
import StepDefinitionsBreadcrumbContainer from "./StepDefinitionsBreadcrumbContainer";

export default class StepDefinitionsPage extends React.Component {
  static propTypes = {
    testRunId: PropTypes.string.isRequired,
    testRun: PropTypes.object,
    stepDefinitions: PropTypes.object,
    onLoad: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.loadTestRunStepDefinitionsIfPossible();
  }

  componentDidUpdate(prevProps) {
    this.loadTestRunStepDefinitionsIfPossible(prevProps);
  }

  loadTestRunStepDefinitionsIfPossible(prevProps = {}) {
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
            Glues <small>{`Tir du ${toNiceDate(testRun.date)}`}</small>
          </Fragment>
        }
        breadcrumb={<StepDefinitionsBreadcrumbContainer />}
      >
        <StepDefinitionsTableContainer />
      </Page>
    );
  }
}
