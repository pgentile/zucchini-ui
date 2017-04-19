import PropTypes from 'prop-types';
import React from 'react';
import Table from 'react-bootstrap/lib/Table';
import Badge from 'react-bootstrap/lib/Badge';
import { Link } from 'react-router'

import Status from '../../ui/components/Status';


export default class TestRunFeatureTable extends React.Component {

  render() {
    const { features } = this.props;

    const rows = features.map(feature => {
      return (
        <TestRunFeatureTableTableRow key={feature.id} feature={feature} />
      )
    });

    return (
      <Table bordered striped hover>
        <thead>
          <tr>
            <th className="col-md-1">Groupe</th>
            <th className="col-md-4">Fonctionnalité</th>
            <th className="col-md-1">Statut</th>
            <th className="col-md-1">Total</th>
            <th className="col-md-1">Succès</th>
            <th className="col-md-1">Échecs</th>
            <th className="col-md-1">En attente</th>
            <th className="col-md-1">Non joués</th>
            <th className="col-md-1">Analysés</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    );
  }

}

TestRunFeatureTable.propTypes = {
  features: PropTypes.arrayOf(PropTypes.object).isRequired,
};


class TestRunFeatureTableTableRow extends React.PureComponent {

  render() {
    const { feature } = this.props;

    return (
      <tr>
        <td>{feature.group}</td>
        <td>
          <Link to={`/features/${feature.id}`}>
            {feature.info.name}
          </Link>
        </td>
        <td>
          <Status status={feature.status} />
        </td>
        <td><Badge>{feature.stats.all.count}</Badge></td>
        <td><Badge>{feature.stats.all.passed}</Badge></td>
        <td><Badge>{feature.stats.all.failed}</Badge></td>
        <td><Badge>{feature.stats.all.pending}</Badge></td>
        <td><Badge>{feature.stats.all.notRun}</Badge></td>
        <td><Badge>{feature.stats.reviewed.count}</Badge></td>
      </tr>
    );
  }

}

TestRunFeatureTableTableRow.propTypes = {
  feature: PropTypes.object.isRequired,
};
