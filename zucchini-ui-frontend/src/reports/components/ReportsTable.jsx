import PropTypes from 'prop-types';
import React from 'react';
import Table from 'react-bootstrap/lib/Table';
import Badge from 'react-bootstrap/lib/Badge';

export default class ReportsTable extends React.Component {

  static propTypes = {
    groups: PropTypes.arrayOf(PropTypes.object).isRequired,
  };

  render() {
    const { groups } = this.props;

    const rows = groups.map(group => {
      return (
        <ReportsTableRow key={group.name} group={group} />
      )
    });

    return (
      <Table bordered striped hover>
        <thead>
          <tr>
            <th className="col-md-1">Groupe</th>
            <th className="col-md-1">Total</th>
            <th className="col-md-1">Succès</th>
            <th className="col-md-1">Échecs</th>
            <th className="col-md-1">En attente</th>
            <th className="col-md-1">Non joués</th>
            <th className="col-md-1">Taux erreurs</th>
            <th className="col-md-1">Taux de répartition des erreurs</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    );
  }

}


class ReportsTableRow extends React.PureComponent {

  static propTypes = {
    group: PropTypes.object.isRequired,
  };

  render() {
    const { group } = this.props;

    return (
      <tr>
        <td>{group.name}</td>
        <td><Badge>{group.stats.all.count}</Badge></td>
        <td><Badge>{group.stats.all.passed}</Badge></td>
        <td><Badge>{group.stats.all.failed}</Badge></td>
        <td><Badge>{group.stats.all.pending}</Badge></td>
        <td><Badge>{group.stats.all.notRun}</Badge></td>
        <td><Badge>{group.stats.all.faultRate} %</Badge></td>
        <td><Badge>{group.stats.all.faultRateRepartition} %</Badge></td>
      </tr>
    );
  }

}
