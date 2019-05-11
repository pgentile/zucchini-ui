/// <reference types="Cypress" />

describe("Feature", () => {
  beforeEach(() => {
    cy.log("Créer une feature");

    cy.createFilledTestRun().then(({ id }) => {
      cy.getFeaturesForTestRun({ testRunId: id }).then(features => {
        const firstFeature = features[0];
        cy.wrap(firstFeature).as("feature");
        cy.visit(`/ui/features/${firstFeature.id}`);
      });
    });
  });

  it("should display feature info", () => {
    cy.get("@feature").then(feature => {
      cy.get("h1")
        .should("contain", feature.info.keyword)
        .and("contain", feature.info.name);
    });
  });
});
