#!/usr/bin/env bash

set -e

echo 'Build the migration file...'

concat_filename="$TMPDIR/mongo-migration-$$.js"

cat lib/lib.js >$concat_filename
find migrations -type f -name '*.js' | sort | while read f; do
  migration_file=${f##*/}
  echo "  Adding file $f"

  echo "// Migration file: $migration_file" >>$concat_filename
  echo "migrationContext.filename = '$migration_file';" >>$concat_filename
  cat $f >>$concat_filename
  echo >>$concat_filename
done

echo

# No argument : show the generated file
if [[ "$#" -eq 0 ]]; then
  echo 'Generated migration file:'
  echo
  cat $concat_filename
  exit
fi

# Run mongo command with input arguments
echo 'Running Mongo command...'
mongo $@ $concat_filename
