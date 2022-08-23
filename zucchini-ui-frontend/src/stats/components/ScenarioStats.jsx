import PropTypes from "prop-types";
import { memo, useId } from "react";
import { useDispatch, useSelector } from "react-redux";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import FormCheck from "react-bootstrap/FormCheck";
import Col from "react-bootstrap/Col";

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

  const detailsSwitchId = useId();

  return (
    <>
      <Row>
        <Col>
          <Form>
            <FormCheck
              type="switch"
              id={detailsSwitchId}
              label="Vue détaillée"
              checked={showDetails}
              onChange={handleToogleDetails}
              className="mb-2"
            />
          </Form>
        </Col>
      </Row>
      <Row xs={1} lg={3} className="mb-2">
        <Col className="mb-2">
          <ChartCard
            title="Tous les scénarios"
            chart={<ScenarioPieChart stats={stats.all} total={stats.all.count} showDetails={showDetails} />}
            legend={<StatsLegend stats={stats.all} />}
            showDetails={showDetails}
          />
        </Col>
        <Col className="mb-2">
          <ChartCard
            title="Scénarios analysés"
            chart={<ScenarioPieChart stats={stats.reviewed} total={stats.all.count} showDetails={showDetails} />}
            legend={<StatsLegend stats={stats.reviewed} />}
          />
        </Col>
        <Col className="mb-2">
          <ChartCard
            title="Scénarios non analysés"
            chart={<ScenarioPieChart stats={stats.nonReviewed} total={stats.all.count} showDetails={showDetails} />}
            legend={<StatsLegend stats={stats.nonReviewed} />}
          />
        </Col>
      </Row>
    </>
  );
}

ScenarioStats.propTypes = {
  stats: PropTypes.object.isRequired
};

export default memo(ScenarioStats);

function ChartCard({ title, chart, legend }) {
  const showDetails = useSelector(selectShowDetails);

  return (
    <Card>
      <Card.Body>
        <Card.Title className="text-center mb-3" as="h5">
          {title}
        </Card.Title>
        {chart}
        {showDetails && <div className="mt-3">{legend}</div>}
      </Card.Body>
    </Card>
  );
}

ChartCard.propTypes = {
  title: PropTypes.string.isRequired,
  chart: PropTypes.element.isRequired,
  legend: PropTypes.element.isRequired
};
