import PropTypes from "prop-types";
import React from "react";

export default class FilterCheckboxes extends React.PureComponent {
  static propTypes = {
    labels: PropTypes.object.isRequired,
    filters: PropTypes.object.isRequired,
    onFilterChange: PropTypes.func.isRequired
  };

  onFilterChange = (name) => {
    return (event) => {
      this.props.onFilterChange({
        [name]: event.target.checked
      });
    };
  };

  render() {
    const { labels, filters } = this.props;

    const checkboxes = Object.keys(labels).map((name) => {
      const label = labels[name];
      const checked = filters[name];

      return (
        <label key={name} className="checkbox-inline">
          <input type="checkbox" checked={checked} onChange={this.onFilterChange(name)} />
          {label}
        </label>
      );
    });

    return <span>{checkboxes}</span>;
  }
}
