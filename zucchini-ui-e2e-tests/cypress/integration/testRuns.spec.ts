describe("Test runs", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should display test runs", () => {
    cy.get("h1").should("contain", "Derniers tirs");

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
    cy.contains("button", "Créer un tir").click();

    cy.get("[role=dialog]").within(() => {
      cy.findByLabelText("Type").type("TYPE");
      cy.findByLabelText("Environnement").type("ENV");
      cy.findByLabelText("Nom").type("NAME");

      cy.get("form").submit();
    });

    cy.url().should("include", "/ui/test-runs/");
  });
});
