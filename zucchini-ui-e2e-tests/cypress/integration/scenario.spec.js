/// <reference types="Cypress" />
/// <reference types="testing-library__cypress" />

describe("Scenario", () => {
  beforeEach(() => {
    cy.log("Créer une feature");

    cy.createFilledTestRun().then(({ id }) => {
      cy.getScenariosForTestRun({ testRunId: id }).then((scenarios) => {
        const firstScenario = scenarios.find(
          (scenario) => scenario.status === "PASSED"
        );
        if (!firstScenario) {
          throw new Error("No scenario found");
        }
        cy.wrap(firstScenario).as("scenario");

        cy.visit(`/ui/scenarios/${firstScenario.id}`);
      });
    });
  });

  it("should display scenario info", () => {
    cy.get("@scenario").then((scenarios) => {
      cy.get("h1")
        .should("contain", scenarios.info.keyword)
        .and("contain", scenarios.info.name);
    });

    cy.get("h1 .badge").should("have.text", "Succès");
  });

  it("should change the reviewed status to not analyzed", () => {
    cy.contains("button", "Marquer comme non analysé").click();

    cy.contains("button", "Marquer comme analysé").should("exist");
  });

  it("should change the reviewed status to analyzed", () => {
    cy.contains("button", "Marquer comme non analysé").click();
    cy.contains("button", "Marquer comme analysé").click();

    cy.get("[role=dialog]").within(() => {
      cy.get("textarea#comment").type(
        "Coucou{enter}Voir https://example.org pour plus d'infos"
      );
      cy.contains("button", "Valider").click();
    });

    cy.contains("button", "Marquer comme non analysé").should("exist");
  });

  it("should change scenario status", () => {
    cy.route("PATCH", "/api/scenarii/*").as("updateScenario");
    cy.route("POST", "/api/scenarii/*/comments/create").as("addComment");
    cy.route("GET", "/api/scenarii/*").as("scenarioRefresh");

    cy.contains("button", "Modifier le statut").click();

    cy.get("[role=dialog]").within(() => {
      cy.findByLabelText("Scénario analysé ?").should("be.checked");

      /*
      cy.contains("label", "Scénario analysé ?").then((label) => {
        const targetId = label.attr("for");
        cy.get(`input#${targetId}`).should("be.checked");
      });
      */

      cy.contains("label", "Échec").click();

      cy.get("textarea#comment").type(
        "Ca ne marche pas. Encore un bug, dis donc"
      );
      cy.contains("button", "Valider").click();
    });

    cy.wait("@updateScenario");
    cy.wait("@addComment");
    cy.wait("@scenarioRefresh");

    cy.get("h1 .badge").should("contain.text", "Échec");
    cy.contains("button", "Marquer comme non analysé").should("exist");
  });

  it("should delete a scenario", () => {
    cy.route("DELETE", "/api/scenarii/*").as("deleteScenario");

    cy.contains("button", "Supprimer").click();

    cy.get("[role=dialog]").within(() => {
      cy.contains("button", "Supprimer").click();
    });

    cy.wait("@deleteScenario");

    cy.location("pathname").should("satisfy", (url) =>
      url.startsWith("/ui/features/")
    );
  });
});
