[![Build Status](https://travis-ci.org/pgentile/tests-cucumber.svg?branch=master)](https://travis-ci.org/pgentile/tests-cucumber)

Tests Cucumber
==============

A backend to record Cucumber results. An UI to read results


Requirements
------------

* JDK 8
* Node
* Bower
* Compass
* Grunt
* Mongo


Build
-----

First time, install Bower dependencies and init Gradle build for Node component :

```
(cd test-cucumber-ui && bower install)
./gradlew npmInstall installGrunt
```

Build application with Gradle :

```
./gradlew build
```

Develop
-------

Run Mongo with Docker Compose :

```
docker-compose up
```

Start Java backend :

```
./gradlew XXX
```

Start UI :

```
cd tests-cucumber-ui
grunt serve
```
