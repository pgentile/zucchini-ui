import PropTypes from "prop-types";
import React from "react";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";

import Status from "../../ui/components/Status";

export default class DifferentScenarioTable extends React.PureComponent {
  static propTypes = {
    differentScenarios: PropTypes.arrayOf(PropTypes.object).isRequired
  };

  render() {
    const { differentScenarios } = this.props;

    const rows = differentScenarios.map((differentScenario) => {
      const { left, right } = differentScenario;
      return <DifferentScenarioTableRow key={right.id} leftScenario={left} rightScenario={right} />;
    });

    return (
      <Table bordered striped hover>
        <thead>
          <tr>
            <th className="col-md-10">Scénario</th>
            <th className="col-md-1">Ancien statut</th>
            <th className="col-md-1">Nouveau statut</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    );
  }
}

class DifferentScenarioTableRow extends React.PureComponent {
  static propTypes = {
    leftScenario: PropTypes.object.isRequired,
    rightScenario: PropTypes.object.isRequired
  };

  render() {
    const { leftScenario, rightScenario } = this.props;
    const scenario = rightScenario;

    return (
      <tr>
        <td>
          <Link to={`/scenarios/${scenario.id}`}>
            <b>{scenario.info.keyword}</b> {scenario.info.name}
          </Link>
        </td>
        <td>
          <Status status={leftScenario.status} />
        </td>
        <td>
          <Status status={rightScenario.status} />
        </td>
      </tr>
    );
  }
}
