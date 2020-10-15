import { memo } from "react";
import Button from "./Button";
import { Link } from "react-router-dom";

function ButtonLink({ children, ...otherProps }) {
  return (
    <Button as={Link} role="button" {...otherProps}>
      {children}
    </Button>
  );
}

ButtonLink.propTypes = {
  ...Link.propTypes,
  ...Button.propTypes
};

export default memo(ButtonLink);
