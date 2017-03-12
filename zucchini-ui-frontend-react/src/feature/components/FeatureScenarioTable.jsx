import React from 'react';
import Table from 'react-bootstrap/lib/Table';
import Label from 'react-bootstrap/lib/Label';
import { Link } from 'react-router'

import Status from '../../ui/components/Status';


export default class FeatureScenarioTable extends React.PureComponent {

  render() {
    const { scenarios } = this.props;

    const rows = scenarios.map(scenario => {
      return (
        <FeatureScenarioTableRow key={scenario.id} scenario={scenario} />
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

FeatureScenarioTable.propTypes = {
  scenarios: React.PropTypes.arrayOf(React.PropTypes.object),
};


class FeatureScenarioTableRow extends React.PureComponent {

  render() {
    const { scenario } = this.props;

    const reviewedProps = {
      bsStyle: scenario.reviewed ? 'success' : 'default',
      text: scenario.reviewed ? 'Oui' : 'Non',
    };

    return (
      <tr>
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

FeatureScenarioTableRow.propTypes = {
  scenario: React.PropTypes.object.isRequired,
};
