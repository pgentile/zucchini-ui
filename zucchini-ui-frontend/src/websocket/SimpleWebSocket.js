const DEFAULT_OPTIONS = {
  encoder: JSON.stringify,
  decoder: JSON.parse,
  onOpen: () => {},
  onMessage: () => {},
  onClose: () => {},
  onError: () => {},
  onKeepAlive: null,
  keepAliveTimeout: 10 * 1000
};

// TODO Add reconnect feature
export default class SimpleWebSocket {
  constructor(options = {}) {
    this.options = {
      ...DEFAULT_OPTIONS,
      ...options
    };

    this.ws = null;
    this.keepAliveInterval = null;
  }

  open() {
    this.ws = new WebSocket(this.options.url);

    this.ws.onopen = () => {
      this.options.onOpen();

      if (this.options.onKeepAlive) {
        this.keepAliveInterval = setInterval(() => {
          this.options.onKeepAlive();
        }, this.options.keepAliveTimeout);
      }
    };

    this.ws.onmessage = (event) => {
      const decodedData = this.options.decoder(event.data);
      this.options.onMessage(decodedData);
    };

    this.ws.onclose = () => {
      clearInterval(this.keepAliveInterval);
      this.keepAliveInterval = null;

      this.options.onClose();
      this.ws = null;
    };

    this.ws.onerror = () => {
      try {
        this.options.onError();
      } finally {
        this.ws.close();
      }
    };
  }

  send(data) {
    const encodedData = this.options.encoder(data);
    this.ws.send(encodedData);
  }

  close() {
    if (this.ws) {
      this.ws.close();
    }
  }
}
