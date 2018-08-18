import BrowserLocalStorage from "../browserStorage/BrowserLocalStorage";

const statsDashboardFiltersStorage = new BrowserLocalStorage({
  entryName: "statsDashboardState",
  defaultState: () => ({
    showDetails: false
  })
});

export default statsDashboardFiltersStorage;
