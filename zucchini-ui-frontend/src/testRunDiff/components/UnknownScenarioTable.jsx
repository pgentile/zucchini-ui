import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";

import Status from "../../ui/components/Status";
import TabularDataTable, { TabularDataRow } from "../../ui/components/TabularDataTable";

export default class UnknownScenarioTable extends React.PureComponent {
  static propTypes = {
    scenarios: PropTypes.arrayOf(PropTypes.object).isRequired
  };

  render() {
    const { scenarios } = this.props;

    const rows = scenarios.map((scenario) => {
      return <UnknownScenarioTableRow key={scenario.id} scenario={scenario} />;
    });

    return (
      <TabularDataTable columnNames={["Scénario", "Statut"]} emptyDescription="Aucun scénario">
        {rows}
      </TabularDataTable>
    );
  }
}

class UnknownScenarioTableRow extends React.PureComponent {
  static propTypes = {
    scenario: PropTypes.object.isRequired
  };

  render() {
    const { scenario } = this.props;

    return (
      <TabularDataRow>
        <td>
          <Link to={`/scenarios/${scenario.id}`}>
            <b>{scenario.info.keyword}</b> {scenario.info.name}
          </Link>
        </td>
        <td>
          <Status status={scenario.status} />
        </td>
      </TabularDataRow>
    );
  }
}
