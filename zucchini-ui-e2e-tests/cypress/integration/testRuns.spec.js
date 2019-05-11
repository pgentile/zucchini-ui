/// <reference types="Cypress" />

describe("Test runs", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should display test runs", () => {
    cy.get("h1").contains("Derniers tirs");

    cy.createTestRun({
      type: "Display test runs",
      environment: "PREP",
      name: "Test à afficher"
    });

    cy.get("table").within(() => {
      cy.get("tbody").find("tr").should("have.length.greaterThan", 0);
    });
  });

  it("should create a test run", () => {
    cy.get("button").contains("Créer un tir").click();

    cy.get("[role=dialog]").within(() => {
      cy.get("input#type").type("TYPE");
      cy.get("input#environment").type("ENV");
      cy.get("input#name").type("NAME");

      cy.get("button").contains("Créer").click();
    });

    cy.url().should("include", "/ui/test-runs/");
  });
});
