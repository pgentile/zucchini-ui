import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";

import Status from "../../ui/components/Status";
import TabularDataTable, { TabularDataRow } from "../../ui/components/TabularDataTable";

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
      <TabularDataTable
        columnNames={["Scénario", "Ancien statut", "Nouveau statut"]}
        emptyDescription="Pas de différence"
      >
        {rows}
      </TabularDataTable>
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
      <TabularDataRow>
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
      </TabularDataRow>
    );
  }
}
