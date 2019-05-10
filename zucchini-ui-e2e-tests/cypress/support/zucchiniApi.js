Cypress.Commands.add("createTestRun", ({ type, environment, name }) => {
  cy.server();

  return cy
    .request("POST", "/api/testRuns/create", {
      type,
      environment,
      name
    }).should(xhr => {
      expect(xhr.isOkStatusCode).to.be.true;
    })
    .then(xhr => {
      const id = xhr.body.id;
      return {
        id,
        url: `/ui/test-runs/${id}`
      };
    });
});
