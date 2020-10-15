import { memo } from "react";
import PropTypes from "prop-types";

import "./LoadingBar.scss";

function LoadingBar(props) {
  let classNames = "loading-bar";
  ["start", "pending", "ending", "done"].forEach((flagName) => {
    if (props[flagName]) {
      classNames += ` loading-bar-${flagName}`;
    }
  });

  return <div className={classNames} />;
}

LoadingBar.propTypes = {
  start: PropTypes.bool.isRequired,
  pending: PropTypes.bool.isRequired,
  ending: PropTypes.bool.isRequired,
  done: PropTypes.bool.isRequired
};

export default memo(LoadingBar);
