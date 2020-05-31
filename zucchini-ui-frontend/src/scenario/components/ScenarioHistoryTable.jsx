import React, { memo, useMemo } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import Status from "../../ui/components/Status";
import toNiceDate from "../../ui/toNiceDate";
import TabularDataTable, { TabularDataRow } from "../../ui/components/TabularDataTable";

function ScenarioHistoryTable() {
  const testRun = useSelector((state) => state.testRun.testRun);
  const history = useSelector((state) => state.scenario.history);
  const { sameTestRunType, sameTestRunEnvironment } = useSelector((state) => state.historyFilters);

  const selectedHistory = useMemo(() => {
    let filteredHistory = history;

    if (sameTestRunType) {
      filteredHistory = filteredHistory.filter((scenario) => scenario.testRun.type === testRun.type);
    }

    if (sameTestRunEnvironment) {
      filteredHistory = filteredHistory.filter((scenario) => scenario.testRun.environment === testRun.environment);
    }

    return filteredHistory;
  }, [history, testRun, sameTestRunType, sameTestRunEnvironment]);

  const rows = selectedHistory.map((scenario) => {
    return <ScenarioHistoryTableRow key={scenario.testRun.id} scenario={scenario} />;
  });

  return (
    <TabularDataTable columnNames={["Type", "Environnement", "Nom", "Tir de test", "Statut"]}>{rows}</TabularDataTable>
  );
}

export default memo(ScenarioHistoryTable);

const ScenarioHistoryTableRow = memo(function ScenarioHistoryTableRow({ scenario }) {
  const { scenarioId } = useParams();

  return (
    <TabularDataRow highlight={scenario.id === scenarioId}>
      <td>{scenario.testRun.type}</td>
      <td>{scenario.testRun.environment}</td>
      <td>{scenario.testRun.name}</td>
      <td>
        <Link to={`/scenarios/${scenario.id}`}>Tir du {toNiceDate(scenario.testRun.date)}</Link>
      </td>
      <td>
        <Status status={scenario.status} />
      </td>
    </TabularDataRow>
  );
});

ScenarioHistoryTableRow.propTypes = {
  scenario: PropTypes.object.isRequired
};
