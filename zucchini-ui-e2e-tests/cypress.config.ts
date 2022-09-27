import { defineConfig } from "cypress";

export default defineConfig({
  defaultCommandTimeout: 8000,
  requestTimeout: 10000,
  e2e: {
    baseUrl: "http://localhost:8080/"
  }
});
