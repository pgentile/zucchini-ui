/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    createTestRun(params: { type: ?string; environment: ?string; name: ?string }): Chainable<Object>;

    importCucumberReport(params: { testRunId: string; content: any }): Chainable<null>;

    createFilledTestRun(params: { type: ?string; environment: ?string; name: ?string }): Chainable<Object>;

    getFeaturesForTestRun(testRunId: string): Chainable<Object[]>;

    getScenariosForTestRun(testRunId: string): Chainable<Object[]>;
  }
}
