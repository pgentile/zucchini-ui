import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import Status from "../../ui/components/Status";
import ReviewedStatus from "../../ui/components/ReviewedStatus";
import TabularDataTable, { TabularDataRow } from "./TabularDataTable";

export default function ScenarioTable({ scenarios, selectedScenarioId }) {
  const rows = scenarios.map((scenario) => {
    return <ScenarioTableRow key={scenario.id} scenario={scenario} selectedScenarioId={selectedScenarioId} />;
  });

  return (
    <TabularDataTable columnNames={["Scénario", "Statut", "Analysé"]} emptyDescription="Aucun scénario">
      {rows}
    </TabularDataTable>
  );
}

ScenarioTable.propTypes = {
  scenarios: PropTypes.arrayOf(PropTypes.object),
  selectedScenarioId: PropTypes.string
};

function ScenarioTableRow({ scenario, selectedScenarioId }) {
  return (
    <TabularDataRow highlight={scenario.id === selectedScenarioId}>
      <td>
        <Link to={`/scenarios/${scenario.id}`}>
          <b>{scenario.info.keyword}</b> {scenario.info.name}
        </Link>
      </td>
      <td>
        <Status status={scenario.status} />
      </td>
      <td>
        <ReviewedStatus reviewed={scenario.reviewed} />
      </td>
    </TabularDataRow>
  );
}

ScenarioTableRow.propTypes = {
  scenario: PropTypes.object.isRequired,
  selectedScenarioId: PropTypes.string
};
