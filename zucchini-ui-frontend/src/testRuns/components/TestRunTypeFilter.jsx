import PropTypes from "prop-types";
import React, { useState } from "react";
import Overlay from "react-bootstrap/Overlay";
import Popover from "react-bootstrap/Popover";
import ButtonGroup from "react-bootstrap/ButtonGroup";

import Button from "../../ui/components/Button";
import Caret from "../../ui/components/Caret";

import TestRunTypeFilterPopover from "./TestRunTypeFilterPopover";

export default function TestRunTypeFilter({ selectedType }) {
  const [showSelectableTypes, setShowSelectableTypes] = useState(false);
  const [overlayTarget, setOverlayTarget] = useState(null);

  const handleShowPopoverClick = (event) => {
    setShowSelectableTypes(true);
    setOverlayTarget(event.target);
  };

  const handleHidePopover = () => {
    setShowSelectableTypes(false);
  };

  return (
    <div style={{ position: "relative", marginBottom: "10px" }}>
      <ButtonGroup bsSize="xsmall">
        <Button active={showSelectableTypes} onClick={handleShowPopoverClick}>
          Type de tir : <b>{selectedType ? selectedType : <i>Tous</i>}</b> <Caret />
        </Button>
      </ButtonGroup>

      <Overlay
        show={showSelectableTypes}
        target={overlayTarget}
        placement="bottom"
        rootClose
        onHide={handleHidePopover}
      >
        <Popover id="test-run-type-filter-container" title="Filter par type de tir" style={{ width: "30rem" }}>
          <TestRunTypeFilterPopover selectedType={selectedType} onTypeSelected={handleHidePopover} />
        </Popover>
      </Overlay>
    </div>
  );
}

TestRunTypeFilter.propTypes = {
  selectedType: PropTypes.string
};
