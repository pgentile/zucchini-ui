#!/usr/bin/env bash

# Run mongo command with input arguments
echo 'Running Mongo command...'
exec mongo $@ ./migrate.js
