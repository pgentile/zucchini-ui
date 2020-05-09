import PropTypes from "prop-types";
import React from "react";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import { Provider } from "react-redux";

import store from "../../store";

import Button from "../../ui/components/Button";
import SimpleText from "../../ui/components/SimpleText";
import ActionStep from "./ActionStep";
import Step from "./Step";
import StepFiltersContainer from "./StepFiltersContainer";

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

    // For good popover placement :
    //   - The container prop of the OverlayTrigger must have a CSS relative position
    //   - The overlay prop of the OverlayTrigger must be the Popover element
    const stepFilters = (
      <Popover id="step-filters" title="Configurer les options d'affichage">
        <Provider store={store}>
          <StepFiltersContainer />
        </Provider>
      </Popover>
    );

    return (
      <div style={{ position: "relative" }}>
        <p>
          <OverlayTrigger container={this} rootClose trigger="click" placement="bottom" overlay={stepFilters}>
            <Button bsSize="xsmall">Options d&apos;affichage</Button>
          </OverlayTrigger>
        </p>

        {filters.comments && scenario.comment && <SimpleText className="text-muted" text={scenario.comment} />}
        {filters.beforeAndAfterActions && beforeActions}
        {filters.context && backgroundSteps}
        {steps}
        {filters.beforeAndAfterActions && afterActions}
      </div>
    );
  }
}
