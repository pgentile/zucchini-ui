#!/bin/bash

set -e

cd /zucchini-ui
exec java -jar zucchini-ui-capsule-*-capsule.jar server config.yml
