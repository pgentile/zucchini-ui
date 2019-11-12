import { connect } from "react-redux";

import EditTestRunDialog from "./EditTestRunDialog";
import { editTestRunThenReload } from "../redux";

const EditTestRunDialogContainer = connect(undefined, {
  onEditTestRun: editTestRunThenReload
})(EditTestRunDialog);

export default EditTestRunDialogContainer;
