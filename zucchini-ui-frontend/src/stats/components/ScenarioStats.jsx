import PropTypes from "prop-types";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";

import Button from "../../ui/components/Button";
import ScenarioPieChart from "./StatsPieChart";
import StatsLegend from "./StatsLegend";
import { updateStatsDashboardFilters } from "../../filters/redux";
import { selectShowDetails } from "../selectors";

function ScenarioStats({ stats }) {
  const showDetails = useSelector(selectShowDetails);

  const dispatch = useDispatch();

  const handleToogleDetails = () => {
    dispatch(
      updateStatsDashboardFilters({
        showDetails: !showDetails
      })
    );
  };

  return (
    <Container>
      <Row>
        <p>
          <Button
            glyph={showDetails ? "minus" : "plus"}
            size="sm"
            variant="outline-secondary"
            onClick={handleToogleDetails}
          >
            {showDetails ? "Masquer les détails" : "Afficher les détails"}
          </Button>
        </p>
      </Row>
      <Row>
        <Col md={4}>
          <ChartCard
            title="Tous les scénarios"
            chart={<ScenarioPieChart stats={stats.all} total={stats.all.count} showDetails={showDetails} />}
            legend={<StatsLegend stats={stats.all} />}
            showDetails={showDetails}
          />
        </Col>
        <Col md={4}>
          <ChartCard
            title="Scénarios analysés"
            chart={<ScenarioPieChart stats={stats.reviewed} total={stats.all.count} showDetails={showDetails} />}
            legend={<StatsLegend stats={stats.reviewed} />}
          />
        </Col>
        <Col md={4}>
          <ChartCard
            title="Scénarios non analysés"
            chart={<ScenarioPieChart stats={stats.nonReviewed} total={stats.all.count} showDetails={showDetails} />}
            legend={<StatsLegend stats={stats.nonReviewed} />}
          />
        </Col>
      </Row>
    </Container>
  );
}

ScenarioStats.propTypes = {
  stats: PropTypes.object.isRequired
};

export default ScenarioStats;

function ChartCard({ title, chart, legend }) {
  const showDetails = useSelector(selectShowDetails);

  return (
    <Card>
      <Card.Body>
        <Card.Title className="text-center" as="h5">
          {title}
        </Card.Title>
        {chart}
        {showDetails && legend}
      </Card.Body>
    </Card>
  );
}

ChartCard.propTypes = {
  title: PropTypes.string.isRequired,
  chart: PropTypes.element.isRequired,
  legend: PropTypes.element.isRequired
};
