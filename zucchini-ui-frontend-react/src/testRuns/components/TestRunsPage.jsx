import PropTypes from 'prop-types';
import React from 'react';
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';
import Button from 'react-bootstrap/lib/Button';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';

import TestRunsTableContainer from './TestRunsTableContainer';
import TestRunTypeFilterContainer from './TestRunTypeFilterContainer';
import CreateTestRunDialogContainer from './CreateTestRunDialogContainer';


export default class TestRunsPage extends React.Component {

  constructor(props) {
    super(props);

    this.onCreateTestRunButtonClick = this.onCreateTestRunButtonClick.bind(this);
    this.hideCreateTestRunDialog = this.hideCreateTestRunDialog.bind(this);

    this.state = {
      showCreateTestRunDialog: false,
    };
  }

  componentDidMount() {
    this.props.onLoad();
  }

  render() {
    const { selectedType } = this.props;

    return (
      <div>
        <h1>Derniers tirs {selectedType && <small>Type {selectedType}</small>}</h1>
        <hr />
        <ButtonToolbar>
          <Button onClick={this.onCreateTestRunButtonClick}>
            <Glyphicon glyph="plus-sign" /> Créer un tir
          </Button>
        </ButtonToolbar>
        <hr />
        <TestRunTypeFilterContainer />
        <TestRunsTableContainer selectedType={selectedType} />
        <CreateTestRunDialogContainer show={this.state.showCreateTestRunDialog} onClose={this.hideCreateTestRunDialog} />
      </div>
    );
  }

  onCreateTestRunButtonClick(event) {
    event.preventDefault();

    this.setState({
      showCreateTestRunDialog: true,
    });
  }

  hideCreateTestRunDialog() {
    this.setState({
      showCreateTestRunDialog: false,
    });
  }

}

TestRunsPage.propTypes = {
  onLoad: PropTypes.func.isRequired,
  selectedType: PropTypes.string,
};
