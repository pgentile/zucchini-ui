import BrowserLocalStorage from "../browserStorage/BrowserLocalStorage";

const historyFiltersStorage = new BrowserLocalStorage({
  entryName: "historyFilters",
  defaultState: () => ({
    sameTestRunType: true,
    sameTestRunEnvironnement: false
  })
});

export default historyFiltersStorage;
