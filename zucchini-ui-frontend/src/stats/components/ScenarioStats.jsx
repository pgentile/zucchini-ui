import PropTypes from "prop-types";
import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Button from "../../ui/components/Button";
import ScenarioPieChart from "./StatsPieChart";
import StatsLegend from "./StatsLegend";

export default class ScenarioStats extends React.PureComponent {
  static propTypes = {
    stats: PropTypes.object.isRequired,
    showDetails: PropTypes.bool.isRequired,
    onToggleDetails: PropTypes.func.isRequired
  };

  onToogleDetailsClick = () => {
    this.props.onToggleDetails({
      showDetails: !this.props.showDetails
    });
  };

  render() {
    const { stats, showDetails } = this.props;

    let legendRow = null;
    if (showDetails) {
      legendRow = (
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
      );
    }

    const toggleDetailsButton = {
      glyph: showDetails ? "minus" : "plus",
      text: showDetails ? "Masquer les détails" : "Afficher les détails"
    };

    return (
      <Container>
        <Row>
          <p>
            <Button glyph={toggleDetailsButton.glyph} size="sm" onClick={this.onToogleDetailsClick}>
              {toggleDetailsButton.text}
            </Button>
          </p>
        </Row>
        <Row>
          <Col md={4}>
            <h5 className="text-center">
              <b>Tous les scénarios</b>
            </h5>
          </Col>
          <Col md={4}>
            <h5 className="text-center">
              <b>Scénarios analysés</b>
            </h5>
          </Col>
          <Col md={4}>
            <h5 className="text-center">
              <b>Scénarios non analysés</b>
            </h5>
          </Col>
        </Row>
        <Row>
          <Col md={4}>
            <ScenarioPieChart stats={stats.all} total={stats.all.count} showDetails={showDetails} />
          </Col>
          <Col md={4}>
            <ScenarioPieChart stats={stats.reviewed} total={stats.all.count} showDetails={showDetails} />
          </Col>
          <Col md={4}>
            <ScenarioPieChart stats={stats.nonReviewed} total={stats.all.count} showDetails={showDetails} />
          </Col>
        </Row>
        {legendRow}
      </Container>
    );
  }
}
