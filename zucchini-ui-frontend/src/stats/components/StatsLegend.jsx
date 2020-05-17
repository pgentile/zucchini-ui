import PropTypes from "prop-types";
import React, { memo } from "react";
import Table from "react-bootstrap/Table";

import "./StatsLegend.scss";

function StatsLegend({ stats }) {
  return (
    <Table size="sm" className="mb-0">
      <thead>
        <tr>
          <th />
          <th>Statut</th>
          <th>Nombre</th>
          <th>%</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <LegendSample variant="success" />
          </td>
          <td>Succès</td>
          <td>{stats.passed}</td>
          <td>{numberAsPercent((100 * stats.passed) / stats.count)}</td>
        </tr>
        <tr>
          <td>
            <LegendSample variant="warning" />
          </td>
          <td>En attente</td>
          <td>{stats.pending}</td>
          <td>{numberAsPercent((100 * stats.pending) / stats.count)}</td>
        </tr>
        <tr>
          <td>
            <LegendSample variant="danger" />
          </td>
          <td>Échecs</td>
          <td>{stats.failed}</td>
          <td>{numberAsPercent((100 * stats.failed) / stats.count)}</td>
        </tr>
        <tr>
          <td>
            <LegendSample variant="dark" />
          </td>
          <td>Non joués</td>
          <td>{stats.notRun}</td>
          <td>{numberAsPercent((100 * stats.notRun) / stats.count)}</td>
        </tr>
        <tr>
          <td />
          <td>Total</td>
          <td>{stats.count}</td>
          <td className="stats-legend-total">{numberAsPercent((100 * stats.count) / stats.count)}</td>
        </tr>
      </tbody>
    </Table>
  );
}

StatsLegend.propTypes = {
  stats: PropTypes.object.isRequired
};

export default memo(StatsLegend);

function LegendSample({ variant }) {
  return <span className={`rounded-circle bg-${variant} stats-legend-sample`} />;
}

LegendSample.propTypes = {
  variant: PropTypes.string.isRequired
};

function numberAsPercent(n) {
  if (n === null || Number.isNaN(n)) {
    return "N/A";
  }

  // Number formatting returned a result, this is a valid number
  const formatted = n.toFixed(1);
  const thinsp = "\u2009";
  return `${formatted}${thinsp}%`;
}
