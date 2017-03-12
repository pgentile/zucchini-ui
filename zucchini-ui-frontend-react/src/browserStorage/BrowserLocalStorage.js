import BrowserStorage from './BrowserStorage';


export default class BrowserLocalStorage extends BrowserStorage {

  constructor(config) {
    super(window.localStorage, config);
  }

}
