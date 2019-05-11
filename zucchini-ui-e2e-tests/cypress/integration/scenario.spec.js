/// <reference types="Cypress" />

describe("Scenario", () => {
  beforeEach(() => {
    cy.log("Créer une feature");

    cy.createFilledTestRun().then(({ id }) => {
      cy.getScenariosForTestRun({ testRunId: id }).then(scenarios => {
        const firstScenario = scenarios.find(scenario => scenario.status === "PASSED");
        if (!firstScenario) {
          throw new Error("No scenario found");
        }
        cy.wrap(firstScenario).as("scenario");

        cy.visit(`/ui/scenarios/${firstScenario.id}`);
      });
    });
  });

  it("should display scenario info", () => {
    cy.get("@scenario").then(scenarios => {
      cy.get("h1")
        .should("contain", scenarios.info.keyword)
        .and("contain", scenarios.info.name);
    });

    cy.get("h1 .label").should("have.text", "Succès");
  });

  it("should change the reviewed status to not analyzed", () => {
    cy.get("button").contains("Marquer comme non analysé").click();

    cy.get("button").contains("Marquer comme analysé").should("exist");
  });

  it("should change the reviewed status to analyzed", () => {
    cy.get("button").contains("Marquer comme non analysé").click();
    cy.get("button").contains("Marquer comme analysé").click();

    cy.get("[role=dialog]").within(() => {
      cy.get("textarea#comment").type("Coucou{enter}Voir https://example.org pour plus d'infos");
      cy.get("button").contains("Valider").click();
    });

    cy.get("button").contains("Marquer comme non analysé").should("exist");
  });

  it("should change scenario status", () => {
    cy.get("button").contains("Modifier le statut").click();

    cy.get("[role=dialog]").within(() => {
      cy.get("label").contains("Échec").click();

      cy.get("textarea#comment").type("Ca ne marche pas. Encore un bug, dis donc");
      cy.get("button").contains("Valider").click();
    });

    cy.get("h1 .label").should("have.text", "Échec");
  });
});
