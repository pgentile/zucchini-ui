import PropTypes from 'prop-types';
import React from 'react';
import {ProgressBar} from 'react-bootstrap';

export default class ProgressBarStats extends React.PureComponent {

  render() {
    const {stats} = this.props;
    const success = (stats.all.passed * 100) / stats.all.count;
    const pending = (stats.all.pending * 100) / stats.all.count;
    const failed = (stats.all.failed * 100) / stats.all.count;
    const notRun = (stats.all.notRun * 100) / stats.all.count;

    return (
      <ProgressBar>
        <ProgressBar bsStyle='success' now={success} key={1} label={`${Math.round(success)}%`}/>
        <ProgressBar striped bsStyle='warning' now={notRun} key={2}/>
        <ProgressBar bsStyle='warning' now={pending} key={3}/>
        <ProgressBar active bsStyle='danger' now={failed} key={4}/>
      </ProgressBar>
    );
  }
}

ProgressBarStats.propTypes = {
  stats: PropTypes.object.isRequired,
};
