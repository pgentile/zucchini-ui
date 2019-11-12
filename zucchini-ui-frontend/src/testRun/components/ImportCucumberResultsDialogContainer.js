import { connect } from "react-redux";

import ImportCucumberResultsDialog from "./ImportCucumberResultsDialog";
import { importCucumberResultThenReload } from "../redux";

const ImportCucumberResultsDialogContainer = connect(undefined, {
  onImportCucumberResult: importCucumberResultThenReload
})(ImportCucumberResultsDialog);

export default ImportCucumberResultsDialogContainer;
