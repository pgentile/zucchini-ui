import PropTypes from "prop-types";
import React from "react";

import toNiceDate from "../../ui/toNiceDate";
import FoundScenarioTableContainer from "./FoundScenarioTableContainer";
import Page from "../../ui/components/Page";
import TestRunSearchBreadcrumbContainer from "./TestRunSearchBreadcrumbContainer";
import SearchForm from "./SearchForm";

export default class TestRunSearchPage extends React.Component {
  static propTypes = {
    onLoad: PropTypes.func.isRequired,
    onSearch: PropTypes.func.isRequired,
    search: PropTypes.string.isRequired,
    testRunId: PropTypes.string.isRequired,
    testRun: PropTypes.object.isRequired
  };

  componentDidMount() {
    this.loadTestRunIfPossible();
    this.searchOnLoad();
  }

  componentDidUpdate(prevProps) {
    this.loadTestRunIfPossible(prevProps);
  }

  loadTestRunIfPossible(prevProps = {}) {
    const { testRunId } = this.props;

    if (testRunId !== prevProps.testRunId) {
      this.props.onLoad({ testRunId: this.props.testRunId });
    }
  }

  searchOnLoad() {
    const { testRunId, search } = this.props;

    if (search && testRunId) {
      this.props.onSearch({ testRunId, search });
    }
  }

  render() {
    const { testRun } = this.props;

    return (
      <Page
        title={"Rechercher dans le tir du " + toNiceDate(testRun.date)}
        breadcrumb={<TestRunSearchBreadcrumbContainer />}
      >
        <SearchForm />

        <hr />

        <h2>Résultats</h2>
        <FoundScenarioTableContainer />
      </Page>
    );
  }
}
