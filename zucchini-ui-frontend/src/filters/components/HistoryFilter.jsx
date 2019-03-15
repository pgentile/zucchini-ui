import PropTypes from "prop-types";
import React from "react";
import FormGroup from "react-bootstrap/lib/FormGroup";

export default class HistoryFilter extends React.PureComponent {
  static propTypes = {
    filters: PropTypes.object.isRequired,
    onFilterChange: PropTypes.func.isRequired
  };

  onFilterChange = name => {
    return event => {
      this.props.onFilterChange({
        [name]: event.target.checked
      });
    };
  };

  render() {
    const { sameTestRunType } = this.props.filters;

    const { sameTestRunEnvironnement } = this.props.filters;

    return (
      <div className="form" style={{ marginBottom: "10px" }}>
        <FormGroup>
          Filtrer :{" "}
          <label className="checkbox-inline">
            <input type="checkbox" checked={sameTestRunType} onChange={this.onFilterChange("sameTestRunType")} />
            Même type de tir
          </label>
          <label className="checkbox-inline">
            <input
              type="checkbox"
              checked={sameTestRunEnvironnement}
              onChange={this.onFilterChange("sameTestRunEnvironnement")}
            />
            Même environnement de tir
          </label>
        </FormGroup>
      </div>
    );
  }
}
