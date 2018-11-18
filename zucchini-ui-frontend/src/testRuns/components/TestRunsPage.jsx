import PropTypes from "prop-types";
import React, { Fragment } from "react";
import ButtonToolbar from "react-bootstrap/lib/ButtonToolbar";
import ButtonGroup from "react-bootstrap/lib/ButtonGroup";

import Button from "../../ui/components/Button";
import TestRunsTableContainer from "./TestRunsTableContainer";
import TestRunTypeFilterContainer from "./TestRunTypeFilterContainer";
import CreateTestRunDialogContainer from "./CreateTestRunDialogContainer";
import PurgeDialogContainer from "./PurgeDialogContainer";
import Page from "../../ui/components/Page";
import TestRunsBreadcrumbContainer from "./TestRunsBreadcrumbContainer";

export default class TestRunsPage extends React.Component {
  static propTypes = {
    onLoad: PropTypes.func.isRequired,
    selectedType: PropTypes.string
  };

  constructor(props) {
    super(props);

    this.state = {
      showCreateTestRunDialog: false,
      showPurgeDialog: false
    };
  }

  componentDidMount() {
    this.props.onLoad();
  }

  onCreateTestRunButtonClick = event => {
    event.preventDefault();

    this.setState({
      showCreateTestRunDialog: true
    });
  };

  onPurgeButtonClick = () => {
    this.setState({
      showPurgeDialog: true
    });
  };

  hideCreateTestRunDialog = () => {
    this.setState({
      showCreateTestRunDialog: false
    });
  };

  hidePurgeDialog = () => {
    this.setState({
      showPurgeDialog: false
    });
  };

  render() {
    const { selectedType } = this.props;
    const { showCreateTestRunDialog, showPurgeDialog } = this.state;

    return (
      <Page
        title={<Fragment>Derniers tirs {selectedType && <small>Type {selectedType}</small>}</Fragment>}
        breadcrumb={<TestRunsBreadcrumbContainer />}
      >
        <ButtonToolbar>
          <ButtonGroup>
            <Button glyph="plus-sign" onClick={this.onCreateTestRunButtonClick}>
              Créer un tir
            </Button>
          </ButtonGroup>
          <ButtonGroup>
            <Button glyph="tree-deciduous" onClick={this.onPurgeButtonClick}>
              Purger les anciens tirs
            </Button>
          </ButtonGroup>
        </ButtonToolbar>
        <hr />
        <TestRunTypeFilterContainer selectedType={selectedType} />
        <TestRunsTableContainer selectedType={selectedType} />
        <CreateTestRunDialogContainer show={showCreateTestRunDialog} onClose={this.hideCreateTestRunDialog} />
        {showPurgeDialog && (
          <PurgeDialogContainer
            currentSelectedType={selectedType}
            show={showPurgeDialog}
            onClose={this.hidePurgeDialog}
          />
        )}
      </Page>
    );
  }
}
