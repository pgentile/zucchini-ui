#!/usr/bin/env bash

set -e

testRunId="TEST-RUN-$(uuidgen)"
curl -D- -X POST -H 'Content-Type: application/json' --data @./target/cucumber/report.json "http://localhost:8080/test-runs/$testRunId/import"
