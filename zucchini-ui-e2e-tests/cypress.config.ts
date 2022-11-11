import { defineConfig } from "cypress";

export default defineConfig({
  projectId: "4hcyzn",
  defaultCommandTimeout: 8000,
  requestTimeout: 10000,
  retries: {
    runMode: 2
  },
  e2e: {
    baseUrl: "http://localhost:8080/"
  },
  reporter: "junit",
  reporterOptions: {
    mochaFile: "test-results/TEST-result-[hash].xml"
  }
});
