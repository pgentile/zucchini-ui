import PropTypes from "prop-types";
import React, { memo } from "react";

import Step from "./Step";

function ActionStep({ name, action, index }) {
  const step = {
    ...action,
    info: {
      keyword: name,
      name: `#${index + 1}`
    }
  };

  return <Step step={step} special />;
}

ActionStep.propTypes = {
  name: PropTypes.string.isRequired,
  action: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired
};

export default memo(ActionStep);
