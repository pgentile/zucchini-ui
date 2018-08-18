import UUID from "pure-uuid";

import BrowserLocalStorage from "../browserStorage/BrowserLocalStorage";

export default new BrowserLocalStorage({
  entryName: "presenceInfo",
  defaultState: () => ({
    watcherId: new UUID(4).format()
  })
});
