import { useDispatch, useSelector } from "react-redux";
import FormGroup from "react-bootstrap/FormGroup";

import FilterCheckboxes from "../../ui/components/FilterCheckboxes";
import { updateScenarioFilters } from "../redux";

const LABELS = {
  passed: "Succès",
  failed: "Échecs",
  pending: "En attente",
  notRun: "Non joués",
  reviewed: "Analysés",
  notReviewed: "Non analysés"
};

export default function ScenarioStateFilter() {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.scenarioFilters);

  const handleFilterChange = (updatedFilters) => {
    dispatch(updateScenarioFilters(updatedFilters));
  };

  return (
    <FormGroup className="mb-2">
      Filtrer les scénarios : <FilterCheckboxes labels={LABELS} filters={filters} onFilterChange={handleFilterChange} />
    </FormGroup>
  );
}
