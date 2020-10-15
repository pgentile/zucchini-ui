import PropTypes from "prop-types";
import { PureComponent } from "react";
import { Link } from "react-router-dom";

import Status from "../../ui/components/Status";
import toNiceDate from "../../ui/toNiceDate";
import CounterBadge from "../../ui/components/CounterBadge";
import TabularDataTable, { TabularDataRow } from "../../ui/components/TabularDataTable";

export default class FeatureHistoryTable extends PureComponent {
  static propTypes = {
    featureId: PropTypes.string.isRequired,
    history: PropTypes.arrayOf(PropTypes.object)
  };

  render() {
    const { history, featureId } = this.props;

    const rows = history.map((feature) => {
      const isActive = feature.id === featureId;
      return <FeatureHistoryTableRow key={feature.id} feature={feature} isActive={isActive} />;
    });

    return (
      <TabularDataTable
        columnNames={[
          "Type",
          "Environnement",
          "Nom",
          "Tir de test",
          "Statut",
          "Total",
          "Succès",
          "Échecs",
          "En attente",
          "Non joués",
          "Analysés"
        ]}
      >
        {rows}
      </TabularDataTable>
    );
  }
}

class FeatureHistoryTableRow extends PureComponent {
  static propTypes = {
    feature: PropTypes.object.isRequired,
    isActive: PropTypes.bool.isRequired
  };

  render() {
    const { feature, isActive } = this.props;

    return (
      <TabularDataRow highlight={isActive}>
        <td>{feature.testRun.type}</td>
        <td>{feature.testRun.environment}</td>
        <td>{feature.testRun.name}</td>
        <td>
          <Link to={`/features/${feature.id}`}>Tir du {toNiceDate(feature.testRun.date)}</Link>
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
}
