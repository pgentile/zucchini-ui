/// <reference types="Cypress" />

describe("Test run", () => {
  beforeEach(() => {
    cy.log("Créer un tir");

    cy
      .createTestRun()
      .its("id")
      .then(testRunId => {
        cy.visit(`/ui/test-runs/${testRunId}`);
      });

      cy.get("h1").contains(/Tir du [0-9]{2}\/[0-9]{2}\/[0-9]{2}/);
  });

  it("should import Cucumber result", () => {
    cy.server();
    cy.route("POST", "/api/testRuns/*/import**").as("importCucumberReport");

    cy.log("Importer un fichier de résultats Cucumber");

    cy.get("button").contains("Importer").click();

    cy.get("[role=dialog]").within(() => {
      // Workaround : cucumber-report.json not loaded as base64, even if asked. So... extention change
      cy.fixture("cucumber-report.json.bin", "base64").then(fileContent => {
        cy.get("input#file").upload(
          {
            fileContent,
            fileName: "report.json",
            mimeType: "application/json",
            encoding: "base64"
          },
          {
            subjectType: "input"
          }
        );
      });

      cy.get("button").contains("Importer").click();
    });

    cy.log("Validate upload with table size");

    cy.wait("@importCucumberReport");

    cy.get("table").within(() => {
      cy.get("tbody").find("tr").should("have.length.greaterThan", 0);
    });
  });

  it("should delete a test run", () => {
    cy.route("DELETE", "/api/testRuns/*").as("deleteTestRun");

    cy.get("button").contains("Supprimer").click();

    cy.get("[role=dialog]").within(() => {
      cy.get("button").contains("Supprimer").click();
    });

    cy.wait("@deleteTestRun");

    cy.location("pathname").should("equal", "/ui/");
  });
});
