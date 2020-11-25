Cypress.Commands.add("createTestRun", ({ type = "TYPE", environment = "ENV", name = "NAME" } = {}) => {
  return cy
    .request("POST", "/api/testRuns/create", {
      type,
      environment,
      name
    })
    .should((xhr) => {
      expect(xhr.isOkStatusCode).to.be.true;
    })
    .then((xhr) => xhr.body);
});

Cypress.Commands.add("importCucumberReport", ({ testRunId, content }) => {
  return cy
    .request("POST", `/api/testRuns/${testRunId}/import`, content)
    .should((xhr) => {
      expect(xhr.isOkStatusCode).to.be.true;
    })
    .end();
});

Cypress.Commands.add("createFilledTestRun", ({ type, environment, name } = {}) => {
  return cy.createTestRun({ type, environment, name }).then(({ id }) => {
    return cy.fixture("cucumber-report.json").then((cucumberReport) => {
      return cy
        .importCucumberReport({
          testRunId: id,
          content: cucumberReport
        })
        .then(() => ({ id }));
    });
  });
});

Cypress.Commands.add("getFeaturesForTestRun", (testRunId) => {
  return cy
    .request("GET", `/api/features?testRunId=${testRunId}`)
    .should((xhr) => {
      expect(xhr.isOkStatusCode).to.be.true;
    })
    .then((xhr) => xhr.body);
});

Cypress.Commands.add("getScenariosForTestRun", (testRunId) => {
  return cy
    .request("GET", `/api/scenarii?testRunId=${testRunId}`)
    .should((xhr) => {
      expect(xhr.isOkStatusCode).to.be.true;
    })
    .then((xhr) => xhr.body);
});
