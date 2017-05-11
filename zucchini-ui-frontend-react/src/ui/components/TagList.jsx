import PropTypes from 'prop-types';
import React from 'react';

import ListWithSeparator from './ListWithSeparator';
import Tag from './Tag';


export default class TagList extends React.PureComponent {

  render() {
    const { tags, testRunId } = this.props;

    // Sort tag list before display
    const sortedTags = [...tags];
    sortedTags.sort();

    const tagElements = sortedTags.map(tag => (
      <Tag key={tag} testRunId={testRunId} tag={tag} />
    ));

    return (
      <ListWithSeparator separator=" ">{tagElements}</ListWithSeparator>
    );
  }

}

TagList.propTypes = {
  testRunId: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
};
