import { useRef, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { PieChart as ChartistPieChart } from "chartist";

export default function PieChart({ data, total, showLabel, donut = true, donutWidth, ...otherProps }) {
  const chartElement = useRef();

  const [chart, setChart] = useState();

  useEffect(() => {
    setChart(new ChartistPieChart(chartElement.current));
  }, []);

  useEffect(() => {
    if (chart) {
      return () => chart.detach();
    }
  }, [chart]);

  useEffect(() => {
    if (chart) {
      chart.update(
        data,
        {
          donut,
          total,
          showLabel,
          donutWidth
        },
        true
      );
    }
  }, [chart, data, donut, donutWidth, showLabel, total]);

  return <div {...otherProps} ref={chartElement} />;
}

PieChart.propTypes = {
  data: PropTypes.any.isRequired,
  total: PropTypes.number.isRequired,
  showLabel: PropTypes.bool.isRequired,
  donut: PropTypes.bool,
  donutWidth: PropTypes.number
};
