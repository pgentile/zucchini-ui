import BrowserLocalStorage from '../browserStorage/BrowserLocalStorage';


const historyFiltersStorage = new BrowserLocalStorage({
  entryName: 'historyFilters',
  defaultState: () => ({
    sameTestRun: true,
  }),
});

export default historyFiltersStorage;
