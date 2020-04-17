import PropTypes from "prop-types";
import React from "react";

import PieChart from "../../charts/components/PieChart";

export default class StatsPieChart extends React.PureComponent {
  static propTypes = {
    stats: PropTypes.object.isRequired,
    total: PropTypes.number.isRequired,
    showDetails: PropTypes.bool.isRequired
  };

  render() {
    const { stats, total, showDetails } = this.props;

    let series = [
      {
        value: stats.passed,
        className: "chart-progress-passed"
      },
      {
        value: stats.pending,
        className: "chart-progress-pending"
      },
      {
        value: stats.failed,
        className: "chart-progress-failed"
      },
      {
        value: stats.notRun,
        className: "chart-progress-not-run"
      },
      {
        value: total - stats.count,
        className: "chart-progress-others"
      }
    ];

    series = series.filter(function (serie) {
      return serie.value > 0;
    });

    const data = {
      series
    };

    const height = showDetails ? "20rem" : "12rem";
    const donutWidth = showDetails ? 60 : 30;

    return (
      <div style={{ height }}>
        <PieChart data={data} total={total} showLabel={showDetails} donutWidth={donutWidth} style={{ height }} />
      </div>
    );
  }
}
