import PropTypes from "prop-types";
import React from "react";
import Table from "react-bootstrap/Table";
import Badge from "react-bootstrap/Badge";

import "./StatsLegend.scss";

export default class StatsLegend extends React.PureComponent {
  static propTypes = {
    stats: PropTypes.object.isRequired
  };

  render() {
    const { stats } = this.props;

    return (
      <Table size="sm" className="mb-0">
        <thead>
          <tr>
            <th>&nbsp;</th>
            <th>Statut</th>
            <th>Nombre</th>
            <th>%</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <Badge variant="success">&nbsp;</Badge>
            </td>
            <td>Succès</td>
            <td>{stats.passed}</td>
            <td>{numberAsPercent((100 * stats.passed) / stats.count)}</td>
          </tr>
          <tr>
            <td>
              <Badge variant="warning">&nbsp;</Badge>
            </td>
            <td>En attente</td>
            <td>{stats.pending}</td>
            <td>{numberAsPercent((100 * stats.pending) / stats.count)}</td>
          </tr>
          <tr>
            <td>
              <Badge variant="danger">&nbsp;</Badge>
            </td>
            <td>Échecs</td>
            <td>{stats.failed}</td>
            <td>{numberAsPercent((100 * stats.failed) / stats.count)}</td>
          </tr>
          <tr>
            <td>
              <Badge variant="dark">&nbsp;</Badge>
            </td>
            <td>Non joués</td>
            <td>{stats.notRun}</td>
            <td>{numberAsPercent((100 * stats.notRun) / stats.count)}</td>
          </tr>
          <tr className="stats-legend-total">
            <td>&nbsp;</td>
            <td>Total</td>
            <td>{stats.count}</td>
            <td>{numberAsPercent((100 * stats.count) / stats.count)}</td>
          </tr>
        </tbody>
      </Table>
    );
  }
}

function numberAsPercent(n) {
  if (n === null || Number.isNaN(n)) {
    return "N/A";
  }

  // Number formatting returned a result, this is a valid number
  const formatted = n.toFixed(1);
  return `${formatted} %`;
}
