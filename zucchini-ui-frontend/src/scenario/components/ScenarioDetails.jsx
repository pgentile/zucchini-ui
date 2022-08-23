import { memo, useId } from "react";
import { useSelector } from "react-redux";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import ButtonGroup from "react-bootstrap/ButtonGroup";

import Button from "../../ui/components/Button";
import SimpleText from "../../ui/components/SimpleText";
import ActionStep from "./ActionStep";
import Step from "./Step";
import StepFilters from "./StepFilters";

function ScenarioDetails() {
  const scenario = useSelector((state) => state.scenario.scenario);
  const filters = useSelector((state) => state.stepFilters);

  const steps = scenario.steps.map((step, index) => {
    return <Step key={index} step={step} />;
  });

  let backgroundSteps = [];
  if (filters.context && scenario.background && scenario.background.steps) {
    backgroundSteps = scenario.background.steps.map((step, index) => {
      return <Step key={index} step={step} special />;
    });
  }

  let beforeActions = [];
  let afterActions = [];
  if (filters.beforeAndAfterActions) {
    beforeActions = scenario.beforeActions.map((action, index) => {
      return <ActionStep key={index} index={index} name="Pré-action" action={action} />;
    });

    afterActions = scenario.afterActions.map((action, index) => {
      return <ActionStep key={index} index={index} name="Post-action" action={action} />;
    });
  }

  const items = [...beforeActions, ...backgroundSteps, ...steps, ...afterActions].map((item, index) => {
    return <li key={index}>{item}</li>;
  });

  const stepFilterId = useId();

  const stepFilters = (
    <Popover id={stepFilterId}>
      <Popover.Title>Configurer les options d&apos;affichage</Popover.Title>
      <Popover.Content>
        <StepFilters />
      </Popover.Content>
    </Popover>
  );

  return (
    <>
      <ButtonGroup className="mb-3">
        <OverlayTrigger rootClose trigger="click" placement="right-start" overlay={stepFilters}>
          <Button variant="outline-secondary" size="sm">
            Options d&apos;affichage
          </Button>
        </OverlayTrigger>
      </ButtonGroup>

      {filters.comments && scenario.comment && <SimpleText className="text-muted" text={scenario.comment} />}

      <ol className="list-unstyled">{items}</ol>
    </>
  );
}

export default memo(ScenarioDetails);
