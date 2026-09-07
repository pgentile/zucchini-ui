# Zucchini UI Modernization Plan

## Executive summary

Zucchini UI is already partially modernized: it uses Java 21, Dropwizard 4, Spring 6, React 18, Webpack 5, TypeScript 5.9, Cypress 15, and Node 22 in CI. Renovate also automates a large part of dependency maintenance.

The highest risks are concentrated in the foundations rather than in the age of the React or Webpack versions:

- The MongoDB persistence layer still relies on Morphia 1.4, the MongoDB Java driver 3.12, and legacy MongoDB APIs while the Docker image uses MongoDB 8.
- The Yarn-to-PNPM migration is currently incomplete in the working tree, with build logic, lockfiles, and CI conventions not yet aligned.
- PMD, SpotBugs, and some Cucumber tasks are configured not to fail the build.
- Backend tests are primarily domain unit tests; visible integration coverage for Dropwizard, Jersey, MongoDB, WebSockets, and HTTP contracts is limited.
- Authentication and authorization are not visible in the application surface, CORS is globally enabled, and Docker Compose publishes MongoDB and the Dropwizard admin port.
- The frontend remains mostly JavaScript/JSX, with only a small TypeScript/TSX portion and extensive use of `PropTypes` and legacy Redux container patterns.
- The REST API has no visible formal contract or consistent pagination strategy for potentially large list responses.

The recommendations below are ordered by importance and dependency.

## Prioritized recommendations

### P0 — Critical foundations

#### 1. Secure and modernize MongoDB compatibility

**Actions**

- Choose a supported persistence target: modern Morphia, the official MongoDB Java driver, or Spring Data MongoDB.
- Replace legacy APIs in `MorphiaDatastoreBuilder`, `MongoHealthCheck`, and `MorphiaRawQuery`.
- Verify the selected stack against MongoDB 8.
- Replace the legacy `mongo` shell with `mongosh` in `migrate.sh`.
- Add startup and migration tests against a real MongoDB instance.

**Expected outcome**

Lower the risk of startup failures, incompatible behavior, and blocked future MongoDB upgrades.

#### 2. Establish the application security model

**Actions**

- Decide whether the application is strictly internal or exposed to untrusted networks.
- If externally exposed, add authentication and operation-level authorization.
- Protect import, update, and deletion endpoints.
- Add strict request validation, upload size limits, and audit logging for sensitive actions.
- Restrict CORS to the authorized frontend origins instead of using a global filter.
- Avoid exposing MongoDB and the Dropwizard admin port publicly in production.

**Expected outcome**

Make deployment security explicit instead of relying primarily on network isolation.

#### 3. Complete the Yarn-to-PNPM migration

**Actions**

- Select one package manager and use it consistently.
- If PNPM is retained, version `pnpm-lock.yaml`, `pnpm-workspace.yaml`, and `PNPMTask.groovy`.
- Remove remaining Yarn references from Gradle, CI, documentation, and developer workflows.
- Enable Corepack and pin the PNPM version.
- Make the migration atomic so the repository never references build classes or lockfiles that are not versioned together.

**Expected outcome**

Reproducible local and CI builds with deterministic dependency installation and lower installation times.

#### 4. Make quality checks blocking

**Actions**

- Gradually remove `ignoreFailures` from PMD and SpotBugs.
- Remove `ignoreExitValue` from Cucumber tasks after fixing the underlying test failures.
- Introduce targeted coverage thresholds rather than an arbitrary global threshold.
- Make `check` the required gate before packaging and publishing images.

**Expected outcome**

Prevent regressions from being merged or published while preserving a staged adoption path.

### P1 — Reliability and contracts

#### 5. Build a real backend integration-test strategy

**Actions**

- Add HTTP-level tests that start the Dropwizard application.
- Run integration tests against an isolated MongoDB instance.
- Cover report import, validation errors, optimistic concurrency, migrations, WebSockets, and attachments.
- Keep Cypress for critical user journeys, but do not rely on it as the only end-to-end functional safety net.

**Expected outcome**

Validate backend contracts end to end and make dependency migrations safer.

#### 6. Formalize and stabilize the API

**Actions**

- Document the REST API with OpenAPI.
- Define a consistent error envelope and documented HTTP status behavior.
- Define API versioning rules.
- Add explicit request limits and pagination to endpoints returning potentially large lists, including test runs and scenarios.
- Generate or share frontend types from the API contract.

**Expected outcome**

Provide predictable API behavior, safer client compatibility, and controlled performance as data volumes grow.

#### 7. Review MongoDB query performance

**Actions**

