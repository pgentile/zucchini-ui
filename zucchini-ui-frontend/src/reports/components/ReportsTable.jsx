import PropTypes from "prop-types";
import React from "react";
import Table from "react-bootstrap/Table";
import CounterBadge from "../../ui/components/CounterBadge";

export default class ReportsTable extends React.Component {
  static propTypes = {
    groups: PropTypes.arrayOf(PropTypes.object).isRequired
  };

  render() {
    const { groups } = this.props;

    const rows = groups.map((group) => {
      return <ReportsTableRow key={group.name} group={group} />;
    });

    return (
      <Table bordered striped hover>
        <thead>
          <tr>
            <th>Groupe</th>
            <th>Total</th>
            <th>Succès</th>
            <th>Échecs</th>
            <th>En attente</th>
            <th>Non joués</th>
            <th>Taux erreurs</th>
            <th>Taux de répartition des erreurs</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    );
  }
}

class ReportsTableRow extends React.PureComponent {
  static propTypes = {
    group: PropTypes.object.isRequired
  };

  render() {
    const { group } = this.props;

    let variant = null;
    if (group.stats.failed === 0) {
      variant = "success";
    } else if (group.stats.faultRate > 50) {
      variant = "error";
    } else if (group.stats.faultRate > 10) {
      variant = "warning";
    }

    return (
      <tr>
        <td>{group.total ? <b>{group.name}</b> : group.name}</td>
        <td>
          <CounterBadge variant={variant}>{group.stats.count}</CounterBadge>
        </td>
        <td>
          <CounterBadge variant={variant}>{group.stats.passed}</CounterBadge>
        </td>
        <td>
          <CounterBadge variant={variant}>{group.stats.failed}</CounterBadge>
        </td>
        <td>
          <CounterBadge variant={variant}>{group.stats.pending}</CounterBadge>
        </td>
        <td>
          <CounterBadge variant={variant}>{group.stats.notRun}</CounterBadge>
        </td>
        <td>
          <CounterBadge variant={variant}>{group.stats.faultRate}&thinsp;%</CounterBadge>
        </td>
        <td>
          <CounterBadge variant={variant}>{group.stats.faultRateRepartition}&thinsp;%</CounterBadge>
        </td>
      </tr>
    );
  }
}
