import { connect } from 'react-redux';

import ImportCucumberResultsDialog from './ImportCucumberResultsDialog';
import { importCucumberResult } from '../redux';


const ImportCucumberResultsDialogContainer = connect(
  undefined,
  {
    onImportCucumberResult: importCucumberResult,
  },
)(ImportCucumberResultsDialog);

export default ImportCucumberResultsDialogContainer;
