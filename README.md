[![Build Status](https://travis-ci.org/voyages-sncf-technologies/zucchini-ui.svg?branch=master)](https://travis-ci.org/voyages-sncf-technologies/zucchini-ui)

Zucchini UI
===========

Record and analyze your Cucumber results.


Requirements
------------

* JDK 8
* Node
* Mongo


Build
-----

First time, install NPM dependencies:

```
./gradlew npmInstall
```

Build application with Gradle:

```
./gradlew build
```

_Warning_: when Gradle is launched with Intellij, the PATH environment variable doesn't
always contain path to Webpack. If this is the case, relaunch Gradle daemon:

```
./gradlew --stop
./gradlew build
```


Develop
-------

Run Mongo database server:

```
mongod &
```

Run Mongo migrations to build database:

```
(cd zucchini-ui-mongo && ./migrate.sh MONGO_HOST/MONGO_DATABASE)
```

Start Java backend:

```
./gradlew runBackend
```

Start frontend:

```
(cd zucchini-ui-frontend && npm run dev)
```

Open your browser to :

```
http://localhost:9000
```

You can build sample Cucumber reports from the `zucchini-ui-example-features`:

```
./gradlew dryRunCucumber runCucumber
```

Generated reports can be found in `build` directory.


Deploy
------

The sub-project `zucchini-ui-capsule` builds a fat [Capsule](http://www.capsule.io) that contains in one JAR
backend and UI. This JAR contains everything that is needed to run the Zucchini UI app.

You can run it from Gradle:

```
./gradlew runCapsule
```

The fat Capsule JAR is named `zucchini-ui-capsule-VERSION-SNAPSHOT-capsule.jar`. Run it with this command:

```
java -jar zucchini-ui-capsule-VERSION-SNAPSHOT-capsule.jar server CONFIG.yml
```

Don't forget to init your Mongo database !

```
(cd zucchini-ui-mongo && ./migrate.sh MONGO_HOST/MONGO_DATABASE)
```


Build and deploy a Docker image
-------------------------------

You can build a Docker image for the Capsule:

```
./gradlew dockerBuild
```

The Docker image will be built in repository `pgentile/zucchini-ui`. After that, you can run the
Docker image with the following command:

```
docker run -p 8080:8080 -e TC_MONGO_URL=mongodb://MONGO_URI pgentile/zucchini-ui
```

You can find some pre-built images in [Docker Hub](https://hub.docker.com/r/pgentile/zucchini-ui/).


Configuration
-------------

The configuration file used by the application is a [Dropwizard YAML file](http://www.dropwizard.io/1.0.0/docs/manual/configuration.html).

You can use in your file environment variable, like `${HOME}` ou `${USER}`. View the [sample configuration file](server-config.yml) for more information.


Architecture
------------

Used frameworks:

* UI project: [AngularJS](https://angularjs.org)
* Backend project: [Dropwizard](http://dropwizard.io),
  [Spring](http://spring.io), [Morphia](http://mongodb.github.io/morphia/),
  [Orika](http://orika-mapper.github.io/orika-docs)


Validating that a JSON report can be parsed
-------------------------------------------

```
./gradlew runJsonImporter -PjsonFilePath=...
```


Contributing
------------

See the [contributing guide](CONTRIBUTING.md)
