import React from 'react';
import PropTypes from 'prop-types';

export default class StepDefinitionsHighlightedTerm extends React.Component {

  static propTypes = {
    text: PropTypes.string.isRequired,
    styleClass: PropTypes.string.isRequired,
  };

  render() {
    const {text, styleClass} = this.props;
    return (
      <span className={styleClass}>{text}</span>
    );
  }
}
