import React from 'react';
import _ from 'lodash';

import tokenizeUrls from '../tokenizeUrls';
import html from '../html';


export default class SimpleText extends React.PureComponent {

  render() {
    const { text, ...otherProps } = this.props;

    if (text) {
      let output = '';
      tokenizeUrls(text).forEach(([type, value]) => {
        switch (type) {
        case 'text':
          output += _.escape(value);
          break;
        case 'url':
          output += html`<a href="${value}" target="_blank">${value}</a>`;
          break;
        case 'eol':
          output += '<br/>';
          break;
        default:
          break;
        }
      });

      return (
        <p dangerouslySetInnerHTML={{ __html: output }} {...otherProps} />
      );
    }

    return null;
  }

}

SimpleText.propTypes = {
  text: React.PropTypes.string,
};
