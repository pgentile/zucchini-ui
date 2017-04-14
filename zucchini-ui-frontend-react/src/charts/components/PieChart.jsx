import PropTypes from 'prop-types';
import React from 'react';

import Chartist from 'chartist';


export default class PieChart extends React.Component {

  constructor(props) {
    super(props);

    this.setChart = this.setChart.bind(this);

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

  render() {
    const style = this.props.style || {};

    return (
      <div style={style} ref={this.setChart} />
    );
  }

  setChart(element) {
    if (this.chart === null) {
      this.chart = new Chartist.Pie(element);
    }
  }

  updateChart() {
    const { data, total, showLabel, donutWidth } = this.props;

    if (this.chart) {
      this.chart.update(data, {
        donut: true,
        total,
        showLabel,
        donutWidth,
      }, true);
    }
  }

}

PieChart.propTypes = {
  data: PropTypes.any.isRequired,
  total: PropTypes.number.isRequired,
  showLabel: PropTypes.bool.isRequired,
  donutWidth: PropTypes.number.isRequired,
  style: PropTypes.object,
};
