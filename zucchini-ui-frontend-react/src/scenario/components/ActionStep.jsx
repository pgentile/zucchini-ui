import React from 'react';

import Step from './Step';


export default class ActionStep extends React.PureComponent {

  render() {
    const { name, action, index } = this.props;

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
      <Step step={step} special />
    );
  }

}

ActionStep.propTypes = {
  name: React.PropTypes.string.isRequired,
  action: React.PropTypes.object.isRequired,
  index: React.PropTypes.number.isRequired,
};
