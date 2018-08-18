export default class EventScheduler {
  constructor() {
    this.promise = Promise.resolve(null);
  }

  schedule(callback, timeout = 0) {
    this.promise = this.promise.then(() => {
      return new Promise(resolve => {
        setTimeout(() => {
          requestAnimationFrame(() => {
            callback();
            resolve(null);
          });
        }, timeout);
      });
    });
  }
}
