/// <reference types="Cypress" />
/// <reference types="testing-library__cypress" />

describe("Test run", () => {
  beforeEach(() => {
    cy.log("Créer un tir");

    cy.createTestRun()
      .its("id")
      .then((testRunId) => {
        cy.visit(`/ui/test-runs/${testRunId}`);
      });

    cy.contains("h1", /Tir du [0-9]{2}\/[0-9]{2}\/[0-9]{2}/).should("exist");
  });

  it("should import Cucumber result", () => {
    cy.server();
    cy.route("POST", "/api/testRuns/*/import**").as("importCucumberReport");

    cy.log("Importer un fichier de résultats Cucumber");

    cy.contains("button", "Importer").click();

    cy.get("[role=dialog]").within(() => {
      // Workaround : cucumber-report.json not loaded as base64, even if asked. So... extention change
      cy.get("input#file").attachFile("cucumber-report.json.bin");
      cy.contains("button", "Importer").click();
    });

    cy.log("Validate upload with table size");

    cy.wait("@importCucumberReport");

    cy.get("table").within(() => {
      cy.get("tbody").find("tr").should("have.length.greaterThan", 0);
    });
  });

  it("should delete a test run", () => {
    cy.route("DELETE", "/api/testRuns/*").as("deleteTestRun");

    cy.contains("button", "Supprimer").click();

    cy.get("[role=dialog]").within(() => {
      cy.contains("button", "Supprimer").click();
    });

    cy.wait("@deleteTestRun");

    cy.location("pathname").should("equal", "/ui/");
  });
});
