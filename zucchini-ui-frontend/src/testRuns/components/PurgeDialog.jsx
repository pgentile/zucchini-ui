import PropTypes from 'prop-types';
import React from 'react';
import Modal from 'react-bootstrap/lib/Modal';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormControl from 'react-bootstrap/lib/FormControl';
import Alert from 'react-bootstrap/lib/Alert';
import moment from 'moment';

import Button from '../../ui/components/Button';


const LOCAL_DATE_FORMAT = 'YYYY-MM-DD';


export default class PurgeDialog extends React.PureComponent {
  constructor(props) {
    super(props);

    const maxDate = moment().add(-configuration.testRunPurgeDelayInDays, 'day').format(LOCAL_DATE_FORMAT);

    this.state = {
      type: '',
      maxDate,
      selectedTestRunIds: [],
      changed: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.testRuns !== nextProps.testRuns) {
      this.setState(prevState => {
        if (prevState.changed) {
          return {
            selectedTestRunIds: this.selectTestRunIds(nextProps.testRuns, prevState),
          };
        }
        return {};
      });
    }
  }

  onTypeChange = (event) => {
    event.preventDefault();

    const type = event.target.value;

    this.updateState({
      type,
    });
  };

  onMaxDateChange = (event) => {
    event.preventDefault();

    const maxDate = event.target.value;

    this.updateState({
      maxDate,
    });
  };

  onCloseClick = (event) => {
    if (event) {
      event.preventDefault();
    }
    this.props.onClose();
  };

  onPurge = (event) => {
    if (event) {
      event.preventDefault();
    }

    this.props.onPurge({ selectedTestRunIds: this.state.selectedTestRunIds });
    this.props.onClose();
  };

  updateState(newState) {
    this.setState((prevState, props) => {
      return {
        ...newState,
        changed: true,
        selectedTestRunIds: this.selectTestRunIds(props.testRuns, { ...prevState, ...newState }),
      }
    });
  }

  selectTestRunIds(testRuns, { type, maxDate }) {
    const maxDateMoment = moment(maxDate, LOCAL_DATE_FORMAT);

    return testRuns
      .filter(testRun => testRun.type === type)
      .filter(testRun => {
        const testRunDateMoment = moment(testRun.date);
        return testRunDateMoment.isBefore(maxDateMoment);
      })
      .map(testRun => testRun.id);
  }

  render() {
    const { show, testRunTypes } = this.props;

    const testRunTypeOptions = testRunTypes.map(testRunType => {
      return (
        <option key={testRunType} value={testRunType}>{testRunType}</option>
      );
    });

    let selectionAlert = null;
    if (this.state.changed) {
      let aboutChange = '';
      const selectedTestRunCount = this.state.selectedTestRunIds.length;
      if (selectedTestRunCount > 0) {
        aboutChange = `${selectedTestRunCount} tir(s) à purger`;
      } else {
        aboutChange = 'Aucun tir à purger';
      }

      selectionAlert = (
        <Alert bsStyle="warning">
          {aboutChange}
        </Alert>
      );
    }

    return (
      <Modal show={show} onHide={this.onCloseClick}>
        <Modal.Header closeButton>
          <Modal.Title>Purger les anciens tirs</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={this.onPurge}>
            <FormGroup controlId="type">
              <ControlLabel>Type</ControlLabel>
              <FormControl componentClass="select" autoFocus value={this.state.type} onChange={this.onTypeChange}>
                <option></option>
                {testRunTypeOptions}
              </FormControl>
            </FormGroup>
            <FormGroup controlId="maxDate">
              <ControlLabel>Date maximum des tirs à purger</ControlLabel>
              <FormControl type="date" value={this.state.maxDate} onChange={this.onMaxDateChange} />
            </FormGroup>
            {selectionAlert}
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.onCloseClick}>Annuler</Button>
          <Button bsStyle="primary" onClick={this.onPurge}>Purger</Button>
        </Modal.Footer>
      </Modal>
    );
  }

}

PurgeDialog.propTypes = {
  show: PropTypes.bool.isRequired,
  testRunTypes: PropTypes.arrayOf(PropTypes.string).isRequired,
  testRuns: PropTypes.array.isRequired,
  onClose: PropTypes.func.isRequired,
  onPurge: PropTypes.func.isRequired,
};
