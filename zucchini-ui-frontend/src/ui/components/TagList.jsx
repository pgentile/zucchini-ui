import PropTypes from "prop-types";

import ListWithSeparator from "./ListWithSeparator";
import Tag from "./Tag";

export default function TagList({ tags, testRunId }) {
  // Sort tag list before display
  const sortedTags = [...tags].sort();

  const tagElements = sortedTags.map((tag) => <Tag key={tag} testRunId={testRunId} tag={tag} />);

  return <ListWithSeparator separator=" ">{tagElements}</ListWithSeparator>;
}

TagList.propTypes = {
  testRunId: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string).isRequired
};
