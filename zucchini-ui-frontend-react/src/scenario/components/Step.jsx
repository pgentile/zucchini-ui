import React from 'react';

import SimpleText from '../../ui/components/SimpleText';
import Status from '../../ui/components/Status';
import PanelWithTitle from '../../ui/components/PanelWithTitle';
import ElementInfo from '../../ui/components/ElementInfo';
import StepTable from './StepTable';


export default class Step extends React.PureComponent {

  render() {
    const { step, special } = this.props;

    const title = (
      <ElementInfo info={step.info} />
    );

    let errorMessage = null;
    if (step.errorMessage) {
      errorMessage = (
        <PanelWithTitle title="Message d'erreur" bsStyle="danger" className="panel-error-message">
          <pre className="error-message text-danger">{step.errorMessage}</pre>
        </PanelWithTitle>
      );
    }

    let logs = null;
    if (step.output) {
      logs = (
        <PanelWithTitle title="Logs" bsStyle="default" className="panel-log">
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

    return (
      <div>

        {step.comment && <SimpleText className="text-muted" text={step.comment} />}

        <p>
          {special ? <i>{title}</i> : title}
          {' '}
          <Status status={step.status} />
        </p>

        {table}
        {errorMessage}
        {logs}

        {/* FIXME Display params from table, errors, logs... */}
        {/*

        <div className="panel panel-default" ng-if="$ctrl.filters.attachments && $ctrl.step.attachments.length > 0">
          <div className="panel-heading">
            <h6 className="panel-title">Pièces jointes</h6>
          </div>
          <ul className="list-group">
            <li className="list-group-item" ng-repeat="attachment in $ctrl.step.attachments">
              <a ng-href="{{ $ctrl.buildUrlForAttachment(attachment.id) }}" target="_blank">
                Pièce-jointe #{{ $index + 1 }}
              </a>
            </li>
          </ul>
        </div>
       */}

      </div>
    );
  }

}

Step.propTypes = {
  step: React.PropTypes.object.isRequired,
  special: React.PropTypes.bool.isRequired,
};

Step.defaultProps = {
  special: false,
};
