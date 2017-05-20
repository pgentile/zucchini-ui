
const DEFAULT_OPTIONS = {
  encoder: JSON.stringify,
  decoder: JSON.parse,
  onOpen: () => { },
  onMessage: () => { },
  onClose: () => { },
  onError: () => { },
  closeOnError: true,
};

// TODO Add keep alive
// TODO Add reconnect feature
export default class SimpleWebSocket {

  constructor(options = {}) {
    this.options = {
      ...DEFAULT_OPTIONS,
      ...options,
    };

    this.ws = null;
  }

  open() {
    this.ws = new WebSocket(this.options.url);

    this.ws.onopen = () => {
      this.options.onOpen();
    };

    this.ws.onmessage = event => {
      const decodedData = this.options.decoder(event.data);
      this.options.onMessage(decodedData);
    };

    this.ws.onclose = () => {
      this.options.onClose();
      this.ws = null;
    };

    this.ws.onerror = () => {
      try {
        this.options.onError();
      } finally {
        if (this.options.closeOnError) {
          this.options.close();
        }
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
    this.ws = null;
  }

}
