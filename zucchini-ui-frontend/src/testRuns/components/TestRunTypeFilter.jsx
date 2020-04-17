import PropTypes from "prop-types";
import React from "react";
import Overlay from "react-bootstrap/lib/Overlay";
import Popover from "react-bootstrap/lib/Popover";
import ButtonGroup from "react-bootstrap/lib/ButtonGroup";

import Button from "../../ui/components/Button";
import Caret from "../../ui/components/Caret";

import TestRunTypeFilterPopoverContainer from "./TestRunTypeFilterPopoverContainer";

export default class TestRunTypeFilter extends React.PureComponent {
  static propTypes = {
    testRunTypes: PropTypes.arrayOf(PropTypes.string).isRequired,
    selectedType: PropTypes.string
  };

  constructor(props) {
    super(props);

    this.state = {
      showSelectableTypes: false,
      overlayTarget: null
    };
  }

  onShowPopoverClick = (event) => {
    this.setState({
      showSelectableTypes: true,
      overlayTarget: event.target
    });
  };

  onHidePopover = () => {
    this.setState({
      showSelectableTypes: false
    });
  };

  render() {
    const { selectedType } = this.props;
    const { showSelectableTypes, overlayTarget } = this.state;

    return (
      <div style={{ position: "relative", marginBottom: "10px" }}>
        <ButtonGroup bsSize="xsmall">
          <Button active={showSelectableTypes} onClick={this.onShowPopoverClick}>
            Type de tir : <b>{selectedType ? selectedType : <i>Tous</i>}</b> <Caret />
          </Button>
        </ButtonGroup>

        <Overlay
          show={showSelectableTypes}
          container={this}
          target={overlayTarget}
          placement="bottom"
          rootClose
          onHide={this.onHidePopover}
        >
          <Popover id="test-run-type-filter-container" title="Filter par type de tir" style={{ width: "30rem" }}>
            <TestRunTypeFilterPopoverContainer selectedType={selectedType} onTypeSelected={this.onHidePopover} />
          </Popover>
        </Overlay>
      </div>
    );
  }
}
