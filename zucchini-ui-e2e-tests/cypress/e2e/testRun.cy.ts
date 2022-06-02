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
    cy.intercept({ method: "POST", pathname: "/api/testRuns/*/import" }).as("importCucumberReport");

    cy.log("Importer un fichier de résultats Cucumber");

    cy.contains("button", "Importer").click();

    cy.get("[role=dialog]").within(() => {
      cy.findAllByLabelText(/Fichier/).selectFile("cypress/fixtures/cucumber-report.json");
      cy.contains("button", "Importer").click();
    });

    cy.log("Validate upload with table size");

    cy.wait("@importCucumberReport");

    cy.get("table").within(() => {
      cy.get("tbody").find("tr").should("have.length.greaterThan", 0);
    });
  });

  it("should edit a test run", () => {
    cy.intercept({ method: "PATCH", pathname: "/api/testRuns/*" }).as("updateTestRun");

    cy.findByText("Modifier").click();

    const labels = [
      { name: "Label un", value: "Valeur 1" },
      { name: "Label deux", value: "Valeur 2" }
    ];

    cy.get("[role=dialog]")
      .as("modal")
      .within(() => {
        cy.findByLabelText("Type").clear().type("New type");
        cy.findByLabelText("Environnement").clear().type("New env");
        cy.findByLabelText("Nom").clear().type("New name");

        labels.forEach((label, index) => {
          cy.log("Ajouter le label", label.name);

          cy.findByText("Ajouter une étiquette").click();

          cy.findFieldsetByLegend("Étiquettes")
            .findByTestId(`label-${index}`)
            .within(() => {
              cy.findByLabelText(/Nom/).type(label.name);
              cy.findByLabelText(/Valeur/).type(label.value);
            });
        });

        cy.get("form").submit();
      });

    cy.wait("@updateTestRun");

    cy.get("@modal").should("not.exist");

    cy.findByTestId("labels").within(() => {
      labels.forEach((label) => {
        cy.contains(`${label.name} : ${label.value}`).should("exist");
      });
    });
  });

  it("should delete a test run", () => {
    cy.intercept({ method: "DELETE", pathname: "/api/testRuns/*" }).as("deleteTestRun");

    cy.contains("button", "Supprimer").click();

    cy.get("[role=dialog]").within(() => {
      cy.contains("button", "Supprimer").click();
    });

    cy.wait("@deleteTestRun");

    cy.location("pathname").should("equal", "/ui/");
  });
});
