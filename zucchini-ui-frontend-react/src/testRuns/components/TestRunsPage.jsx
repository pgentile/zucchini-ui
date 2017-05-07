import PropTypes from 'prop-types';
import React from 'react';
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';
import Button from 'react-bootstrap/lib/Button';
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';

import TestRunsTableContainer from './TestRunsTableContainer';
import TestRunTypeFilterContainer from './TestRunTypeFilterContainer';
import CreateTestRunDialogContainer from './CreateTestRunDialogContainer';
import PurgeDialogContainer from './PurgeDialogContainer';


export default class TestRunsPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showCreateTestRunDialog: false,
      showPurgeDialog: false,
    };
  }

  componentDidMount() {
    this.props.onLoad();
  }

  onCreateTestRunButtonClick = (event) => {
    event.preventDefault();

    this.setState({
      showCreateTestRunDialog: true,
    });
  };

  onPurgeButtonClick = () => {
    this.setState({
      showPurgeDialog: true,
    });
  };

  hideCreateTestRunDialog = () => {
    this.setState({
      showCreateTestRunDialog: false,
    });
  };

  hidePurgeDialog = () => {
    this.setState({
      showPurgeDialog: false,
    });
  };

  render() {
    const { selectedType } = this.props;

    return (
      <div>
        <h1>Derniers tirs {selectedType && <small>Type {selectedType}</small>}</h1>
        <hr />
        <ButtonToolbar>
          <ButtonGroup>
            <Button onClick={this.onCreateTestRunButtonClick}>
              <Glyphicon glyph="plus-sign" /> Créer un tir
            </Button>
          </ButtonGroup>
          <ButtonGroup>
            <Button onClick={this.onPurgeButtonClick}>
              <Glyphicon glyph="tree-deciduous" /> Purger les anciens tirs
            </Button>
          </ButtonGroup>
        </ButtonToolbar>
        <hr />
        <TestRunTypeFilterContainer />
        <TestRunsTableContainer selectedType={selectedType} />
        <CreateTestRunDialogContainer show={this.state.showCreateTestRunDialog} onClose={this.hideCreateTestRunDialog} />
        <PurgeDialogContainer show={this.state.showPurgeDialog} onClose={this.hidePurgeDialog} />
      </div>
    );
  }
}

TestRunsPage.propTypes = {
  onLoad: PropTypes.func.isRequired,
  selectedType: PropTypes.string,
};
