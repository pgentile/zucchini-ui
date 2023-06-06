export default class BrowserStorage {
  constructor(storage, config) {
    this.storage = storage;

    this.config = {
      defaultState: () => ({}),
      beforeSerialize: (value) => value,
      afterDeserialize: (value) => value,
      serializer: JSON.stringify,
      deserializer: JSON.parse,
      ...config
    };
  }

  read() {
    const { defaultState, deserializer, afterDeserialize } = this.config;

    const storedValue = this.readInStorage();
    if (storedValue === null) {
      const state = defaultState();
      this.write(state);
      return state;
    }

    try {
      return afterDeserialize(deserializer(storedValue));
    } catch (e) {
      // Ignoring exception, use default value
      this.clearInStorage();
      return defaultState();
    }
  }

  write(value) {
    const { serializer, beforeSerialize } = this.config;
    this.writeInStorage(serializer(beforeSerialize(value)));
  }

  readInStorage() {
    const { entryName } = this.config;
    return this.storage.getItem(entryName);
  }

  writeInStorage(value) {
    const { entryName } = this.config;
    this.storage.setItem(entryName, value);
  }

  clearInStorage() {
    const { entryName } = this.config;
    this.storage.removeItem(entryName);
  }
}
