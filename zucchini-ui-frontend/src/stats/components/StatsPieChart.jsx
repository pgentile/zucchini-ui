import PropTypes from "prop-types";
import React, { memo } from "react";
import { useSelector } from "react-redux";

import PieChart from "../../charts/components/PieChart";
import { selectShowDetails } from "../selectors";

import "./StatsPieChart.scss";

function StatsPieChart({ stats, total }) {
  const showDetails = useSelector(selectShowDetails);

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

  series = series.filter((serie) => serie.value > 0);

  const data = {
    series
  };

  const height = showDetails ? "16rem" : "8rem";
  const donutWidth = showDetails ? 60 : 30;

  return (
    <div>
      <PieChart data={data} total={total} showLabel={showDetails} donutWidth={donutWidth} style={{ height }} />
    </div>
  );
}

StatsPieChart.propTypes = {
  stats: PropTypes.object.isRequired,
  total: PropTypes.number.isRequired
};

export default memo(StatsPieChart);
