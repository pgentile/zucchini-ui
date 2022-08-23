import { memo, useEffect, useId, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Alert from "react-bootstrap/Alert";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";

import { clearErrors } from "../redux";

import "./ErrorAlert.scss";

function ErrorAlert() {
  const dispatch = useDispatch();

  const errors = useSelector((state) => state.errors.errors);

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (errors.length > 0) {
      setVisible(true);
    }
  }, [errors]);

  const elementRef = useRef();

  useEffect(() => {
    const element = elementRef.current;
    if (visible) {
      element.focus();
    }
  }, [errors, visible]);

  const handleClose = () => {
    setVisible(false);
  };

  const handleExited = () => {
    dispatch(clearErrors());
  };

  const lastError = errors.length > 0 ? errors[errors.length - 1] : null;

  const titleId = useId();

  return (
    <Alert
      ref={elementRef}
      show={visible}
      variant="danger"
      dismissible
      tabIndex={-1}
      onClose={handleClose}
      onExited={handleExited}
      aria-labelledby={titleId}
    >
      <div className="error-alert-container">
        <div className="error-alert-icon pr-3 d-none d-md-block">
          <FontAwesomeIcon icon={faExclamationTriangle} size="2x" />
        </div>
        <div className="error-alert-message">
          <h4 id={titleId}>Une erreur a été détectée&hellip;</h4>
          <p className="mb-0">{lastError}</p>
        </div>
      </div>
    </Alert>
  );
}

export default memo(ErrorAlert);
