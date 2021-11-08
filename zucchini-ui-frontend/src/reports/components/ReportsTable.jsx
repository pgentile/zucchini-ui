import PropTypes from "prop-types";
import CounterBadge from "../../ui/components/CounterBadge";
import TabularDataTable, { TabularDataRow } from "../../ui/components/TabularDataTable";

export default function ReportsTable({ groups }) {
  const rows = groups.map((group) => {
    return <ReportsTableRow key={group.name} group={group} />;
  });

  return (
    <TabularDataTable
      columnNames={[
        "Groupe",
        "Total",
        "Succès",
        "Échecs",
        "En attente",
        "Non joués",
        "Taux erreurs",
        "Taux de répartition des erreurs"
      ]}
    >
      {rows}
    </TabularDataTable>
  );
}

ReportsTable.propTypes = {
  groups: PropTypes.arrayOf(PropTypes.object).isRequired
};

function ReportsTableRow({ group }) {
  let variant = null;
  if (group.stats.failed === 0) {
    variant = "success";
  } else if (group.stats.faultRate > 50) {
    variant = "error";
  } else if (group.stats.faultRate > 10) {
    variant = "warning";
  }

  return (
    <TabularDataRow>
      <td>{group.total ? <b>{group.name}</b> : group.name}</td>
      <td>
        <CounterBadge variant={variant}>{group.stats.count}</CounterBadge>
      </td>
      <td>
        <CounterBadge variant={variant}>{group.stats.passed}</CounterBadge>
      </td>
      <td>
        <CounterBadge variant={variant}>{group.stats.failed}</CounterBadge>
      </td>
      <td>
        <CounterBadge variant={variant}>{group.stats.pending}</CounterBadge>
      </td>
      <td>
        <CounterBadge variant={variant}>{group.stats.notRun}</CounterBadge>
      </td>
      <td>
        <CounterBadge variant={variant}>{group.stats.faultRate}&thinsp;%</CounterBadge>
      </td>
      <td>
        <CounterBadge variant={variant}>{group.stats.faultRateRepartition}&thinsp;%</CounterBadge>
      </td>
    </TabularDataRow>
  );
}

ReportsTableRow.propTypes = {
  group: PropTypes.object.isRequired
};
