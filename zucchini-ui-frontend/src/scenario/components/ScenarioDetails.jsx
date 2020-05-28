import PropTypes from "prop-types";
import React from "react";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import ButtonGroup from "react-bootstrap/ButtonGroup";

import Button from "../../ui/components/Button";
import SimpleText from "../../ui/components/SimpleText";
import ActionStep from "./ActionStep";
import Step from "./Step";
import StepFilters from "./StepFilters";

export default class ScenarioDetails extends React.PureComponent {
  static propTypes = {
    scenario: PropTypes.object,
    filters: PropTypes.object
  };

  render() {
    const { scenario, filters } = this.props;

    const steps = scenario.steps.map((step, index) => {
      return <Step key={index} step={step} scenarioId={scenario.id} filters={filters} />;
    });

    let backgroundSteps = [];
    if (scenario.background && scenario.background.steps) {
      backgroundSteps = scenario.background.steps.map((step, index) => {
        return <Step key={index} step={step} scenarioId={scenario.id} filters={filters} special />;
      });
    }

    const beforeActions = scenario.beforeActions.map((action, index) => {
      return (
        <ActionStep
          key={index}
          index={index}
          name="Pré-action"
          action={action}
          scenarioId={scenario.id}
          filters={filters}
        />
      );
    });

    const afterActions = scenario.afterActions.map((action, index) => {
      return (
        <ActionStep
          key={index}
          index={index}
          name="Post-action"
          action={action}
          scenarioId={scenario.id}
          filters={filters}
        />
      );
    });

    const stepFilters = (
      <Popover id="step-filters">
        <Popover.Title>Configurer les options d&apos;affichage</Popover.Title>
        <Popover.Content>
          <StepFilters />
        </Popover.Content>
      </Popover>
    );

    return (
      <>
        <ButtonGroup className="mb-3">
          <OverlayTrigger rootClose trigger="click" placement="bottom" overlay={stepFilters}>
            <Button variant="outline-secondary" size="sm">
              Options d&apos;affichage
            </Button>
          </OverlayTrigger>
        </ButtonGroup>

        {filters.comments && scenario.comment && <SimpleText className="text-muted" text={scenario.comment} />}
        {filters.beforeAndAfterActions && beforeActions}
        {filters.context && backgroundSteps}
        {steps}
        {filters.beforeAndAfterActions && afterActions}
      </>
    );
  }
}
