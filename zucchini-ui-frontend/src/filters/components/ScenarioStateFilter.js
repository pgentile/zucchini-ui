import PropTypes from "prop-types";
import React from "react";
import FormGroup from "react-bootstrap/FormGroup";

import FilterCheckboxes from "../../ui/components/FilterCheckboxes";

const LABELS = {
  passed: "Succès",
  failed: "Échecs",
  pending: "En attente",
  notRun: "Non joués",
  reviewed: "Analysés",
  notReviewed: "Non analysés"
};

export default class ScenarioStateFilter extends React.PureComponent {
  onFilterChange = (filters) => {
    this.props.onFilterChange(filters);
  };

  render() {
    const { filters } = this.props;

    return (
      <div className="form" style={{ marginBottom: "10px" }}>
        <FormGroup>
          Filtrer les scénarios :{" "}
          <FilterCheckboxes labels={LABELS} filters={filters} onFilterChange={this.onFilterChange} />
        </FormGroup>
      </div>
    );
  }
}

ScenarioStateFilter.propTypes = {
  filters: PropTypes.object.isRequired,
  onFilterChange: PropTypes.func.isRequired
};