- Audit production-like queries used by the main screens.
- Replace full scans and unnecessary Java-side aggregation with projections, MongoDB aggregation, or pagination where appropriate.
- Modernize the raw-query implementation currently based on deprecated Morphia APIs.
- Add performance tests using representative test-run and scenario volumes.

**Expected outcome**

Keep response times stable as the number of runs and scenarios increases.

#### 8. Migrate the frontend progressively to TypeScript

**Actions**

- Start with API models, the HTTP client, Redux state, and central components.
- Replace `PropTypes` and untyped objects with explicit interfaces and types.
- Migrate domain by domain rather than attempting a full rewrite.
- Enable stricter TypeScript settings as coverage increases.

The repository currently contains roughly 177 JavaScript/JSX files and only a small number of TypeScript/TSX files.

**Expected outcome**

Reduce runtime regressions, make frontend contracts explicit, and simplify future refactoring.

#### 9. Modernize state and network management

**Actions**

- Evaluate Redux Toolkit and RTK Query as a gradual replacement for custom Redux patterns and middleware.
- Centralize request caching, invalidation, loading states, and error handling.
- Keep WebSockets for presence, but formalize the protocol, lifecycle, and reconnection behavior.

**Expected outcome**

Reduce repetitive application code and improve consistency across network-driven UI state.

### P2 — Platform and user-facing modernization

#### 10. Refresh the UI stack

**Actions**

- After TypeScript and test coverage have improved, plan Bootstrap 4 to Bootstrap 5.
- Upgrade `react-bootstrap` accordingly.
- Evaluate Font Awesome 5 to 6 and a maintained charting library.
- Include accessibility and browser compatibility improvements in the UI work.

React 19 should not be the first modernization target; the immediate value of the foundational work above is higher.

**Expected outcome**

Reduce UI dependency debt and improve browser compatibility and accessibility.

#### 11. Harden container images and the software supply chain

**Actions**

- Prefer `COPY` over `ADD` where archive extraction is not required.
- Use minimal, pinned runtime images.
- Pin base images by digest for release builds.
- Avoid relying only on mutable tags such as `latest`.
- Generate an SBOM, scan images, and sign release artifacts.
- Separate image build, publication, and E2E test responsibilities.

**Expected outcome**

Produce smaller, traceable, verifiable images with reliable rollback capability.

#### 12. Improve CI/CD security and reproducibility

**Actions**

- Separate pull-request validation, image building, and image publication workflows.
- Do not log in to Docker Hub from pull-request builds.
- Minimize GitHub Actions permissions.
- Remove full environment dumps from CI logs.
- Pin third-party actions by commit SHA where practical.
- Avoid recording Cypress runs when the recording key is unavailable.
- Replace `check-latest: true` with controlled tool versions for reproducible builds.

**Expected outcome**

Improve CI security, reduce fork-related failures, and make release behavior auditable.

#### 13. Add standardized observability and operations

**Actions**

- Add structured logs and correlation identifiers.
- Expose HTTP and MongoDB metrics.
- Add business metrics for imports, runs, scenarios, and failures.
- Add separate readiness and liveness checks.
- Evaluate OpenTelemetry traces.
- Document alert thresholds, backup verification, and MongoDB restoration procedures.

The existing Dropwizard health checks provide a useful starting point.

**Expected outcome**

Reduce production diagnosis time and provide visibility into real-world performance and reliability.

## Recommended delivery sequence

### Phase 1 — Stabilization and critical risks

1. Freeze a known-good baseline that builds and passes the current tests.
2. Complete or cleanly revert the Yarn-to-PNPM migration.
3. Validate MongoDB 8 compatibility with the selected persistence stack.
4. Update the migration tooling to use `mongosh`.
5. Define authentication, authorization, CORS, and network-exposure requirements.
6. Add the first backend integration tests.

### Phase 2 — Reliability and contracts

1. Make PMD, SpotBugs, and integration tests blocking.
2. Introduce OpenAPI and a stable error format.
3. Add pagination, request limits, and targeted load tests.
4. Audit MongoDB indexes against real application queries.
5. Secure CI workflows and Docker publication.

### Phase 3 — Application modernization

1. Migrate frontend API models and core state to TypeScript.
2. Introduce Redux Toolkit and RTK Query incrementally.
3. Modernize Bootstrap and UI components.
4. Improve accessibility and bundle performance.
5. Evaluate React 19 and future bundler changes after the preceding work is stable.

## Minimum viable modernization scope

If resources are limited, prioritize these four initiatives:

1. Make the MongoDB persistence stack officially compatible with MongoDB 8.
2. Complete the PNPM migration or return to Yarn; do not keep a hybrid state.
3. Establish application and network security controls.
4. Add backend integration tests and make quality checks blocking.

These initiatives provide the largest reduction in operational risk before a frontend rewrite or visual redesign.
