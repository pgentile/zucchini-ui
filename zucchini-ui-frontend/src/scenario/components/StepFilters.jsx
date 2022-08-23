import { memo, useId } from "react";
import { useDispatch, useSelector } from "react-redux";
import FormGroup from "react-bootstrap/FormGroup";
import FormCheck from "react-bootstrap/FormCheck";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";

import { resetStepFilters, toggleStepFilter } from "../../filters/redux";

const FILTERS = {
  comments: "Les commentaires",
  context: "Le contexte",
  beforeAndAfterActions: "Les actions avant / après",
  errorDetails: "Le détail des erreurs",
  logs: "Les logs",
  attachments: "Les pièces jointes"
};

function StepFilters() {
  const filters = useSelector((state) => state.stepFilters);
  const dispatch = useDispatch();

  const handleResetClick = () => dispatch(resetStepFilters());

  const idPrefix = useId();

  const checkboxes = Object.entries(FILTERS).map(([name, label]) => {
    const handleFilterChange = () => dispatch(toggleStepFilter(name));

    return (
      <FormGroup key={name}>
        <FormCheck
          type="checkbox"
          checked={filters[name]}
          onChange={handleFilterChange}
          label={label}
          id={`${idPrefix}-${name}`}
        />
      </FormGroup>
    );
  });

  return (
    <>
      {checkboxes}
      <ButtonGroup>
        <Button variant="outline-secondary" size="sm" onClick={handleResetClick}>
          Tout afficher
        </Button>
      </ButtonGroup>
    </>
  );
}

export default memo(StepFilters);
