import PropTypes from "prop-types";
import { memo, useMemo } from "react";

import tokenizeFromInfo from "../tokenizeFromInfo";
import html from "../html";

function ElementInfo({ info }) {
  const htmlContent = useMemo(() => {
    if (!info) {
      return null;
    }

    return tokenizeFromInfo(info).reduce((before, current) => {
      const { type, value } = current;
      switch (type) {
        case "text":
          return before + html` ${value} `;
        case "arg":
          return before + html` <code>${value}</code> `;
        default:
          return before;
      }
    }, "");
  }, [info]);

  return info ? (
    <>
      <b>{info.keyword}</b> <span dangerouslySetInnerHTML={{ __html: htmlContent }} />
    </>
  ) : null;
}

ElementInfo.propTypes = {
  info: PropTypes.object
};

export default memo(ElementInfo);
