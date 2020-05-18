import PropTypes from "prop-types";
import React from "react";
import Table from "react-bootstrap/Table";

import Status from "../../ui/components/Status";
import Tag from "../../ui/components/Tag";
import CounterBadge from "../../ui/components/CounterBadge";

export default class TagsTable extends React.Component {
  static propTypes = {
    testRunId: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.object).isRequired
  };

  render() {
    const { tags, testRunId } = this.props;

    const rows = tags.map((tag) => {
      return <TagsTableRow key={tag.tag} tag={tag} testRunId={testRunId} />;
    });

    return (
      <Table bordered striped hover>
        <thead>
          <tr>
            <th>Tag</th>
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

class TagsTableRow extends React.PureComponent {
  static propTypes = {
    testRunId: PropTypes.string.isRequired,
    tag: PropTypes.object.isRequired
  };

  render() {
    const { tag, testRunId } = this.props;

    return (
      <tr>
        <td>
          <Tag testRunId={testRunId} tag={tag.tag} />
        </td>
        <td>
          <Status status={tag.status} />
        </td>
        <td>
          <CounterBadge>{tag.stats.all.count}</CounterBadge>
        </td>
        <td>
          <CounterBadge>{tag.stats.all.passed}</CounterBadge>
        </td>
        <td>
          <CounterBadge>{tag.stats.all.failed}</CounterBadge>
        </td>
        <td>
          <CounterBadge>{tag.stats.all.pending}</CounterBadge>
        </td>
        <td>
          <CounterBadge>{tag.stats.all.notRun}</CounterBadge>
        </td>
        <td>
          <CounterBadge>{tag.stats.reviewed.count}</CounterBadge>
        </td>
      </tr>
    );
  }
}
