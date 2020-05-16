import PropTypes from "prop-types";
import React from "react";
import FormGroup from "react-bootstrap/FormGroup";

import FilterCheckboxes from "../../ui/components/FilterCheckboxes";

const LABELS = {
  sameTestRunType: "Même type de tir",
  sameTestRunEnvironment: "Même environnement de tir"
};

export default class HistoryFilter extends React.PureComponent {
  static propTypes = {
    filters: PropTypes.object.isRequired,
    onFilterChange: PropTypes.func.isRequired
  };

  render() {
    const { onFilterChange, filters } = this.props;

    return (
      <div className="form" style={{ marginBottom: "10px" }}>
        <FormGroup>
          Filtrer : <FilterCheckboxes labels={LABELS} filters={filters} onFilterChange={onFilterChange} />
        </FormGroup>
      </div>
    );
  }
}
