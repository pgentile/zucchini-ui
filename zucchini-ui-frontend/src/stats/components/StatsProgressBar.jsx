import PropTypes from "prop-types";
import React from "react";
import Badge from "react-bootstrap/Badge";
import ProgressBar from "react-bootstrap/ProgressBar";

export default class ProgressBarStats extends React.PureComponent {
  static propTypes = {
    stats: PropTypes.object.isRequired
  };

  render() {
    const { stats } = this.props;
    const success = (stats.all.passed * 100) / stats.all.count;
    const pending = (stats.all.pending * 100) / stats.all.count;
    const failed = (stats.all.failed * 100) / stats.all.count;
    const notRun = (stats.all.notRun * 100) / stats.all.count;

    return (
      <div>
        <ProgressBar style={{ marginBottom: "0" }}>
          <ProgressBar variant="success" now={success} key={1} label={`${Math.round(success)}%`} />
          <ProgressBar variant="info" now={notRun} key={2} />
          <ProgressBar variant="warning" now={pending} key={3} />
          <ProgressBar active variant="danger" now={failed} key={4} />
        </ProgressBar>
        <h5>
          <Badge variant="success" style={{ marginRight: "1em" }}>
            Succès
          </Badge>
          <Badge variant="info" style={{ marginRight: "1em" }}>
            Non Joués
          </Badge>
          <Badge variant="warning" style={{ marginRight: "1em" }}>
            En attente
          </Badge>
          <Badge variant="danger" style={{ marginRight: "1em" }}>
            Échecs
          </Badge>
        </h5>
      </div>
    );
  }
}
