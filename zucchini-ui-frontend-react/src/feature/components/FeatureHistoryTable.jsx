import PropTypes from 'prop-types';
import React from 'react';
import Table from 'react-bootstrap/lib/Table';
import Badge from 'react-bootstrap/lib/Badge';
import Label from 'react-bootstrap/lib/Label';
import { Link } from 'react-router'

import toNiceDate from '../../ui/toNiceDate';


export default class FeatureHistoryTable extends React.PureComponent {

  render() {
    const { history, featureId } = this.props;

    const rows = history.map(feature => {
      const isActive = (feature.id === featureId);
      return (
        <FeatureHistoryTableRow key={feature.id} feature={feature} isActive={isActive} />
      )
    });

    return (
      <Table bordered striped hover>
        <thead>
          <tr>
            <th className="col-md-2">Type</th>
            <th className="col-md-4">Tir de test</th>
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

FeatureHistoryTable.propTypes = {
  featureId: PropTypes.string.isRequired,
  history: PropTypes.arrayOf(PropTypes.object),
};


class FeatureHistoryTableRow extends React.PureComponent {

  render() {
    const { feature, isActive } = this.props;
    const className = isActive ? 'info' : null;

    return (
      <tr className={className}>
        <td><Label>{feature.testRun.type}</Label></td>
        <td>
          <Link to={`/features/${feature.id}`}>Tir du {toNiceDate(feature.testRun.date)}</Link>
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

FeatureHistoryTableRow.propTypes = {
  feature: PropTypes.object.isRequired,
  isActive: PropTypes.bool.isRequired,
};
