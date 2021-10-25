#!/bin/bash

set -e

# Need more args ? Use the JDK_JAVA_OPTIONS option
exec java \
  -showversion \
  -XX:-OmitStackTraceInFastThrow \
  -XX:+PrintCommandLineFlags \
  -Djava.awt.headless=true \
  -classpath "/zucchini-ui/app/*:/zucchini-ui/libs/*" \
  --add-opens java.base/java.lang=ALL-UNNAMED \
  io.zucchiniui.app.ZucchiniUIApplication \
  "$@"
