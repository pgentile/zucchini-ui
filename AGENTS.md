# Agents instructions for Zucchini UI

## About the project

Zucchini UI is a tool that collects and stores Cucumber test runs.

This is a monorepository containing a backend application, a frontend application,
automated tests, and MongoDB migration scripts. The application is packaged as
Docker images.

## Project architecture

This repository is a Gradle multi-project build for a full-stack Cucumber reporting app:

- `zucchini-ui-backend`: Java + Dropwizard backend using Spring, Morphia, and MongoDB.
  The main application entry point is `io.zucchiniui.backend.BackendApplication`.
- `zucchini-ui-frontend`: React + Redux + React Router + Bootstrap UI, built with
  webpack and tested with Jest.
- `zucchini-ui-app`: packaged fat JAR that bundles the backend and frontend for deployment.
- `zucchini-ui-mongo`: MongoDB migration scripts and database setup.
- `zucchini-ui-e2e-tests`: Cypress end-to-end tests.
- `zucchini-ui-example-features`: sample Cucumber reports for local testing and validation.
- `server-config.yml`: the default Dropwizard configuration file used by the backend.

The repository is orchestrated from the root `build.gradle`. Do not treat the frontend
and backend as independent apps when changing a feature that spans both layers.

## Build, test, and lint commands

Use the Gradle wrapper at the repository root.

### First-time setup

```bash
./gradlew yarnInstall
```

This installs the Node/Yarn dependencies used by the frontend and E2E test projects.

### Full validation

```bash
./gradlew build
./gradlew test
./gradlew check
./gradlew dockerBuild
```

CI is implemented with GitHub Actions and runs the equivalent of `./gradlew assemble`,
then `./gradlew check`, and builds the Docker image.

### Run the app locally

Start MongoDB and apply migrations:

```bash
mongod &
(cd zucchini-ui-mongo && ./migrate.sh MONGO_HOST/MONGO_DATABASE)
```

Start the backend:

```bash
./gradlew runBackend
```

Start the frontend dev server:

```bash
cd zucchini-ui-frontend
yarn start
```

The UI is served on port `9000`; the backend API and admin ports are `8080` and `8081`.

### Full-stack Docker flow

```bash
./gradlew dockerBuild
docker compose up
```

The app can also be run as a packaged JAR:

```bash
./gradlew runShadow
```

### Single-test commands

Java backend tests:

```bash
./gradlew :zucchini-ui-backend:test --tests 'fully.qualified.ClassName'
```

Frontend Jest tests:

```bash
cd zucchini-ui-frontend
yarn test --runTestsByPath src/path/to/test-file.test.js
```

Cypress E2E tests:

```bash
./gradlew :zucchini-ui-e2e-tests:jsTest
# or directly
cd zucchini-ui-e2e-tests
yarn test --spec 'cypress/e2e/path/to/spec.cy.js'
```

For the Docker-based E2E flow, start all servers first:

```bash
./gradlew dockerComposeUp
./gradlew :zucchini-ui-e2e-tests:jsTest
```

### Linting

```bash
cd zucchini-ui-frontend
yarn lint
cd zucchini-ui-e2e-tests
yarn lint
```

## Key conventions

- Use the repository's Gradle wrapper instead of a local Gradle installation.
- Java is compiled with Java 21, UTF-8, `-parameters`, and `-Werror` in `build.gradle`;
  this is enforced project-wide.
- Frontend assets are built with webpack and copied into backend resources during the
  Gradle build. Changes that affect UI rendering often require a full Gradle build to
  verify packaging.
- MongoDB migrations are part of normal app startup; do not assume the database is ready
  without running the migration script.
- The app expects a Dropwizard YAML config file (`server-config.yml`); environment
  variables can be referenced inside it.
- Keep changes compatible with the Gradle + Yarn + Docker workflow rather than
  introducing ad hoc tooling.
- Dependencies are updated automatically with Renovate.
- Prefer editing the correct subproject instead of adding hidden cross-project logic.
- Feature work usually has a clean boundary between backend Java code and frontend
  React code, but changes spanning both layers must be wired and validated across the
  root build.
- CI uses Node 22 and Java 21. Project documentation may mention Node 20, but the CI
  pipeline is the current compatibility reference.
