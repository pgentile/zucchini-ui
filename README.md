[![Build Status](https://travis-ci.org/pgentile/tests-cucumber.svg?branch=master)](https://travis-ci.org/pgentile/tests-cucumber)

Tests Cucumber
==============

A backend to record Cucumber results. An UI to read results.


Requirements
------------

* JDK 8
* Node
* Bower
* Grunt
* Mongo


Build
-----

First time, install Bower dependencies and init Gradle build for Node component:

```
(cd tests-cucumber-ui && npm install && bower install)
```

Build application with Gradle:

```
./gradlew build
```

_Warning_: when Gradle is launched with Intellij, the PATH environment variable doesn't
always contain path to Grunt. If this is the case, relaunch Gradle daemon:

```
./gradlew --stop
./gradlew build
```


Develop
-------

Run Mongo with Docker Compose:

```
docker-compose up
```

Start Java backend:

```
./gradlew runBackend
```

Start UI:

```
(cd tests-cucumber-ui && grunt serve)
```


Architecture
------------

Used frameworks:

* UI project: [AngularJS](https://angularjs.org)
* Backend project: [Dropwizard](http://dropwizard.io),
  [Spring](http://spring.io), [Morphia](http://mongodb.github.io/morphia/),
  [Orika](http://orika-mapper.github.io/orika-docs)
