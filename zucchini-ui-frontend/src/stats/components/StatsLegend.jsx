import PropTypes from "prop-types";
import { memo } from "react";
import Table from "react-bootstrap/Table";

import "./StatsLegend.scss";
import Status from "../../ui/components/Status";

function StatsLegend({ stats }) {
  return (
    <Table size="sm" className="mb-0">
      <thead>
        <tr>
          <th>Statut</th>
          <th>Nombre</th>
          <th>%</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <Status status="PASSED" />
          </td>
          <td>{stats.passed}</td>
          <td>{numberAsPercent((100 * stats.passed) / stats.count)}</td>
        </tr>
        <tr>
          <td>
            <Status status="PENDING" />
          </td>
          <td>{stats.pending}</td>
          <td>{numberAsPercent((100 * stats.pending) / stats.count)}</td>
        </tr>
        <tr>
          <td>
            <Status status="FAILED" />
          </td>
          <td>{stats.failed}</td>
          <td>{numberAsPercent((100 * stats.failed) / stats.count)}</td>
        </tr>
        <tr>
          <td>
            <Status status="NOT_RUN" />
          </td>
          <td>{stats.notRun}</td>
          <td>{numberAsPercent((100 * stats.notRun) / stats.count)}</td>
        </tr>
        <tr>
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

function numberAsPercent(n) {
  if (n === null || Number.isNaN(n)) {
    return "N/A";
  }

  // Number formatting returned a result, this is a valid number
  const formatted = n.toFixed(1);
  const thinsp = "\u2009";
  return `${formatted}${thinsp}%`;
}
