import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import Status from "../../ui/components/Status";
import TabularDataTable, { TabularDataRow } from "../../ui/components/TabularDataTable";

export default function DifferentScenarioTable({ differentScenarios }) {
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

DifferentScenarioTable.propTypes = {
  differentScenarios: PropTypes.arrayOf(PropTypes.object).isRequired
};

function DifferentScenarioTableRow({ leftScenario, rightScenario }) {
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

DifferentScenarioTableRow.propTypes = {
  leftScenario: PropTypes.object.isRequired,
  rightScenario: PropTypes.object.isRequired
};
