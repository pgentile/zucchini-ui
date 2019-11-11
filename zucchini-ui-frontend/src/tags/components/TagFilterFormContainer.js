import { connect } from "react-redux";
import TagFilterForm from "./TagFilterForm";

import { setTagFilter } from "../redux";

const TagFilterFormContainer = connect(undefined, {
  onFilterChange: setTagFilter
})(TagFilterForm);

export default TagFilterFormContainer;
