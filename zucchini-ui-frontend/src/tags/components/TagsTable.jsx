import React, { useMemo, memo } from "react";
import PropTypes from "prop-types";
import { useRouteMatch } from "react-router-dom";
import { useSelector } from "react-redux";
import Table from "react-bootstrap/Table";

import Status from "../../ui/components/Status";
import Tag from "../../ui/components/Tag";
import CounterBadge from "../../ui/components/CounterBadge";

function TagsTable() {
  const tags = useSelector((state) => state.tags.tags);
  const filter = useSelector((state) => state.tags.filter);

  const filteredTags = useMemo(() => {
    if (filter) {
      const filterLowerCase = filter.toLowerCase();
      return tags.filter((tag) => tag.tag.toLowerCase().startsWith(filterLowerCase));
    }
    return tags;
  }, [tags, filter]);

  const rows = filteredTags.map((tag) => <TagsTableRow key={tag.tag} tag={tag} />);

  return (
    <Table bordered striped hover responsive>
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

export default memo(TagsTable);

const TagsTableRow = memo(function TagsTableRow({ tag }) {
  const { testRunId } = useRouteMatch().params;

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
});

TagsTableRow.propTypes = {
  tag: PropTypes.object.isRequired
};
