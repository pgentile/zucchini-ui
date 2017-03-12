import React from 'react';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

import ScenarioPieChart from './StatsPieChart';
import StatsLegend from './StatsLegend';


export default class ScenarioStats extends React.Component {

  render() {
    const { stats } = this.props;

    return (
      <Grid>
        <Row>
          <Col md={4}>
            <h5 className="text-center"><b>Tous les scénarii</b></h5>
          </Col>
          <Col md={4}>
            <h5 className="text-center"><b>Scénarii analysés</b></h5>
          </Col>
          <Col md={4}>
            <h5 className="text-center"><b>Scénarii non analysés</b></h5>
          </Col>
        </Row>
        <Row>
          <Col md={4}>
            <ScenarioPieChart stats={stats.all} total={stats.all.count} />
          </Col>
          <Col md={4}>
            <ScenarioPieChart stats={stats.reviewed} total={stats.all.count} />
          </Col>
          <Col md={4}>
            <ScenarioPieChart stats={stats.nonReviewed} total={stats.all.count} />
          </Col>
        </Row>
        <Row>
          <Col md={4}>
            <StatsLegend stats={stats.all} />
          </Col>
          <Col md={4}>
            <StatsLegend stats={stats.reviewed} />

          </Col>
          <Col md={4}>
            <StatsLegend stats={stats.nonReviewed} />
          </Col>
        </Row>
      </Grid>
    );
  }

}

ScenarioStats.propTypes = {
  stats: React.PropTypes.object.isRequired,
};
