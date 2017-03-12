import React from 'react';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

import ScenarioPieChart from './StatsPieChart';


export default class ScenarioStats extends React.Component {

  render() {
    const { stats } = this.props;

    return (
      <Grid>
        <Row>
          <Col md={4}>
            <h5 className="text-center">Tous les scénarii</h5>
            <ScenarioPieChart stats={stats.all} total={stats.all.count} />
          </Col>
          <Col md={4}>
            <h5 className="text-center">Scénarii analysés</h5>
            <ScenarioPieChart stats={stats.reviewed} total={stats.all.count} />
          </Col>
          <Col md={4}>
            <h5 className="text-center">Scénarii non analysés</h5>
            <ScenarioPieChart stats={stats.nonReviewed} total={stats.all.count} />
          </Col>
        </Row>
      </Grid>
    );
  }

}

ScenarioStats.propTypes = {
  stats: React.PropTypes.object.isRequired,
};
