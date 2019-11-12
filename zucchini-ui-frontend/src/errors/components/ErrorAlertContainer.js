import { connect } from "react-redux";
import { createSelector, createStructuredSelector } from "reselect";

import ErrorAlert from "./ErrorAlert";
import { clearErrors } from "../redux";

const selectErrors = createSelector(
  state => state.errors.errors,
  errors => errors
);

const selectProps = createStructuredSelector({
  errors: selectErrors
});

const ErrorAlertContainer = connect(selectProps, {
  onClearErrors: clearErrors
})(ErrorAlert);

export default ErrorAlertContainer;
