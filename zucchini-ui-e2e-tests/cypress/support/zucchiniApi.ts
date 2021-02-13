type PartialTestRun = {
  id: string;
};

type TestRun = PartialTestRun & {
  info: Info;
};

type Feature = {
  id: string;
  info: Info;
};

type Scenario = {
  id: string;
  status: "NOT_RUN" | "PASSED" | "FAILED" | "PENDING";
  info: Info;
};

type Info = {
  keyword: string;
  name: string;
};

type TestRunParams = {
  type?: string;
  environment?: string;
  name?: string;
};

type ImportCucumberReportParams = {
  testRunId: string;
  content: Cypress.RequestBody;
};

// eslint-disable-next-line @typescript-eslint/no-namespace
declare namespace Cypress {
  interface Chainable {
    createTestRun(params?: TestRunParams): Chainable<TestRun>;

    importCucumberReport(params: ImportCucumberReportParams): Chainable<null>;

    createFilledTestRun(params?: TestRunParams): Chainable<PartialTestRun>;

    getFeaturesForTestRun(testRunId: string): Chainable<Feature[]>;

    getScenariosForTestRun(testRunId: string): Chainable<Scenario[]>;
  }
}

Cypress.Commands.add(
  "createTestRun",
  ({ type = "TYPE", environment = "ENV", name = "NAME" }: TestRunParams = {}): Cypress.Chainable<TestRun> => {
    return cy
      .request("POST", "/api/testRuns/create", {
        type,
        environment,
        name
      })
      .should((xhr) => {
        expect(xhr.isOkStatusCode).to.be.true;
      })
      .then((xhr) => xhr.body as TestRun);
  }
);

Cypress.Commands.add(
  "importCucumberReport",
  ({ testRunId, content }: ImportCucumberReportParams): Cypress.Chainable<null> => {
    return cy
      .request("POST", `/api/testRuns/${testRunId}/import`, content)
      .should((xhr) => {
        expect(xhr.isOkStatusCode).to.be.true;
      })
      .end();
  }
);

Cypress.Commands.add(
  "createFilledTestRun",
  ({ type, environment, name }: TestRunParams = {}): Cypress.Chainable<PartialTestRun> => {
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
  }
);

Cypress.Commands.add(
  "getFeaturesForTestRun",
  (testRunId: string): Cypress.Chainable<Feature[]> => {
    return cy
      .request("GET", `/api/features?testRunId=${testRunId}`)
      .should((xhr) => {
        expect(xhr.isOkStatusCode).to.be.true;
      })
      .then((xhr) => xhr.body);
  }
);

Cypress.Commands.add(
  "getScenariosForTestRun",
  (testRunId: string): Cypress.Chainable<Scenario[]> => {
    return cy
      .request("GET", `/api/scenarii?testRunId=${testRunId}`)
      .should((xhr) => {
        expect(xhr.isOkStatusCode).to.be.true;
      })
      .then((xhr) => xhr.body);
  }
);
