describe("Tags", () => {
  let testRunId: string;

  before(() => {
    cy.log("Créer un tir");
    cy.createFilledTestRun().then((testRun) => {
      testRunId = testRun.id;
    });
  });

  const existingTag = "tutu";
  const unexistingTag = "unexisting";

  beforeEach(() => {
    cy.visit(`/ui/test-runs/${testRunId}/tags`);

    cy.contains("h1", "Tous les tags").should("exist");
  });

  it("should display tags", () => {
    cy.findByTestId("tags").within(() => {
      cy.get("tbody tr").should("not.be.empty");
    });
  });

  it("should filter with unexisting tag", () => {
    cy.findByTestId("tag-filter-form").within(() => {
      cy.findByLabelText("Tag").type(unexistingTag);
    });

    cy.findByTestId("tags").within(() => {
      cy.get("tbody tr").should("not.exist");
    });
  });

  it("should filter with existing tag", () => {
    cy.findByTestId("tag-filter-form").within(() => {
      cy.findByLabelText("Tag").type(existingTag);
    });

    cy.findByTestId("tags").within(() => {
      cy.get("tbody tr").should("have.length", 1);
    });
  });

  it("should clear tag selection", () => {
    cy.findByTestId("tags")
      .get("tbody tr")
      .then((rows) => rows.length)
      .as("tagCount");

    // Select one tag

    cy.findByTestId("tag-filter-form").within(() => {
      cy.findByLabelText("Tag").type(existingTag);
    });

    cy.findByTestId("tags").within(() => {
      cy.get("tbody tr").should("have.length", 1);
    });

    // Clear selection, verify update

    cy.findByTestId("tag-filter-form").within(() => {
      cy.findByText("Effacer").parent("button").click();
    });

    cy.get("@tagCount").then((tagCount) => {
      cy.findByTestId("tags").within(() => {
        cy.get("tbody tr").should("have.length", tagCount);
      });
    });
  });

  it("should navigate to some tag", () => {
    cy.findByTestId("tags").contains("a", `@${existingTag}`).click();

    cy.url().should("have.string", `tag-details?tag=${existingTag}`);
  });
});
