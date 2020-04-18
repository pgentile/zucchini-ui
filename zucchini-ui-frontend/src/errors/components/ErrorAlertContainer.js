import { connect } from "react-redux";
import { createSelector, createStructuredSelector } from "reselect";

import ErrorAlert from "./ErrorAlert";
import { clearErrors } from "../redux";

const selectLastError = createSelector(
  (state) => state.errors.errors,
  (errors) => (errors.length > 0 ? errors[errors.length - 1] : null)
);

const selectProps = createStructuredSelector({
  error: selectLastError
});

const ErrorAlertContainer = connect(selectProps, {
  onClearErrors: clearErrors
})(ErrorAlert);

export default ErrorAlertContainer;
