export default class EventScheduler {

  constructor() {
    this.promise = Promise.resolve(null);
  }

  schedule(callback, timeout = 1) {
    const realTimeout = Math.max(1, timeout);
    this.promise = this.promise.then(() => {
      return new Promise(resolve => {
        setTimeout(() => {
          callback();
          resolve(null);
        }, realTimeout);
      });
    })
  }

}
