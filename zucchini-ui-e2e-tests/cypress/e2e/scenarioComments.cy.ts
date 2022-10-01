describe("Scenario comments", () => {
  beforeEach(() => {
    cy.log("Créer un scénario");

    cy.createFilledTestRun().then(({ id }) => {
      cy.getScenariosForTestRun(id).then((scenarios) => {
        const firstScenario = scenarios.find((scenario) => scenario.status === "PASSED");
        if (!firstScenario) {
          throw new Error("No scenario found");
        }
        cy.wrap(firstScenario).as("scenario");

        cy.createCommentForScenario(firstScenario.id, "Ce commentaire sera supprimé").its("id").as("commentId");

        cy.visit(`/ui/scenarios/${firstScenario.id}`);
      });
    });
  });

  it("should add a comment", () => {
    cy.intercept({ method: "POST", pathname: "/api/scenarii/*/comments/create" }).as("newComment");

    const linkWithinComment = "https://example.org";
    const commentStart = "Voici un nouveau commentaire";
    const commentText = `${commentStart}. Il contient un lien vers ${linkWithinComment}.`;

    cy.findByTestId("add-comment").within((form) => {
      cy.findByLabelText("Commentaire").type(commentText);

      cy.wrap(form).submit();
    });

    cy.wait("@newComment")
      .then((interception) => {
        const createdComment = interception.response?.body as PartialZucchiniComment;
        return createdComment.id;
      })
      .then((commentId) => cy.get(`#comment-${commentId}`))
      .should("exist")
      .within(() => {
        cy.contains(commentStart);
        cy.contains("a", linkWithinComment).should("have.attr", "href", linkWithinComment);
      });
  });

  it("should delete a comment", () => {
    cy.intercept({ method: "DELETE", pathname: "/api/scenarii/*/comments/*" }).as("deletedComment");

    cy.get<string>("@commentId").then((commentId) => {
      cy.get(`#comment-${commentId}`).within(() => {
        cy.contains("button", "Supprimer").click();
      });

      cy.get("[role=dialog]").within(() => {
        cy.contains("button", "Supprimer").click();
      });

      cy.wait("@deletedComment");

      cy.get(`#comment-${commentId}`).should("not.exist");
    });
  });

  it("should modify a comment", () => {
    cy.intercept({ method: "PATCH", pathname: "/api/scenarii/*/comments/*" }).as("modifiedComment");

    const contentBeforeModification = "Ce commentaire sera modifié";
    const contentAfterModification = "Ce commentaire a été modifié";

    cy.get<string>("@commentId").then((commentId) => {
      cy.get(`#comment-${commentId}`).within((commentElement) => {
        cy.contains("button", "Modifier").click();

        cy.findByLabelText("Commentaire").clear().type(contentAfterModification);

        cy.contains("button", "Enregistrer").click();

        cy.wait("@modifiedComment");

        cy.wrap(commentElement)
          .should("not.contain.text", contentBeforeModification)
          .should("contain.text", contentAfterModification);
      });
    });
  });
});
