#!/usr/bin/env bash

set -e


absolute_filename() {
  typeset file="$1"
  typeset dir=$(cd "$(dirname "$file")" && pwd)
  typeset basename=${file##*/}
  echo "$dir/$basename"
}


create_migration_script() {
  typeset output_file="$1"
  typeset f
  typeset basename_f
  typeset absolute_f

  exec 6>$output_file

  # Load library

  f=lib/lib.js
  basename_f=${f##*/}
  absolute_f=$(absolute_filename "$f")

  echo '// Loading library' >&6
  echo 'load("'"$absolute_f"'");' >&6
  echo >&6

  # Load migration scripts

  find migrations -type f -name '*.js' | sort | while read f; do
    basename_f=${f##*/}
    absolute_f=$(absolute_filename "$f")

    echo "// Loading migration $basename_f" >&6
    echo "migrationContext.filename = '$basename_f';" >&6
    echo 'load("'"$absolute_f"'");' >&6
    echo >&6
  done

  exec 6>&-
}


echo 'Build the migration file...'

temp_dir=${TMPDIR:-${TEMP:-${TMP}}}
concat_filename="$temp_dir/mongo-migration-$$.js"

create_migration_script $concat_filename

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
