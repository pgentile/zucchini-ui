import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import Status from "../../ui/components/Status";
import ReviewedStatus from "../../ui/components/ReviewedStatus";
import TabularDataTable, { TabularDataRow } from "../../ui/components/TabularDataTable";

export default function TagDetailsScenarioTable({ scenarios, selectedScenarioId }) {
  const rows = scenarios.map((scenario) => {
    return <TagDetailsScenarioTableRow key={scenario.id} scenario={scenario} selectedScenarioId={selectedScenarioId} />;
  });

  return (
    <TabularDataTable
      columnNames={["Groupe", "Fonctionnalité", "Scénario", "Statut", "Analysé"]}
      emptyDescription="Aucun scénario"
    >
      {rows}
    </TabularDataTable>
  );
}

TagDetailsScenarioTable.propTypes = {
  scenarios: PropTypes.arrayOf(PropTypes.object),
  selectedScenarioId: PropTypes.string
};

function TagDetailsScenarioTableRow({ scenario, selectedScenarioId }) {
  return (
    <TabularDataRow highlight={scenario.id === selectedScenarioId}>
      <td>{scenario.feature.group}</td>
      <td>
        <Link to={`/features/${scenario.featureId}`}>{scenario.feature.info.name}</Link>
      </td>
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

TagDetailsScenarioTableRow.propTypes = {
  scenario: PropTypes.object.isRequired,
  selectedScenarioId: PropTypes.string
};
