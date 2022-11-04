describe("Scenario", () => {
  beforeEach(() => {
    cy.log("Créer un scénario");

    cy.createFilledTestRun().then(({ id }) => {
      cy.getScenariosForTestRun(id).then((scenarios) => {
        const firstScenario = scenarios.find((scenario) => scenario.status === "PASSED");
        if (!firstScenario) {
          throw new Error("No scenario found");
        }
        cy.wrap(firstScenario).as("scenario");

        cy.visit(`/ui/scenarios/${firstScenario.id}`);
      });
    });
  });

  it("should display scenario info", () => {
    cy.get<Scenario>("@scenario").then((scenario) => {
      cy.get("h1").should("contain", scenario.info.keyword).and("contain", scenario.info.name);
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
      cy.findByLabelText("Commentaire").type("Coucou{enter}Voir https://example.org pour plus d'infos");
      cy.get("form").submit();
    });

    cy.contains("button", "Marquer comme non analysé").should("exist");
  });

  it("should change scenario status", () => {
    cy.intercept({ method: "PATCH", pathname: "/api/scenarii/*" }).as("updateScenario");
    cy.intercept({ method: "POST", pathname: "/api/scenarii/*/comments/create" }).as("addComment");
    cy.intercept({ method: "GET", pathname: "/api/scenarii/*" }).as("scenarioRefresh");

    cy.contains("button", "Modifier le statut").click();

    cy.get("[role=dialog]").within(() => {
      cy.findByLabelText("Scénario analysé ?").should("be.checked");

      cy.findByLabelText("Échec").check();

      cy.findByLabelText("Commentaire").type("Ca ne marche pas. Encore un bug, dis donc");

      cy.get("form").submit();
    });

    cy.wait("@updateScenario");
    cy.wait("@addComment");
    cy.wait("@scenarioRefresh");

    cy.get("h1 .badge").should("contain.text", "Échec");
    cy.contains("button", "Marquer comme non analysé sddssd").should("exist");
  });

  it("should delete a scenario", () => {
    cy.intercept({ method: "DELETE", pathname: "/api/scenarii/*" }).as("deleteScenario");

    cy.contains("button", "Supprimer").click();

    cy.get("[role=dialog]").within(() => {
      cy.contains("button", "Supprimer").click();
    });

    cy.wait("@deleteScenario");

    cy.location("pathname").should("satisfy", (url: string) => url.startsWith("/ui/features/"));
  });
});
