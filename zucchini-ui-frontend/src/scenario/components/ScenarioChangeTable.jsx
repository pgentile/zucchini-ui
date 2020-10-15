import PropTypes from "prop-types";
import { memo, Fragment } from "react";

import Status from "../../ui/components/Status";
import ReviewedStatus from "../../ui/components/ReviewedStatus";
import toNiceDate from "../../ui/toNiceDate";
import TabularDataTable, { TabularDataRow } from "../../ui/components/TabularDataTable";
import { useSelector } from "react-redux";

function ScenarioChangeTable() {
  const changes = useSelector((state) => state.scenario.scenario.changes);

  const rows = changes.map((change) => {
    return <ScenarioChangeTableRow key={change.id} change={change} />;
  });

  return (
    <TabularDataTable
      columnNames={["Date", "Type", "Ancienne valeur", "Nouvelle valeur"]}
      emptyDescription="Pas de changement"
    >
      {rows}
    </TabularDataTable>
  );
}

export default memo(ScenarioChangeTable);

const ScenarioChangeTableRow = memo(function ScenarioChangeTableRow({ change }) {
  const { label, component: Element } = getChangeConfig(change.type);
  return (
    <TabularDataRow>
      <td>{toNiceDate(change.date)}</td>
      <td>
        <b>{label}</b>
      </td>
      <td>
        <Element>{change.oldValue}</Element>
      </td>
      <td>
        <Element>{change.newValue}</Element>
      </td>
    </TabularDataRow>
  );
});

ScenarioChangeTableRow.propTypes = {
  change: PropTypes.object.isRequired
};

function getChangeConfig(changeType) {
  switch (changeType) {
    case "REVIEWED_STATE":
      return { label: "Analysé ?", component: ReviewedStateContent };
    case "STATUS":
      return { label: "Statut", component: StatusContent };
    default:
      return { label: changeType, component: Fragment };
  }
}

function StatusContent({ children }) {
  return <Status status={children} />;
}

StatusContent.propTypes = {
  children: PropTypes.string.isRequired
};

function ReviewedStateContent({ children }) {
  return <ReviewedStatus reviewed={children} />;
}

ReviewedStateContent.propTypes = {
  children: PropTypes.bool.isRequired
};
