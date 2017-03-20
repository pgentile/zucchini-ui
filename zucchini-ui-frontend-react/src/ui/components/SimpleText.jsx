import React from 'react';

import tokenizeUrls from '../tokenizeUrls';


export default class SimpleText extends React.PureComponent {

  render() {
    const { text } = this.props;

    if (text) {
      let html = '';
      tokenizeUrls(text).forEach(([type, value]) => {
        switch (type) {
        case 'text':
          html += _.escape(value);
          break;
        case 'url':
          html += `<a href="${_.escape(value)}" target="_blank">${_.escape(value)}</a>`;
          break;
        case 'eol':
          html += '<br/>';
          break;
        default:
          break;
        }
      });

      return (
        <p dangerouslySetInnerHTML={{ __html: html }}/>
      );
    }

    return null;
  }

}

SimpleText.propTypes = {
  text: React.PropTypes.string,
};
