import React, { useEffect, useRef, useMemo, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import Alert from "react-bootstrap/Alert";

import { clearErrors } from "../redux";

function ErrorAlert() {
  const dispatch = useDispatch();

  const errors = useSelector((state) => state.errors.errors);

  const lastError = useMemo(() => {
    return errors.length > 0 ? errors[errors.length - 1] : null;
  }, [errors]);

  const elementRef = useRef();

  useEffect(() => {
    const element = elementRef.current;
    if (errors.length > 0 && element) {
      element.focus();
    }
  }, [errors]);

  if (!lastError) {
    return null;
  }

  const handleClose = () => {
    dispatch(clearErrors());
  };

  return (
    <Alert ref={elementRef} variant="danger" dismissible onClose={handleClose} tabIndex={0}>
      <h4>Une erreur a été détectée&hellip;</h4>
      <p className="mb-0">{lastError}</p>
    </Alert>
  );
}

export default memo(ErrorAlert);
