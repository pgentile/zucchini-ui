import BrowserLocalStorage from '../browserStorage/BrowserLocalStorage';


const stepFiltersStorage = new BrowserLocalStorage({
  entryName: 'stepFilters',
  defaultState: () => ({
    comments: true,
    context: true,
    beforeAndAfterActions: true,
    errorDetails: true,
    logs: true,
    attachments: true,
  }),
});

export default stepFiltersStorage;
