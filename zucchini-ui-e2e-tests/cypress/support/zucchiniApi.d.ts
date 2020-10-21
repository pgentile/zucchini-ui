/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    createTestRun(params: { type?: string; environment?: string; name?: string }): Chainable<unknown>;

    importCucumberReport(params: { testRunId: string; content: any }): Chainable<void>;

    createFilledTestRun(params: { type?: string; environment?: string; name?: string }): Chainable<unknown>;

    getFeaturesForTestRun(testRunId: string): Chainable<unknown[]>;

    getScenariosForTestRun(testRunId: string): Chainable<unknown[]>;
  }
}
