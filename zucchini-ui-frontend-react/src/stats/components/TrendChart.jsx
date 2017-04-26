import PropTypes from 'prop-types';
import React from 'react';
import _ from 'lodash';

import BarChart from '../../charts/components/BarChart';


export default class TrendChart extends React.PureComponent {

  render() {
    const { trends } = this.props;

    const series = [];

    ['passed', 'failed', 'pending', 'notRun'].forEach(function (type) {
      const serieValues = trends.map(function (trend) {
        return trend[type];
      });

      series.push({
        name: type,
        value: serieValues,
        className: `chart-trend-${_.kebabCase(type)}`,
      });
    });

    return (
      <BarChart data={{ series }} />
    );
  }

}

TrendChart.propTypes = {
  trends: PropTypes.arrayOf(PropTypes.shape({
    passed: PropTypes.number.isRequired,
    failed: PropTypes.number.isRequired,
    pending: PropTypes.number.isRequired,
    notRun: PropTypes.number.isRequired,
  })).isRequired,
};
