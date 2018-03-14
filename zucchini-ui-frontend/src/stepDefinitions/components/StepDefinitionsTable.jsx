import PropTypes from 'prop-types';
import React from 'react';
import Table from 'react-bootstrap/lib/Table';
import truncate from 'lodash/truncate';
import Badge from 'react-bootstrap/lib/Badge';


export default class StepDefinitionsTable extends React.Component {

  static propTypes = {
    stepDefinitions: PropTypes.arrayOf(PropTypes.object).isRequired,
  };

  render() {
    const {stepDefinitions} = this.props;
    const rows = stepDefinitions.map((stepDefinition, index) => {
      return <StepDefinitionsTableRow key={index} stepDefinition={stepDefinition}/>
    });

    return (
      <Table bordered striped hover style={{tableLayout: 'fixed'}}>
        <thead>
          <tr>
            <th className='col-md-10'>Définition</th>
            <th className='col-md-1' style={{textAlign: 'center'}}>Occurrence</th>
            <th className='col-md-1' style={{textAlign: 'center'}}>Fiabilité</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    );
  }
}

class StepDefinitionsTableRow extends React.Component {

  static propTypes = {
    stepDefinition: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {stepDefinition} = this.props;
    const firstOccurrence = stepDefinition.occurrences[0];

    const nbSuccesses = stepDefinition.occurrences.filter((step) => {
      return step.status === 'PASSED'
    }).length;
    const successRate = Math.floor((nbSuccesses / stepDefinition.occurrences.length) * 100);

    let successBadge;
    if (successRate >= 90) {
      successBadge = 'badge-success';
    } else if (successRate >= 50 && successRate >= 90) {
      successBadge = 'badge-warning';
    } else if (successRate < 50) {
      successBadge = 'badge-error';
    }

    return (
      <tr key={stepDefinition}>
        <td style={{overflow: 'hidden', textOverflow: 'ellipsis'}}>
          {truncate(firstOccurrence.info.keyword + ' ' + firstOccurrence.info.name, {'length': 300})}
        </td>
        <td style={{textAlign: 'center'}}>
          <b>{stepDefinition.occurrences.length}</b>
        </td>
        <td style={{textAlign: 'center'}}>
          <Badge bsClass={successBadge}>{successRate} %</Badge>
        </td>
      </tr>
    );
  }
}
