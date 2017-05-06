import PropTypes from 'prop-types';
import React from 'react';
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup';
import Button from 'react-bootstrap/lib/Button';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';

import toNiceDate from '../../ui/toNiceDate';
import FeatureStateFilterContainer from './FeatureStateFilterContainer';
import TestRunHistoryTableContainer from './TestRunHistoryTableContainer';
import TestRunStatsContainer from './TestRunStatsContainer';
import TestRunFeatureTableContainer from './TestRunFeatureTableContainer';
import FeatureGroupFilterContainer from './FeatureGroupFilterContainer';
import DeleteTestRunButtonContainer from './DeleteTestRunButtonContainer';
import ImportCucumberResultsDialogContainer from './ImportCucumberResultsDialogContainer';
import EditTestRunDialogContainer from './EditTestRunDialogContainer';
import TestRunTrendChartContainer from './TestRunTrendChartContainer';


export default class TestRunPage extends React.Component {

  constructor(props) {
    super(props);

    this.onImportCucumberResultButtonClick = this.onImportCucumberResultButtonClick.bind(this);
    this.hideImportCucumberResultDialog = this.hideImportCucumberResultDialog.bind(this);
    this.onEditButtonClick = this.onEditButtonClick.bind(this);
    this.hideEditDialog = this.hideEditDialog.bind(this);
    this.onGoToTags = this.onGoToTags.bind(this);

    this.state = {
      showImportCucumberResultDialog: false,
      showEditDialog: false,
    };
  }

  componentDidMount() {
    this.loadTestRunIfPossible();
  }

  componentDidUpdate(prevProps) {
    this.loadTestRunIfPossible(prevProps);
  }

  render() {
    const { testRunId, testRun, selectedFeatureGroup } = this.props;

    const labels = testRun.labels.map(label => {
      let value = label.value;
      if (label.url) {
        value = (
          <a href={label.url} target="_blank">{label.value}</a>
        );
      }

      return (
        <p key={label.name}>
          <b>{label.name} :</b> {value}
        </p>
      );
    });

    return (
      <div>
        <h1>{`Tir du ${toNiceDate(testRun.date)}`}</h1>
        {labels}

        <hr />
        <ButtonToolbar>
          <ButtonGroup>
            <Button onClick={this.onImportCucumberResultButtonClick}>
              <Glyphicon glyph="upload" /> Importer un résultat de tests Cucumber
            </Button>
          </ButtonGroup>
          <ButtonGroup>
            <Button onClick={this.onEditButtonClick}>
              <Glyphicon glyph="pencil" /> Modifier
            </Button>
          </ButtonGroup>
          <ButtonGroup>
            <Button onClick={this.onGoToTags}>
              <Glyphicon glyph="tags" /> Tags
            </Button>
          </ButtonGroup>
          <ButtonGroup>
            <DeleteTestRunButtonContainer testRunId={testRunId} />
          </ButtonGroup>
        </ButtonToolbar>

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
          onClose={this.hideImportCucumberResultDialog} />

        <EditTestRunDialogContainer
          testRun={testRun}
          show={this.state.showEditDialog}
          onClose={this.hideEditDialog} />
      </div>
    );
  }

  loadTestRunIfPossible(prevProps = {}) {
    const { testRunId } = this.props;

    if (testRunId !== prevProps.testRunId) {
      this.props.onLoad({ testRunId });
    }
  }

  onImportCucumberResultButtonClick() {
    this.setState({
      showImportCucumberResultDialog: true,
    });
  }

  hideImportCucumberResultDialog() {
    this.setState({
      showImportCucumberResultDialog: false,
    });
  }

  onEditButtonClick() {
    this.setState({
      showEditDialog: true,
    });
  }

  hideEditDialog() {
    this.setState({
      showEditDialog: false,
    });
  }

  onGoToTags() {
    this.props.onGoToTags({
      testRunId: this.props.testRunId,
    });
  }

}

TestRunPage.propTypes = {
  testRunId: PropTypes.string.isRequired,
  selectedFeatureGroup: PropTypes.string,
  testRun: PropTypes.object,
  onLoad: PropTypes.func.isRequired,
  onGoToTags: PropTypes.func.isRequired,
};
