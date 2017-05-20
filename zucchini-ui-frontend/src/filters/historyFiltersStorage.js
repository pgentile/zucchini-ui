import BrowserLocalStorage from '../browserStorage/BrowserLocalStorage';


const historyFiltersStorage = new BrowserLocalStorage({
  entryName: 'historyFilters',
  defaultState: () => ({
    sameTestRunType: true,
  }),
});

export default historyFiltersStorage;
