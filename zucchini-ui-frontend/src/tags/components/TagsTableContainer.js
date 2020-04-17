import { connect } from "react-redux";
import { createSelector, createStructuredSelector } from "reselect";
import { formValueSelector } from "redux-form";

import TagsTable from "./TagsTable";

const tagFilterSelector = formValueSelector("tagFilter");

const selectTags = createSelector(
  (state) => state.tags.tags,
  (state) => tagFilterSelector(state, "filter"),
  (tags, filter) => {
    if (filter) {
      const filterLowerCase = filter.toLowerCase();
      return tags.filter((tag) => tag.tag.toLowerCase().startsWith(filterLowerCase));
    }
    return tags;
  }
);

const selectProps = createStructuredSelector({
  tags: selectTags
});

const TagsTableContainer = connect(selectProps)(TagsTable);

export default TagsTableContainer;
