#!/bin/bash

set -e

exec java ${JAVA_OPTS} -jar /zucchini-ui/zucchini-ui-capsule-${ZUCCHINI_VERSION}-capsule.jar "$@"
