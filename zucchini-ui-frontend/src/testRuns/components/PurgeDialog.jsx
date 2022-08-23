import PropTypes from "prop-types";
import { useCallback, useId, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-bootstrap/Modal";
import FormGroup from "react-bootstrap/FormGroup";
import FormLabel from "react-bootstrap/FormLabel";
import FormControl from "react-bootstrap/FormControl";
import Alert from "react-bootstrap/Alert";
import Form from "react-bootstrap/Form";
import format from "date-fns/format";
import isBefore from "date-fns/isBefore";
import subDays from "date-fns/subDays";
import parseISO from "date-fns/parseISO";

import Button from "../../ui/components/Button";
import { selectLatestTestRuns, selectTestRunTypes } from "../selectors";
import { purgeTestRuns } from "../redux";

const LOCAL_DATE_FORMAT = "yyyy-MM-dd";

export default function PurgeDialog({ show, currentSelectedType, purgeDelayInDays = 90, onClose }) {
  const [values, setValues] = useState(() => {
    const initialMaxDate = subDays(new Date(), purgeDelayInDays);
    return {
      type: currentSelectedType,
      maxDate: format(initialMaxDate, LOCAL_DATE_FORMAT)
    };
  });

  const handleFieldChange = useCallback((event) => {
    const { name, value } = event.target;
    setValues((currentValues) => {
      return {
        ...currentValues,
        [name]: value
      };
    });
  }, []);

  const { type, maxDate } = values;

  const testRuns = useSelector(selectLatestTestRuns);

  const selectedTestRunIds = useMemo(() => {
    return selectTestRunIds(testRuns, { type, maxDate });
  }, [maxDate, testRuns, type]);

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

  const titleId = useId();

  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();

    await dispatch(purgeTestRuns({ testRunIds: selectedTestRunIds }));
    onClose();
  };

  return (
    <Modal show={show} onHide={onClose} aria-labelledby={titleId}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title id={titleId}>Purger les anciens tirs</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormGroup controlId="type">
            <FormLabel>Type</FormLabel>
            <FormControl name="type" as="select" autoFocus value={type} onChange={handleFieldChange}>
              <option />
              {testRunTypeOptions}
            </FormControl>
          </FormGroup>
          <FormGroup controlId="maxDate">
            <FormLabel>Date maximum des tirs à purger</FormLabel>
            <FormControl name="maxDate" type="date" value={maxDate} onChange={handleFieldChange} />
          </FormGroup>
          <Alert variant="warning" className="mb-0">
            {aboutChange}
          </Alert>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            Annuler
          </Button>
          <Button type="submit" disabled={selectedTestRunCount === 0}>
            Purger
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

PurgeDialog.propTypes = {
  show: PropTypes.bool.isRequired,
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
