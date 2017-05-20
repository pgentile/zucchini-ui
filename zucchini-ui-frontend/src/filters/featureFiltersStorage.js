import BrowserLocalStorage from '../browserStorage/BrowserLocalStorage';


const featureFiltersStorage = new BrowserLocalStorage({
  entryName: 'featureFilters',
  defaultState: () => ({
    passed: true,
    failed: true,
    partial: true,
    notRun: true,
    reviewed: true,
    notReviewed: true,
  }),
});

export default featureFiltersStorage;
