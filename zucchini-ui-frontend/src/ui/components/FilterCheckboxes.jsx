import PropTypes from "prop-types";
import React from "react";
import FormCheck from "react-bootstrap/FormCheck";

import useUniqueId from "../../useUniqueId";

export default function FilterCheckboxes({ labels, filters, onFilterChange }) {
  const idPrefix = useUniqueId();

  const checkboxes = Object.entries(labels).map(([name, label]) => {
    const checked = filters[name];

    const handleFilterChange = (event) => {
      onFilterChange({
        [name]: event.target.checked
      });
    };

    return (
      <FormCheck
        key={name}
        inline
        id={`${idPrefix}-filter-${name}`}
        label={label}
        type="checkbox"
        checked={checked}
        onChange={handleFilterChange}
      />
    );
  });

  return checkboxes;
}

FilterCheckboxes.propTypes = {
  labels: PropTypes.object.isRequired,
  filters: PropTypes.object.isRequired,
  onFilterChange: PropTypes.func.isRequired
};
