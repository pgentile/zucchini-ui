import { defineConfig } from "cypress";

export default defineConfig({
  defaultCommandTimeout: 8000,
  requestTimeout: 10000,
  retries: {
    runMode: 2
  },
  e2e: {
    baseUrl: "http://localhost:8080/"
  }
});
