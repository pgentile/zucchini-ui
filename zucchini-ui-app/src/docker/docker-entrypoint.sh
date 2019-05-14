#!/bin/bash

set -e

# Need more args ? Use the JDK_JAVA_OPTIONS option
exec java \
  -showversion \
  -XX:-UseContainerSupport \
  -Djava.awt.headless=true \
  -jar /zucchini-ui/zucchini-ui-app-${ZUCCHINI_VERSION}-all.jar \
  "$@"
