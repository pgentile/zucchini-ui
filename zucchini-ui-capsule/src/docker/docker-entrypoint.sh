#!/bin/bash

set -e

cd /zucchini-ui
exec gosu zucchini java -jar zucchini-ui-capsule-${ZUCCHINI_VERSION}-capsule.jar "$@"
