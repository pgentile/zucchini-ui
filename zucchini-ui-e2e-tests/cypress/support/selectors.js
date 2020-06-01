/// <reference types="cypress" />

Cypress.Commands.add("findFieldsetByLegend", (legendText) => {
  return cy.contains("legend", legendText).parent("fieldset").first();
});
