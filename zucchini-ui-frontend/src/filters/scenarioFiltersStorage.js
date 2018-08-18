import BrowserLocalStorage from "../browserStorage/BrowserLocalStorage";

const scenarioFiltersStorage = new BrowserLocalStorage({
  entryName: "scenarioFilters",
  defaultState: () => ({
    passed: true,
    failed: true,
    pending: true,
    notRun: true,
    reviewed: true,
    notReviewed: true
  })
});

export default scenarioFiltersStorage;
