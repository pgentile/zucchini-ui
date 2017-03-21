import React from 'react';
import _ from 'lodash';

import tokenizeFromInfo from '../tokenizeFromInfo';


export default class ElementInfo extends React.PureComponent {

  render() {
    const { info } = this.props;

    if (info) {
      let html = `<b>${_.escape(info.keyword)}</b> `;
      tokenizeFromInfo(info).forEach(({ type, value }) => {
        switch (type) {
        case 'text':
          html += _.escape(value);
          break;
        case 'arg':
          html += `<code>${_.escape(value)}</code>`;
          break;
        default:
          break;
        }
      });

      return (
        <span dangerouslySetInnerHTML={{ __html: html }} />
      );
    }

    return null;
  }

}

ElementInfo.propTypes = {
  info: React.PropTypes.object,
};
