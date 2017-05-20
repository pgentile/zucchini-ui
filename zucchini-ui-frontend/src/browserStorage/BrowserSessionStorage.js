import BrowserStorage from './BrowserStorage';


export default class BrowserSessionStorage extends BrowserStorage {

  constructor(config) {
    super(window.sessionStorage, config);
  }

}
