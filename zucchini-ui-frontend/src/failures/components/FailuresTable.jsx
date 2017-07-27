import PropTypes from 'prop-types';
import React from 'react';
import Table from 'react-bootstrap/lib/Table';

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
          <th className='col-md-8'>Scénarii</th>
          {/*<th className='col-md-1'>Total</th>*/}
          {/*<th className='col-md-1'>Succès</th>*/}
          {/*<th className='col-md-1'>Échecs</th>*/}
          {/*<th className='col-md-1'>En attente</th>*/}
          {/*<th className='col-md-1'>Non joués</th>*/}
          {/*<th className='col-md-1'>Analysés</th>*/}
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
    let errMsg;
    if(isFirstFailure){
      errMsg = <td rowSpan={nbFailedScenarii} style={{whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>{failedScenario.errorMessage}</td>
    }
    return (
      <tr key={failedScenario}>
        {errMsg}
        <td>{failedScenario.info.name}</td>
      </tr>
    );
  }

}

FailuresTableRow.propTypes = {
  failedScenario: PropTypes.object.isRequired,
  isFirstFailure: PropTypes.bool.isRequired,
  nbFailedScenarii: PropTypes.number.isRequired,
};

