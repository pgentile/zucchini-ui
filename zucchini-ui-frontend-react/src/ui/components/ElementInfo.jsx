import React from 'react';

import tokenizeFromInfo from '../tokenizeFromInfo';
import html from '../html';


export default class ElementInfo extends React.PureComponent {

  render() {
    const { info } = this.props;

    if (info) {
      let output = html`<b>${info.keyword}</b> `;
      tokenizeFromInfo(info).forEach(({ type, value }) => {
        switch (type) {
        case 'text':
          output += html`${value}`;
          break;
        case 'arg':
          output += html`<code>${value}</code>`;
          break;
        default:
          break;
        }
      });

      return (
        <span dangerouslySetInnerHTML={{ __html: output }} />
      );
    }

    return null;
  }

}

ElementInfo.propTypes = {
  info: React.PropTypes.object,
};
