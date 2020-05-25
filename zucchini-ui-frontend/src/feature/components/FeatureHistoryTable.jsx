import PropTypes from "prop-types";
import React from "react";
import Table from "react-bootstrap/Table";
import Badge from "react-bootstrap/Badge";
import { Link } from "react-router-dom";

import Status from "../../ui/components/Status";
import toNiceDate from "../../ui/toNiceDate";
import CounterBadge from "../../ui/components/CounterBadge";

export default class FeatureHistoryTable extends React.PureComponent {
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
      <Table bordered striped hover responsive>
        <thead>
          <tr>
            <th>Type</th>
            <th>Environnement</th>
            <th>Nom</th>
            <th>Tir de test</th>
            <th>Statut</th>
            <th>Total</th>
            <th>Succès</th>
            <th>Échecs</th>
            <th>En attente</th>
            <th>Non joués</th>
            <th>Analysés</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    );
  }
}

class FeatureHistoryTableRow extends React.PureComponent {
  static propTypes = {
    feature: PropTypes.object.isRequired,
    isActive: PropTypes.bool.isRequired
  };

  render() {
    const { feature, isActive } = this.props;
    const className = isActive ? "table-primary" : null;

    return (
      <tr className={className}>
        <td>
          <Badge>{feature.testRun.type}</Badge>
        </td>
        <td>
          <Badge>{feature.testRun.environment}</Badge>
        </td>
        <td>
          <Badge>{feature.testRun.name}</Badge>
        </td>
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
      </tr>
    );
  }
}
