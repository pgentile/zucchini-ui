import React from "react";
import { useDispatch, useSelector } from "react-redux";
import FormGroup from "react-bootstrap/FormGroup";

import FilterCheckboxes from "../../ui/components/FilterCheckboxes";
import { updateHistoryFilters } from "../redux";

const LABELS = {
  sameTestRunType: "Même type de tir",
  sameTestRunEnvironment: "Même environnement de tir"
};

export default function HistoryFilter() {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.historyFilters);

  const handleFilterChange = (updatedFilters) => {
    dispatch(updateHistoryFilters(updatedFilters));
  };

  return (
    <FormGroup className="mb-2">
      Filtrer : <FilterCheckboxes labels={LABELS} filters={filters} onFilterChange={handleFilterChange} />
    </FormGroup>
  );
}
