import PropTypes from "prop-types";
import React from "react";
import ButtonToolbar from "react-bootstrap/lib/ButtonToolbar";
import ButtonGroup from "react-bootstrap/lib/ButtonGroup";

import toNiceDate from "../../ui/toNiceDate";
import Button from "../../ui/components/Button";
import ButtonLink from "../../ui/components/ButtonLink";
import FeatureStateFilterContainer from "../../filters/components/FeatureStateFilterContainer";
import TestRunHistoryTableContainer from "./TestRunHistoryTableContainer";
import TestRunStatsContainer from "./TestRunStatsContainer";
import TestRunFeatureTableContainer from "./TestRunFeatureTableContainer";
import FeatureGroupFilterContainer from "./FeatureGroupFilterContainer";
import DeleteTestRunButtonContainer from "./DeleteTestRunButtonContainer";
import ImportCucumberResultsDialogContainer from "./ImportCucumberResultsDialogContainer";
import EditTestRunDialogContainer from "./EditTestRunDialogContainer";
import TestRunTrendChartContainer from "./TestRunTrendChartContainer";
import Page from "../../ui/components/Page";
import TestRunBreadcrumbContainer from "./TestRunBreadcrumbContainer";

export default class TestRunPage extends React.Component {
  static propTypes = {
    testRunId: PropTypes.string.isRequired,
    selectedFeatureGroup: PropTypes.string,
    testRun: PropTypes.object,
    onLoad: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      showImportCucumberResultDialog: false,
      showEditDialog: false
    };
  }

  componentDidMount() {
    this.loadTestRunIfPossible();
  }

  componentDidUpdate(prevProps) {
    this.loadTestRunIfPossible(prevProps);
  }

  onEditButtonClick = () => {
    this.setState({
      showEditDialog: true
    });
  };

  onImportCucumberResultButtonClick = () => {
    this.setState({
      showImportCucumberResultDialog: true
    });
  };

  hideEditDialog = () => {
    this.setState({
      showEditDialog: false
    });
  };

  hideImportCucumberResultDialog = () => {
    this.setState({
      showImportCucumberResultDialog: false
    });
  };

  loadTestRunIfPossible(prevProps = {}) {
    const { testRunId } = this.props;

    if (testRunId !== prevProps.testRunId) {
      this.props.onLoad({ testRunId });
    }
  }

  render() {
    const { testRunId, testRun, selectedFeatureGroup } = this.props;

    const labels = testRun.labels.map(label => {
      let value = label.value;
      if (label.url) {
        value = <a href={label.url}>{label.value}</a>;
      }

      return (
        <p key={label.name}>
          <b>{label.name} :</b> {value}
        </p>
      );
    });

    return (
      <Page title={`Tir du ${toNiceDate(testRun.date)}`} breadcrumb={<TestRunBreadcrumbContainer />}>
        {labels}

        <ButtonToolbar>
          <ButtonGroup>
            <Button glyph="upload" onClick={this.onImportCucumberResultButtonClick}>
              Importer un résultat de tests Cucumber
            </Button>
          </ButtonGroup>
          <ButtonGroup>
            <Button glyph="pencil" onClick={this.onEditButtonClick}>
              Modifier
            </Button>
          </ButtonGroup>
          <ButtonGroup>
            <ButtonLink glyph="search" to={`/test-runs/${testRunId}/search`}>
              Rechercher
            </ButtonLink>
          </ButtonGroup>
          <ButtonGroup>
            <ButtonLink glyph="tags" to={`/test-runs/${testRunId}/tags`}>
              Tags
            </ButtonLink>
          </ButtonGroup>
          <ButtonGroup>
            <ButtonLink glyph="exclamation-sign" to={`/test-runs/${testRunId}/failures`}>
              Échecs
            </ButtonLink>
          </ButtonGroup>
          <ButtonGroup>
            <ButtonLink glyph="book" to={`/test-runs/${testRunId}/stepDefinitions`}>
              Glues
            </ButtonLink>
          </ButtonGroup>
          <ButtonGroup>
            <ButtonLink glyph="list" to={`/test-runs/${testRunId}/reports`}>
              Bilan
            </ButtonLink>
          </ButtonGroup>
          <ButtonGroup>
            <ButtonLink glyph="list-alt" to={`/test-runs/${testRunId}/diff`}>
              Comparer avec un autre tir
            </ButtonLink>
          </ButtonGroup>
          <ButtonGroup>
            <DeleteTestRunButtonContainer testRunId={testRunId} />
          </ButtonGroup>
        </ButtonToolbar>

        <hr />

        <h2>Statistiques</h2>
        <TestRunStatsContainer />

        <hr />
        <h2>Fonctionnalités</h2>
        <FeatureGroupFilterContainer testRunId={testRunId} />
        <FeatureStateFilterContainer />
        <TestRunFeatureTableContainer testRunId={testRunId} selectedFeatureGroup={selectedFeatureGroup} />

        <h2>Tendance</h2>
        <TestRunTrendChartContainer />

        <h2>Historique</h2>
        <TestRunHistoryTableContainer testRunId={testRunId} />

        <ImportCucumberResultsDialogContainer
          testRunId={testRunId}
          show={this.state.showImportCucumberResultDialog}
          onClose={this.hideImportCucumberResultDialog}
        />

        <EditTestRunDialogContainer testRun={testRun} show={this.state.showEditDialog} onClose={this.hideEditDialog} />
      </Page>
    );
  }
}
