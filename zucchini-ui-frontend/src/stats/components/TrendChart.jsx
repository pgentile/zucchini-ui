import PropTypes from "prop-types";
import { memo } from "react";
import kebabCase from "lodash/kebabCase";

import BarChart from "../../charts/components/BarChart";

import "./TrendChart.scss";

function TrendChart({ trends }) {
  const series = ["passed", "failed", "pending", "notRun"].map((type) => {
    const serieValues = trends.map((trend) => {
      return trend[type];
    });

    return {
      name: type,
      value: serieValues,
      className: `chart-trend-${kebabCase(type)}`
    };
  });

  return <BarChart data={{ series }} />;
}

TrendChart.propTypes = {
  trends: PropTypes.arrayOf(
    PropTypes.shape({
      passed: PropTypes.number.isRequired,
      failed: PropTypes.number.isRequired,
      pending: PropTypes.number.isRequired,
      notRun: PropTypes.number.isRequired
    })
  ).isRequired
};

export default memo(TrendChart);
