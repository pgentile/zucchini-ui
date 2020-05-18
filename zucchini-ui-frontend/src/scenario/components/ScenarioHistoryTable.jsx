import PropTypes from "prop-types";
import React from "react";
import Table from "react-bootstrap/Table";
import Badge from "react-bootstrap/Badge";
import { Link } from "react-router-dom";

import Status from "../../ui/components/Status";
import toNiceDate from "../../ui/toNiceDate";

export default class ScenarioHistoryTable extends React.PureComponent {
  static propTypes = {
    scenarioId: PropTypes.string.isRequired,
    history: PropTypes.arrayOf(PropTypes.object)
  };

  render() {
    const { history, scenarioId } = this.props;

    const rows = history.map((scenario) => {
      const isActive = scenario.id === scenarioId;
      return <ScenarioHistoryTableRow key={scenario.testRun.id} scenario={scenario} isActive={isActive} />;
    });

    return (
      <Table bordered striped hover>
        <thead>
          <tr>
            <th>Type</th>
            <th>Environnement</th>
            <th>Nom</th>
            <th>Tir de test</th>
            <th>Statut</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    );
  }
}

class ScenarioHistoryTableRow extends React.PureComponent {
  static propTypes = {
    scenario: PropTypes.object.isRequired,
    isActive: PropTypes.bool.isRequired
  };

  render() {
    const { scenario, isActive } = this.props;
    const className = isActive ? "table-primary" : null;

    return (
      <tr className={className}>
        <td>
          <Badge>{scenario.testRun.type}</Badge>
        </td>
        <td>
          <Badge>{scenario.testRun.environment}</Badge>
        </td>
        <td>
          <Badge>{scenario.testRun.name}</Badge>
        </td>
        <td>
          <Link to={`/scenarios/${scenario.id}`}>Tir du {toNiceDate(scenario.testRun.date)}</Link>
        </td>
        <td>
          <Status status={scenario.status} />
        </td>
      </tr>
    );
  }
}
