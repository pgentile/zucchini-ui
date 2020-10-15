import PropTypes from "prop-types";
import { PureComponent } from "react";

import ListWithSeparator from "./ListWithSeparator";
import Tag from "./Tag";

export default class TagList extends PureComponent {
  static propTypes = {
    testRunId: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired
  };

  render() {
    const { tags, testRunId } = this.props;

    // Sort tag list before display
    const sortedTags = [...tags];
    sortedTags.sort();

    const tagElements = sortedTags.map((tag) => <Tag key={tag} testRunId={testRunId} tag={tag} />);

    return <ListWithSeparator separator=" ">{tagElements}</ListWithSeparator>;
  }
}
