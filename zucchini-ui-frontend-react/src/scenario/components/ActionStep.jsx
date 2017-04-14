import PropTypes from 'prop-types';
import React from 'react';

import Step from './Step';


export default class ActionStep extends React.PureComponent {

  render() {
    const { name, action, index, scenarioId, filters } = this.props;

    const step = {
      info: {
        keyword: name,
        name: `#${index + 1}`,
      },
      status: action.status,
      errorMessage: action.errorMessage,
      output: action.output,
    };

    return (
      <Step step={step} scenarioId={scenarioId} filters={filters} special />
    );
  }

}

ActionStep.propTypes = {
  scenarioId: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  action: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  filters: PropTypes.object.isRequired,
};
