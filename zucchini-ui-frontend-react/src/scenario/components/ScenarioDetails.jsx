import React from 'react';
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';
import Button from 'react-bootstrap/lib/Button';

import SimpleText from '../../ui/components/SimpleText';
import ActionStep from './ActionStep';
import Step from './Step';
import StepFiltersContainer from './StepFiltersContainer';


export default class ScenarioDetails extends React.PureComponent {

  render() {
    const { scenario, filters } = this.props;

    const steps = scenario.steps.map((step, index) => {
      return (
        <Step key={index} step={step} scenarioId={scenario.id} filters={filters} />
      );
    });

    let backgroundSteps = [];
    if (scenario.background && scenario.background.steps) {
      backgroundSteps = scenario.background.steps.map((step, index) => {
        return (
          <Step key={index} step={step} scenarioId={scenario.id} filters={filters} special />
        );
      });
    }

    const beforeActions = scenario.beforeActions.map((action, index) => {
      return (
        <ActionStep key={index} index={index} name="Pré-action" action={action} scenarioId={scenario.id} filters={filters} />
      );
    })

    const afterActions = scenario.afterActions.map((action, index) => {
      return (
        <ActionStep key={index} index={index} name="Post-action" action={action} scenarioId={scenario.id} filters={filters} />
      );
    })

    const stepFilters = (
      <StepFiltersContainer />
    );

    return (
      <div>
        <p>
          <OverlayTrigger rootClose trigger="click" placement="right" overlay={stepFilters}>
            <Button bsSize="xsmall">Options d'affichage</Button>
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

ScenarioDetails.propTypes = {
  scenario: React.PropTypes.object,
  filters: React.PropTypes.object,
};
