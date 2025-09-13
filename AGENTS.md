Agents instructions
===================

## About the project

Zucchini UI is a tool that collects and stores Cucumber test runs.

This is a mono-repository that contains a backend application, a frontend application
and automated tests.

The application is packaged as Docker images.

* **Backend application:** Java + Dropwizard application
* **Frontend application :** React + Redux + React Router + Bootstrap
* **Automated tests:** Cypress
* **Database:** MongoDB


## Repository layout

* `zucchini-ui-backend`: backend application
* `zucchini-ui-frontend`: frontend application
* `zucchini-ui-app`: server application that hosts both frontend and backend
* `zucchini-ui-mongo`: MongoDB database with migration scripts
* `zucchini-ui-e2e-tests`: Autoamted end-to-end tests


## Build the project

### Build the whole project

Gradle is used to orchestrate the build of the whole application:

**Install project dependencies:**

```sh
./gradlew yarnInstall
```

**Build the application:**

```sh
./gradlew build dockerBuild
```

**Run unit tests:**

```sh
./gradlew test
```

**Run end-to-end tests:**

Start all servers:

```sh
./gradlew dockerComposeUp
```

Then run automated tests:


```sh
./gradlew :zucchini-ui-e2e-tests:jsTest
```
