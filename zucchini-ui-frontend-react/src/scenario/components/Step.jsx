import React from 'react';

import SimpleText from '../../ui/components/SimpleText';
import Status from '../../ui/components/Status';
import PanelWithTitle from '../../ui/components/PanelWithTitle';


export default class Step extends React.PureComponent {

  render() {
    const { step, special } = this.props;

    const title = (
      <span><b>{step.info.keyword}</b> {step.info.name}</span>
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

    return (
      <div>

        {step.comment && <SimpleText className="text-muted" text={step.comment} />}

        {/* FIXME Display arguments... */}
        <p>
          {special ? <i>{title}</i> : title}
          {' '}
          <Status status={step.status} />
        </p>

        {errorMessage}
        {logs}

        {/* FIXME Display params from table, errors, logs... */}
        {/*
        <table ng-if="$ctrl.step.table" className="table table-bordered" style="width: auto">
          <tbody>
            <tr ng-repeat="row in $ctrl.step.table">
              <td ng-repeat="cell in row"><code>{{ cell }}</code></td>
            </tr>
          </tbody>
        </table>

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
