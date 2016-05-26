#!/bin/bash

set -e

cd /usr/share/tests-cucumber
exec java -jar tests-cucumber-capsule-*-capsule.jar server config.yml
