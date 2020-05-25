import PropTypes from "prop-types";
import React from "react";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";

import Status from "../../ui/components/Status";
import CounterBadge from "./CounterBadge";

export default class FeatureTable extends React.Component {
  static propTypes = {
    features: PropTypes.arrayOf(PropTypes.object).isRequired
  };

  render() {
    const { features } = this.props;

    const rows = features.map((feature) => {
      return <FeatureTableTableRow key={feature.id} feature={feature} />;
    });

    return (
      <Table bordered striped hover responsive>
        <thead>
          <tr>
            <th>Groupe</th>
            <th>Fonctionnalité</th>
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

class FeatureTableTableRow extends React.PureComponent {
  static propTypes = {
    feature: PropTypes.object.isRequired
  };

  render() {
    const { feature } = this.props;

    return (
      <tr>
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
      </tr>
    );
  }
}
