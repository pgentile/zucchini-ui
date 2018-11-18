#!/bin/bash

set -e

exec java ${JAVA_OPTS} -XX:-UseContainerSupport -showversion -jar /zucchini-ui/zucchini-ui-app-${ZUCCHINI_VERSION}-all.jar "$@"
