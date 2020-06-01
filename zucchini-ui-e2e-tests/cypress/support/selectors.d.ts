/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    findFieldsetByLegend(legendText: string): Chainable<Element>;
  }
}
