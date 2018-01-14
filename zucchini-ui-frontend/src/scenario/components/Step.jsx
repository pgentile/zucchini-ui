import PropTypes from 'prop-types';
import React from 'react';

import SimpleText from '../../ui/components/SimpleText';
import Status from '../../ui/components/Status';
import PanelWithTitle from '../../ui/components/PanelWithTitle';
import ElementInfo from '../../ui/components/ElementInfo';
import StepTable from './StepTable';
import StepAttachments from './StepAttachments';


export default class Step extends React.PureComponent {

  render() {
    const { step, scenarioId, special, filters } = this.props;

    const title = (
      <ElementInfo info={step.info} />
    );

    let errorMessage = null;
    if (step.errorMessage) {
      errorMessage = (
        <PanelWithTitle title="Message d'erreur" panelBody={true} bsStyle="danger" className="panel-error-message">
          <pre className="error-message text-danger">{step.errorMessage}</pre>
        </PanelWithTitle>
      );
    }

    let logs = null;
    if (step.output) {
      logs = (
        <PanelWithTitle title="Logs" panelBody={true} bsStyle="default" className="panel-log">
          <pre className="log">{step.output}</pre>
        </PanelWithTitle>
      );
    }

    let table = null;
    if (step.table) {
      table = (
        <StepTable table={step.table} />
      );
    }

    let attachments = null;
    if (step.attachments && step.attachments.length > 0) {
      attachments = (
        <StepAttachments scenarioId={scenarioId} attachments={step.attachments} />
      );
    }

    return (
      <div>

        {filters.comments && step.comment && <SimpleText className="text-muted" text={step.comment} />}

        <p>
          {special ? <i>{title}</i> : title}
          {' '}
          <Status status={step.status} />
        </p>

        {table}
        {filters.errorDetails && errorMessage}
        {filters.logs && logs}
        {filters.attachments && attachments}

      </div>
    );
  }

}

Step.propTypes = {
  scenarioId: PropTypes.string.isRequired,
  step: PropTypes.object.isRequired,
  special: PropTypes.bool.isRequired,
  filters: PropTypes.object.isRequired,
};

Step.defaultProps = {
  special: false,
};
