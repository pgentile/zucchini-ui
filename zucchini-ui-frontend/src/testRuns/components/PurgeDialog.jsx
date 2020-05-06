import PropTypes from "prop-types";
import React, { useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import Modal from "react-bootstrap/lib/Modal";
import FormGroup from "react-bootstrap/lib/FormGroup";
import ControlLabel from "react-bootstrap/lib/ControlLabel";
import FormControl from "react-bootstrap/lib/FormControl";
import Alert from "react-bootstrap/lib/Alert";
import format from "date-fns/format";
import isBefore from "date-fns/isBefore";
import subDays from "date-fns/subDays";
import parseISO from "date-fns/parseISO";

import Button from "../../ui/components/Button";
import { selectTestRunTypes, selectLatestTestRuns } from "../selectors";
import { purgeTestRuns } from "../redux";

const LOCAL_DATE_FORMAT = "yyyy-MM-dd";

export default function PurgeDialog({ currentSelectedType, purgeDelayInDays = 90, onClose }) {
  const dispatch = useDispatch();

  const [type, setType] = useState(currentSelectedType);

  const [maxDate, setMaxDate] = useState(() => {
    const initialMaxDate = subDays(new Date(), purgeDelayInDays);
    return format(initialMaxDate, LOCAL_DATE_FORMAT);
  });

  const testRuns = useSelector(selectLatestTestRuns);

  const selectedTestRunIds = useMemo(() => {
    return selectTestRunIds(testRuns, { type, maxDate });
  }, [maxDate, testRuns, type]);

  const handleTypeChange = (event) => {
    event.preventDefault();
    setType(event.target.value);
  };

  const handleMaxDateChange = (event) => {
    event.preventDefault();
    setMaxDate(event.target.value);
  };

  const handleClose = (event) => {
    if (event) {
      event.preventDefault();
    }
    onClose();
  };

  const handlePurge = (event) => {
    if (event) {
      event.preventDefault();
    }

    dispatch(purgeTestRuns({ selectedTestRunIds }));
    onClose();
  };

  const testRunTypes = useSelector(selectTestRunTypes);

  const testRunTypeOptions = testRunTypes.map((testRunType) => {
    return (
      <option key={testRunType} value={testRunType}>
        {testRunType}
      </option>
    );
  });

  let aboutChange = "";
  const selectedTestRunCount = selectedTestRunIds.length;
  if (selectedTestRunCount > 0) {
    aboutChange = `${selectedTestRunCount} tir(s) à purger`;
  } else {
    aboutChange = "Aucun tir à purger";
  }

  return (
    <Modal onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Purger les anciens tirs</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handlePurge}>
          <FormGroup controlId="type">
            <ControlLabel>Type</ControlLabel>
            <FormControl componentClass="select" autoFocus value={type} onChange={handleTypeChange}>
              <option />
              {testRunTypeOptions}
            </FormControl>
          </FormGroup>
          <FormGroup controlId="maxDate">
            <ControlLabel>Date maximum des tirs à purger</ControlLabel>
            <FormControl type="date" value={maxDate} onChange={handleMaxDateChange} />
          </FormGroup>
          <Alert bsStyle="warning">{aboutChange}</Alert>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleClose}>Annuler</Button>
        <Button bsStyle="primary" onClick={handlePurge}>
          Purger
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

PurgeDialog.propTypes = {
  currentSelectedType: PropTypes.string,
  purgeDelayInDays: PropTypes.number,
  onClose: PropTypes.func.isRequired
};

function selectTestRunIds(testRuns, { type, maxDate }) {
  return testRuns
    .filter((testRun) => testRun.type === type)
    .filter((testRun) => isBefore(parseISO(testRun.date), parseISO(maxDate)))
    .map((testRun) => testRun.id);
}
