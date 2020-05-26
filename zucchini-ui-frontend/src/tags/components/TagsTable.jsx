import React, { useMemo, memo } from "react";
import PropTypes from "prop-types";
import { useRouteMatch } from "react-router-dom";
import { useSelector } from "react-redux";

import Status from "../../ui/components/Status";
import Tag from "../../ui/components/Tag";
import CounterBadge from "../../ui/components/CounterBadge";
import TabularDataTable, { TabularDataRow } from "../../ui/components/TabularDataTable";

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
    <TabularDataTable
      columnNames={["Tag", "Statut", "Total", "Succès", "Échecs", "En attente", "Non joués", "Analysés"]}
      emptyDescription="Aucun tag"
    >
      {rows}
    </TabularDataTable>
  );
}

export default memo(TagsTable);

const TagsTableRow = memo(function TagsTableRow({ tag }) {
  const { testRunId } = useRouteMatch().params;

  return (
    <TabularDataRow>
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
    </TabularDataRow>
  );
});

TagsTableRow.propTypes = {
  tag: PropTypes.object.isRequired
};
