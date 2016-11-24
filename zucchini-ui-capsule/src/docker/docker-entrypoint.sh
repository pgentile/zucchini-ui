#!/bin/bash

set -e

exec java -jar /zucchini-ui/zucchini-ui-capsule-${ZUCCHINI_VERSION}-capsule.jar "$@"
