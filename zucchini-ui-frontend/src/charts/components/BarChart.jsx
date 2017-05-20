import PropTypes from 'prop-types';
import React from 'react';

import Chartist from 'chartist';


export default class BarChart extends React.Component {
  constructor(props) {
    super(props);

    this.chart = null;
  }

  componentDidMount() {
    this.updateChart();
  }

  componentDidUpdate() {
    this.updateChart();
  }

  componentWillUnmount() {
    if (this.chart) {
      this.chart.detach();
    }
  }

  setChart = (element) => {
    if (this.chart === null) {
      this.chart = new Chartist.Bar(element);
    }
  };

  updateChart() {
    const { data, showLabel, stackBars, seriesBarDistance, fullWidth, axisX, axisY } = this.props;

    if (this.chart) {
      this.chart.update(data, {
        showLabel,
        stackBars,
        seriesBarDistance,
        fullWidth,
        axisX,
        axisY,
      }, true);
    }
  }

  render() {
    const { style } = this.props;

    return (
      <div style={style} ref={this.setChart} />
    );
  }
}

BarChart.propTypes = {
  data: PropTypes.any.isRequired,
  showLabel: PropTypes.bool.isRequired,
  stackBars: PropTypes.bool.isRequired,
  seriesBarDistance: PropTypes.number.isRequired,
  fullWidth: PropTypes.bool.isRequired,
  axisX: PropTypes.object.isRequired,
  axisY: PropTypes.object.isRequired,
  style: PropTypes.object,
};

BarChart.defaultProps = {
  showLabel: false,
  stackBars: true,
  seriesBarDistance: 30,
  fullWidth: true,
  axisX: {
    showGrid: false,
  },
  axisY: {
    onlyInteger: true,
  },
};
