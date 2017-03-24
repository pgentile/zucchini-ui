import React from 'react';
import Table from 'react-bootstrap/lib/Table';
import Label from 'react-bootstrap/lib/Label';
import { Link } from 'react-router'

import Status from '../../ui/components/Status';


export default class ScenarioTable extends React.PureComponent {

  render() {
    const { scenarios } = this.props;

    const rows = scenarios.map(scenario => {
      return (
        <ScenarioTableRow key={scenario.id} scenario={scenario} />
      )
    });

    return (
      <Table bordered striped hover>
        <thead>
          <tr>
            <th className="col-md-10">Scénario</th>
            <th className="col-md-1">Statut</th>
            <th className="col-md-1">Analysé</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    );
  }

}

ScenarioTable.propTypes = {
  scenarios: React.PropTypes.arrayOf(React.PropTypes.object),
};


class ScenarioTableRow extends React.PureComponent {

  render() {
    const { scenario, isActive } = this.props;
    const className = isActive ? 'info' : null;

    const reviewedProps = {
      bsStyle: scenario.reviewed ? 'success' : 'default',
      text: scenario.reviewed ? 'Oui' : 'Non',
    };

    return (
      <tr className={className}>
        <td>
          <Link to={{ pathname: `/scenarios/${scenario.id}` }}>
            <b>{scenario.info.keyword}</b> {scenario.info.name}
          </Link>
        </td>
        <td>
          <Status status={scenario.status} />
        </td>
        <td>
          <Label bsStyle={reviewedProps.bsStyle}>{reviewedProps.text}</Label>
        </td>
      </tr>
    );
  }

}

ScenarioTableRow.propTypes = {
  scenario: React.PropTypes.object.isRequired,
  isActive: React.PropTypes.bool.isRequired,
};

ScenarioTableRow.defaultProps = {
  isActive: false,
};
