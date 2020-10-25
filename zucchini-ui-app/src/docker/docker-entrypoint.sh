#!/bin/bash

set -e

# Need more args ? Use the JDK_JAVA_OPTIONS option
exec java \
  -showversion \
  -XX:-UseContainerSupport \
  -Djava.awt.headless=true \
  -classpath "/zucchini-ui/app/*:/zucchini-ui/libs/*" \
  io.zucchiniui.app.ZucchiniUIApplication \
  "$@"
