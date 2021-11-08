import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import Status from "../../ui/components/Status";
import TabularDataTable, { TabularDataRow } from "../../ui/components/TabularDataTable";

export default function UnknownScenarioTable({ scenarios }) {
  const rows = scenarios.map((scenario) => {
    return <UnknownScenarioTableRow key={scenario.id} scenario={scenario} />;
  });

  return (
    <TabularDataTable columnNames={["Scénario", "Statut"]} emptyDescription="Aucun scénario">
      {rows}
    </TabularDataTable>
  );
}

UnknownScenarioTable.propTypes = {
  scenarios: PropTypes.arrayOf(PropTypes.object).isRequired
};

function UnknownScenarioTableRow({ scenario }) {
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

UnknownScenarioTableRow.propTypes = {
  scenario: PropTypes.object.isRequired
};
