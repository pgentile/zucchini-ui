import PropTypes from 'prop-types';
import React from 'react';
import { Label, ProgressBar } from 'react-bootstrap';

export default class ProgressBarStats extends React.PureComponent {

  static propTypes = {
    stats: PropTypes.object.isRequired,
  };

  render() {
    const { stats } = this.props;
    const success = (stats.all.passed * 100) / stats.all.count;
    const pending = (stats.all.pending * 100) / stats.all.count;
    const failed = (stats.all.failed * 100) / stats.all.count;
    const notRun = (stats.all.notRun * 100) / stats.all.count;

    return (
      <div>
        <ProgressBar style={{ marginBottom: '0' }}>
          <ProgressBar bsStyle='success' now={success} key={1} label={`${Math.round(success)}%`} />
          <ProgressBar bsStyle='info' now={notRun} key={2} />
          <ProgressBar bsStyle='warning' now={pending} key={3} />
          <ProgressBar active bsStyle='danger' now={failed} key={4} />
        </ProgressBar>
        <h5>
          <Label bsStyle='success' style={{ marginRight: '1em' }}>Succès : {stats.all.passed}</Label>
          <Label bsStyle='info' style={{ marginRight: '1em' }}>Non Joués : {stats.all.pending}</Label>
          <Label bsStyle='warning' style={{ marginRight: '1em' }}>En attente : {stats.all.failed}</Label>
          <Label bsStyle='danger' style={{ marginRight: '1em' }}>Échecs : {stats.all.notRun}</Label>
        </h5>
      </div>
    );
  }
}


