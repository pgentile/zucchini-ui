import PropTypes from "prop-types";
import React from "react";
import Table from "react-bootstrap/lib/Table";
import Label from "react-bootstrap/lib/Label";
import { Link } from "react-router";

import Status from "../../ui/components/Status";

export default class TagDetailsScenarioTable extends React.PureComponent {
  static propTypes = {
    scenarios: PropTypes.arrayOf(PropTypes.object),
    selectedScenarioId: PropTypes.string
  };

  render() {
    const { scenarios, selectedScenarioId } = this.props;

    const rows = scenarios.map(scenario => {
      const isActive = scenario.id === selectedScenarioId;
      return <TagDetailsScenarioTableRow key={scenario.id} scenario={scenario} isActive={isActive} />;
    });

    return (
      <Table bordered striped hover>
        <thead>
          <tr>
            <th className="col-md-1">Groupe</th>
            <th className="col-md-4">Fonctionnalité</th>
            <th className="col-md-5">Scénario</th>
            <th className="col-md-1">Statut</th>
            <th className="col-md-1">Analysé</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    );
  }
}

class TagDetailsScenarioTableRow extends React.PureComponent {
  static propTypes = {
    scenario: PropTypes.object.isRequired,
    isActive: PropTypes.bool.isRequired
  };

  render() {
    const { scenario, isActive } = this.props;
    const className = isActive ? "info" : null;

    const reviewedProps = {
      bsStyle: scenario.reviewed ? "success" : "default",
      text: scenario.reviewed ? "Oui" : "Non"
    };

    return (
      <tr className={className}>
        <td>{scenario.feature.group}</td>
        <td>
          <Link to={{ pathname: `/features/${scenario.featureId}` }}>{scenario.feature.info.name}</Link>
        </td>
        <td>
          <Link to={{ pathname: `/scenarios/${scenario.id}` }}>
            <b>{scenario.info.keyword}</b> {scenario.info.name}
          </Link>
        </td>
        <td>
          <Status status={scenario.status} />
        </td>
        <td>
          <Label bsStyle={reviewedProps.bsStyle}>{reviewedProps.text}</Label>
        </td>
      </tr>
    );
  }
}
