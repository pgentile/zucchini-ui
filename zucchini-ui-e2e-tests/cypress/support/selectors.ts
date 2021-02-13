// eslint-disable-next-line @typescript-eslint/no-namespace
declare namespace Cypress {
  interface Chainable {
    findFieldsetByLegend(legendText: string): Chainable<JQuery<HTMLFieldSetElement>>;
  }
}

Cypress.Commands.add(
  "findFieldsetByLegend",
  (legendText: string): Cypress.Chainable<JQuery<HTMLFieldSetElement>> => {
    return cy.contains("legend", legendText).parent("fieldset").first();
  }
);
