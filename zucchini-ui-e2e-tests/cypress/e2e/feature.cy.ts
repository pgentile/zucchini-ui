describe("Feature", () => {
  beforeEach(() => {
    cy.log("Créer une feature");

    cy.createFilledTestRun().then(({ id }) => {
      cy.getFeaturesForTestRun(id).then((features) => {
        const firstFeature = features[0];
        cy.wrap(firstFeature).as("feature");
        cy.visit(`/ui/features/${firstFeature.id}`);
      });
    });
  });

  it("should display feature info", () => {
    cy.get<Feature>("@feature").then((feature) => {
      cy.get("h1").should("contain", feature.info.keyword).and("contain", feature.info.name);
    });
  });

  it("should edit feature", () => {
    cy.intercept({ method: "PATCH", pathname: "/api/features/*" }).as("updateFeature");

    cy.findByText("Modifier").click();

    const group = "Sample group";

    cy.get("[role=dialog]").within(() => {
      cy.findByLabelText("Groupe").type(group);

      cy.get("form").submit();
    });

    cy.wait("@updateFeature");

    cy.get("header").within(() => {
      cy.contains("li", "Groupe").should("contain.text", group);
    });
  });

  it("should delete a feature", () => {
    cy.intercept({ method: "DELETE", pathname: "/api/features/*" }).as("deleteFeature");

    cy.contains("button", "Supprimer").click();

    cy.get("[role=dialog]").within(() => {
      cy.contains("button", "Supprimer").click();
    });

    cy.wait("@deleteFeature");

    cy.location("pathname").should("satisfy", (url: string) => url.startsWith("/ui/test-runs/"));
  });
});
