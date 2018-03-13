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
    let style = 'badge';
    if (group.stats.failed === 0) {
      style = 'badge-success';
    } else if (group.stats.faultRate > 50) {
      style = 'badge-error';
    } else if (group.stats.faultRate > 10) {
      style = 'badge-warning';
    }

    return (
      <tr>
        <td>{group.total ? <b>{group.name}</b> : group.name}</td>
        <td><Badge bsClass={style}>{group.stats.count}</Badge></td>
        <td><Badge bsClass={style}>{group.stats.passed}</Badge></td>
        <td><Badge bsClass={style}>{group.stats.failed}</Badge></td>
        <td><Badge bsClass={style}>{group.stats.pending}</Badge></td>
        <td><Badge bsClass={style}>{group.stats.notRun}</Badge></td>
        <td><Badge bsClass={style}>{group.stats.faultRate} %</Badge></td>
        <td><Badge bsClass={style}>{group.stats.faultRateRepartition} %</Badge></td>
      </tr>
    );
  }

}
