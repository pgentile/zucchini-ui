/// <reference types="Cypress" />

describe("Test runs", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should display test runs", () => {
    cy.get("h1").contains("Derniers tirs");

    cy.get("table");
  });

  it("should create a test run", () => {
    cy.log("Créer un tir");

    cy.get("button").contains("Créer un tir").click();

    cy.get("[role=dialog]").within(() => {
      cy.get("input#type").type("TYPE");
      cy.get("input#environment").type("ENV");
      cy.get("input#name").type("NAME");

      cy.get("button").contains("Créer").click();
    });

    cy.url().should("contain", "/test-runs/");

    cy.get("h1").contains(/Tir du [0-9]{2}\/[0-9]{2}\/[0-9]{2}/);

    cy.log("Importer un fichier de résultats Cucumber");

    cy.get("button").contains("Importer").click();

    cy.get("[role=dialog]").within(() => {
      // cy.get("input#file").click();
    });
  });
});
