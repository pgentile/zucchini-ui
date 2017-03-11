import React from 'react';
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';

import BasePage from '../../ui/components/BasePage';
import TestRunsTableContainer from './TestRunsTableContainer';
import CreateTestRunButtonContainer from './CreateTestRunButtonContainer';
import TestRunTypeFilterContainer from './TestRunTypeFilterContainer';


export default class TestRunsPage extends React.Component {

  componentDidMount() {
    this.props.onLoad();
  }

  render() {
    return (
      <BasePage title="Derniers tirs">
        <hr />
        <ButtonToolbar>
          <CreateTestRunButtonContainer />
        </ButtonToolbar>
        <hr />
        <TestRunTypeFilterContainer />
        <TestRunsTableContainer />
      </BasePage>
    );
  }

}

TestRunsPage.propTypes = {
  onLoad: React.PropTypes.func.isRequired,
};
