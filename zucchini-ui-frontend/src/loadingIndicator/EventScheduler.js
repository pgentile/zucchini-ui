export default class EventScheduler {
  constructor() {
    this.promise = Promise.resolve(null);
    this.disposed = false;
  }

  schedule(callback, timeout = 0) {
    this.promise = this.promise.then(() => {
      return new Promise((resolve) => {
        const run = () => {
          if (!this.disposed) {
            callback();
          }
          resolve(null);
        };

        if (timeout === 0) {
          requestAnimationFrame(run);
        } else {
          setTimeout(run, timeout);
        }
      });
    });
  }

  dispose() {
    this.disposed = true;
  }
}
