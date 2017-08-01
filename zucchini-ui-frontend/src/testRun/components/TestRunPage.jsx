import PropTypes from 'prop-types';
import React from 'react';
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup';

import toNiceDate from '../../ui/toNiceDate';
import Button from '../../ui/components/Button';
import FeatureStateFilterContainer from '../../filters/components/FeatureStateFilterContainer';
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

  onEditButtonClick = () => {
    this.setState({
      showEditDialog: true,
    });
  };

  onGoToTags = () => {
    this.props.onGoToTags({
      testRunId: this.props.testRunId,
    });
  };

  onGoToDiff = () => {
    this.props.onGoToDiff({
      testRunId: this.props.testRunId,
    });
  };

  onGoToFailures = () => {
    this.props.onGoToFailures({
      testRunId: this.props.testRunId,
    });
  };

  onImportCucumberResultButtonClick = () => {
    this.setState({
      showImportCucumberResultDialog: true,
    });
  };

  hideEditDialog = () => {
    this.setState({
      showEditDialog: false,
    });
  };

  hideImportCucumberResultDialog = () => {
    this.setState({
      showImportCucumberResultDialog: false,
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
        value = (
          <a href={label.url}>{label.value}</a>
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
            <Button glyph="tags" onClick={this.onGoToTags}>
              Tags
            </Button>
          </ButtonGroup>
          <ButtonGroup>
            <Button glyph="exclamation-sign" onClick={this.onGoToFailures}>
              Échecs
            </Button>
          </ButtonGroup>
          <ButtonGroup>
            <Button glyph="list-alt" onClick={this.onGoToDiff}>
              Comparer avec un autre tir
            </Button>
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
          onClose={this.hideImportCucumberResultDialog} />

        <EditTestRunDialogContainer
          testRun={testRun}
          show={this.state.showEditDialog}
          onClose={this.hideEditDialog} />
      </div>
    );
  }
}

TestRunPage.propTypes = {
  testRunId: PropTypes.string.isRequired,
  selectedFeatureGroup: PropTypes.string,
  testRun: PropTypes.object,
  onLoad: PropTypes.func.isRequired,
  onGoToTags: PropTypes.func.isRequired,
  onGoToDiff: PropTypes.func.isRequired,
  onGoToFailures: PropTypes.func.isRequired
};
