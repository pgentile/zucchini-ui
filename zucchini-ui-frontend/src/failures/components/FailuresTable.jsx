import PropTypes from 'prop-types';
import React from 'react';
import {Link} from 'react-router';
import Table from 'react-bootstrap/lib/Table';
import Label from 'react-bootstrap/lib/Label';
import Modal from 'react-bootstrap/lib/Modal';
import Status from '../../ui/components/Status';

export default class FailuresTable extends React.Component {

  render() {
    const {failures} = this.props;
    const rows = failures.failures.map(groupedFailures => {
      const nbFailedScenarii = groupedFailures.failedScenarii.length;
      return (
        groupedFailures.failedScenarii.map((failedScenario, index) => {
          return <FailuresTableRow key={index} failedScenario={failedScenario} isFirstFailure={index === 0 } nbFailedScenarii={nbFailedScenarii}/>
        })
      );
    });

    return (
      <Table bordered striped hover style={{tableLayout: 'fixed'}}>
        <thead>
          <tr>
            <th className='col-md-4'>Erreur</th>
            <th className='col-md-6'>Scénario</th>
            <th className='col-md-1'>Statut</th>
            <th className='col-md-1'>Analysé</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    );
  }

}

FailuresTable.propTypes = {
  testRunId: PropTypes.string.isRequired,
  failures: PropTypes.object.isRequired,
};

class FailuresTableRow extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showErrorMsgDetails: false,
    };
  }

  onShowErrorMsg = () => {
    this.setState({
      showErrorMsgDetails: true,
    });
  };

  onHideErrorMsg = () => {
    this.setState({
      showErrorMsgDetails: false,
    });
  };

  handleErrorMsgRow(rowSpan, msg, scenario) {

    const cellStyle = {
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    };

    return (
      <td rowSpan={rowSpan} style={cellStyle}>{msg}&hellip;<br/>
        <a onClick={this.onShowErrorMsg}><b>Détails</b></a>
        <FailuresDetailsDialog errorMessage={scenario.errorMessage} show={this.state.showErrorMsgDetails} onClose={this.onHideErrorMsg}/>
      </td>
    );
  }

  render() {
    const {failedScenario, isFirstFailure, nbFailedScenarii} = this.props;

    const reviewedProps = {
      bsStyle: failedScenario.reviewed ? 'success' : 'default',
      text: failedScenario.reviewed ? 'Oui' : 'Non',
    };

    let errorMessageRow;
    if (isFirstFailure) {
      errorMessageRow = this.handleErrorMsgRow(nbFailedScenarii, failedScenario.errorMessage.substring(0, 300), failedScenario);
    }
    return (
      <tr key={failedScenario}>
        {errorMessageRow}
        <td>
          <Link to={{pathname: `/scenarios/${failedScenario.id}`}}>
            <b>{failedScenario.info.keyword}</b> {failedScenario.info.name}
          </Link>
        </td>
        <td>
          <Status status={failedScenario.status}/>
        </td>
        <td>
          <Label bsStyle={reviewedProps.bsStyle}>{reviewedProps.text}</Label>
        </td>
      </tr>
    );
  }

}

FailuresTableRow.propTypes = {
  failedScenario: PropTypes.object.isRequired,
  isFirstFailure: PropTypes.bool.isRequired,
  nbFailedScenarii: PropTypes.number.isRequired,
};


class FailuresDetailsDialog extends React.PureComponent {

  onCloseClick = (event) => {
    if (event) {
      event.preventDefault();
    }
    this.props.onClose();
  };

  render() {
    const {show, errorMessage} = this.props;
    return (
      <Modal bsSize='large' dialogClassName='error-message-modal-dialog' show={show} onHide={this.onCloseClick}>
        <Modal.Header closeButton>
          <Modal.Title>{'Détails de l\'erreur'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <pre>{errorMessage}</pre>
        </Modal.Body>
      </Modal>
    );
  }

}

FailuresDetailsDialog.propTypes = {
  show: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};
