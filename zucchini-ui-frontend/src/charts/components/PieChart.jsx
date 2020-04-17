import PropTypes from "prop-types";
import React from "react";

import Chartist from "chartist";

export default class PieChart extends React.Component {
  static propTypes = {
    data: PropTypes.any.isRequired,
    total: PropTypes.number.isRequired,
    showLabel: PropTypes.bool.isRequired,
    donut: PropTypes.bool.isRequired,
    donutWidth: PropTypes.number,
    style: PropTypes.object
  };

  static defaultProps = {
    donut: true
  };

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
      this.chart = new Chartist.Pie(element);
    }
  };

  updateChart() {
    const { data, total, showLabel, donut, donutWidth } = this.props;

    if (this.chart) {
      this.chart.update(
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
  }

  render() {
    const style = this.props.style || {};

    return <div style={style} ref={this.setChart} />;
  }
}
