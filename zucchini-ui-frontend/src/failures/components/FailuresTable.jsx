import PropTypes from 'prop-types';
import React from 'react';
import Table from 'react-bootstrap/lib/Table';
import Label from 'react-bootstrap/lib/Label';
import { Link } from 'react-router'
import Status from '../../ui/components/Status';

export default class FailuresTable extends React.Component {

  render() {
    const {failures} = this.props;
    const rows = failures.failures.map(groupedFailures => {
      const nbFailedScenarii = groupedFailures.failedScenarii.length;
      return (
        groupedFailures.failedScenarii.map((failedScenario, index)=> {
          return <FailuresTableRow key={index} failedScenario={failedScenario} isFirstFailure={index === 0 } nbFailedScenarii={nbFailedScenarii}/>
        })

      );
    });

    return (
      <Table bordered striped hover style={{ tableLayout: 'fixed' }}>
        <thead>
          <tr>
            <th className='col-md-4'>Erreur</th>
            <th className="col-md-6">Scénario</th>
            <th className="col-md-1">Statut</th>
            <th className="col-md-1">Analysé</th>
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

  render() {
    const {failedScenario, isFirstFailure, nbFailedScenarii} = this.props;

    const reviewedProps = {
      bsStyle: failedScenario.reviewed ? 'success' : 'default',
      text: failedScenario.reviewed ? 'Oui' : 'Non',
    };

    let errMsg;
    if(isFirstFailure){
      errMsg = <td rowSpan={nbFailedScenarii} style={{whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>{failedScenario.errorMessage}</td>
    }
    return (
      <tr key={failedScenario}>
        {errMsg}
        <td>
          <Link to={{ pathname: `/scenarios/${failedScenario.id}` }}>
            <b>{failedScenario.info.keyword}</b> {failedScenario.info.name}
          </Link>
        </td>
        <td>
          <Status status={failedScenario.status} />
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

