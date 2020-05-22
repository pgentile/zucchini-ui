import React from "react";
import { useDispatch, useSelector } from "react-redux";
import FormGroup from "react-bootstrap/FormGroup";

import FilterCheckboxes from "../../ui/components/FilterCheckboxes";
import { updateFeatureFilters } from "../redux";

const LABELS = {
  passed: "Succès",
  failed: "Échecs",
  partial: "Partielles",
  notRun: "Non jouées",
  reviewed: "Analysées",
  notReviewed: "Non analysées"
};

export default function FeatureStateFilter() {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.featureFilters);

  const handleFilterChange = (updatedFilters) => {
    dispatch(updateFeatureFilters(updatedFilters));
  };

  return (
    <FormGroup className="mb-2">
      Filtrer les fonctionnalités :{" "}
      <FilterCheckboxes labels={LABELS} filters={filters} onFilterChange={handleFilterChange} />
    </FormGroup>
  );
}
