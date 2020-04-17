import PropTypes from "prop-types";
import React from "react";
import Table from "react-bootstrap/lib/Table";
import Label from "react-bootstrap/lib/Label";
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
            <th className="col-md-2">Type</th>
            <th className="col-md-2">Environnement</th>
            <th className="col-md-2">Nom</th>
            <th className="col-md-5">Tir de test</th>
            <th className="col-md-1">Statut</th>
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
    const className = isActive ? "info" : null;

    return (
      <tr className={className}>
        <td>
          <Label>{scenario.testRun.type}</Label>
        </td>
        <td>
          <Label>{scenario.testRun.environment}</Label>
        </td>
        <td>
          <Label>{scenario.testRun.name}</Label>
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
