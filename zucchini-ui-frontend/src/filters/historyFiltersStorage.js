import BrowserLocalStorage from "../browserStorage/BrowserLocalStorage";

const historyFiltersStorage = new BrowserLocalStorage({
  entryName: "historyFilters",
  defaultState: () => ({
    sameTestRunType: true,
    sameTestRunEnvironment: false
  })
});

export default historyFiltersStorage;
