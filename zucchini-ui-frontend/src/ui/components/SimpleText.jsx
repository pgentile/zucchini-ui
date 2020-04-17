import PropTypes from "prop-types";
import React from "react";

import tokenizeUrls from "../tokenizeUrls";
import html from "../html";

export default class SimpleText extends React.PureComponent {
  static propTypes = {
    text: PropTypes.string
  };

  render() {
    const { text, ...otherProps } = this.props;

    if (text) {
      const tokens = tokenizeUrls(text);
      let output = "";
      tokens.forEach(([type, value]) => {
        switch (type) {
          case "text":
            output += html` ${value} `;
            break;
          case "url":
            output += html` <a href="${value}">${value}</a> `;
            break;
          case "eol":
            output += "<br/>";
            break;
          default:
            break;
        }
      });

      return <p dangerouslySetInnerHTML={{ __html: output }} {...otherProps} tokens={tokens} />;
    }

    return null;
  }
}
