import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import Status from "../../ui/components/Status";
import CounterBadge from "./CounterBadge";
import TabularDataTable, { TabularDataRow } from "./TabularDataTable";

export default function FeatureTable({ features }) {
  const rows = features.map((feature) => {
    return <FeatureTableTableRow key={feature.id} feature={feature} />;
  });

  return (
    <TabularDataTable
      columnNames={[
        "Groupe",
        "Fonctionnalité",
        "Statut",
        "Total",
        "Succès",
        "Échecs",
        "En attente",
        "Non joués",
        "Analysés"
      ]}
      emptyDescription="Aucune fonctionnalité"
      data-testid="feature-table"
    >
      {rows}
    </TabularDataTable>
  );
}

FeatureTable.propTypes = {
  features: PropTypes.arrayOf(PropTypes.object).isRequired
};

function FeatureTableTableRow({ feature }) {
  return (
    <TabularDataRow>
      <td>{feature.group}</td>
      <td>
        <Link to={`/features/${feature.id}`}>{feature.info.name}</Link>
      </td>
      <td>
        <Status status={feature.status} />
      </td>
      <td>
        <CounterBadge>{feature.stats.all.count}</CounterBadge>
      </td>
      <td>
        <CounterBadge>{feature.stats.all.passed}</CounterBadge>
      </td>
      <td>
        <CounterBadge>{feature.stats.all.failed}</CounterBadge>
      </td>
      <td>
        <CounterBadge>{feature.stats.all.pending}</CounterBadge>
      </td>
      <td>
        <CounterBadge>{feature.stats.all.notRun}</CounterBadge>
      </td>
      <td>
        <CounterBadge>{feature.stats.reviewed.count}</CounterBadge>
      </td>
    </TabularDataRow>
  );
}

FeatureTableTableRow.propTypes = {
  feature: PropTypes.object.isRequired
};
