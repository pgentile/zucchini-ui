import PropTypes from "prop-types";
import { useEffect, useRef } from "react";

import { BarChart as ChartistBarChart } from "chartist";

export default function BarChar({
  data,
  showLabel = false,
  stackBars = true,
  seriesBarDistance = 30,
  fullWidth = true,
  axisX = {
    showGrid: false
  },
  axisY = {
    onlyInteger: true
  },
  style
}) {
  const chartElementRef = useRef();
  const chartRef = useRef();

  useEffect(() => {
    const chartElement = chartElementRef.current;
    if (chartElement) {
      const newChart = new ChartistBarChart(chartElement);
      chartRef.current = newChart;
      return () => newChart.detach();
    } else {
      chartRef.current = null;
    }
  }, []);

  useEffect(() => {
    const chart = chartRef.current;
    if (chart) {
      chart.update(
        data,
        {
          showLabel,
          stackBars,
          seriesBarDistance,
          fullWidth,
          axisX,
          axisY
        },
        true
      );
    }
  }, [data, showLabel, stackBars, seriesBarDistance, fullWidth, axisX, axisY]);

  return <div style={style} ref={chartElementRef} />;
}

BarChar.propTypes = {
  data: PropTypes.any.isRequired,
  showLabel: PropTypes.bool,
  stackBars: PropTypes.bool,
  seriesBarDistance: PropTypes.number,
  fullWidth: PropTypes.bool,
  axisX: PropTypes.object,
  axisY: PropTypes.object,
  style: PropTypes.object
};
