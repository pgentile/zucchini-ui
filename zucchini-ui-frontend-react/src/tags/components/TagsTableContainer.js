import { connect } from 'react-redux';
import { createSelector, createStructuredSelector } from 'reselect';

import TagsTable from './TagsTable';


const selectTags = createSelector(
  state => state.tags.tags,
  state => state.tags.filter,
  (tags, filter) => {
    if (filter) {
      return tags.filter(tag => tag.tag.startsWith(filter));
    }
    return tags;
  },
);


const selectProps = createStructuredSelector({
  tags: selectTags,
})


const TagsTableContainer = connect(
  selectProps,
)(TagsTable);

export default TagsTableContainer;
