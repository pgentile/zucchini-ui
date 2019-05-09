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
    cy.server();

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

    cy.route("POST", "/api/testRuns/*/import**").as("importCucumberReport");

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

    cy.get("table").first().within(() => {
      cy.get("tbody").find("tr").should("have.length.greaterThan", 0);
    });
  });
});
