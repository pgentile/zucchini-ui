import PropTypes from "prop-types";
import React, { useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import Modal from "react-bootstrap/Modal";
import FormGroup from "react-bootstrap/FormGroup";
import FormLabel from "react-bootstrap/FormLabel";
import FormControl from "react-bootstrap/FormControl";
import Alert from "react-bootstrap/Alert";
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

    dispatch(purgeTestRuns({ testRunIds: selectedTestRunIds }));
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
    <Modal show onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Purger les anciens tirs</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handlePurge}>
          <FormGroup controlId="type">
            <FormLabel>Type</FormLabel>
            <FormControl as="select" autoFocus value={type} onChange={handleTypeChange}>
              <option />
              {testRunTypeOptions}
            </FormControl>
          </FormGroup>
          <FormGroup controlId="maxDate">
            <FormLabel>Date maximum des tirs à purger</FormLabel>
            <FormControl type="date" value={maxDate} onChange={handleMaxDateChange} />
          </FormGroup>
          <Alert variant="warning">{aboutChange}</Alert>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Annuler
        </Button>
        <Button onClick={handlePurge}>Purger</Button>
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
