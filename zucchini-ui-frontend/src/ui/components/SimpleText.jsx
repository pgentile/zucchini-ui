import PropTypes from "prop-types";
import { memo, useMemo } from "react";

import tokenizeUrls from "../tokenizeUrls";
import html from "../html";

function SimpleText({ text, ...otherProps }) {
  const rawHtml = useMemo(() => {
    let raw = "";
    if (text) {
      const tokens = tokenizeUrls(text);
      tokens.forEach(([type, value]) => {
        switch (type) {
          case "text":
            raw += html` ${value} `;
            break;
          case "url":
            raw += html` <a href="${value}">${value}</a> `;
            break;
          case "eol":
            raw += "<br/>";
            break;
          default:
            break;
        }
      });
    }
    return raw;
  }, [text]);

  return text ? <p dangerouslySetInnerHTML={{ __html: rawHtml }} {...otherProps} /> : null;
}

SimpleText.propTypes = {
  text: PropTypes.string
};

export default memo(SimpleText);
