#!/bin/bash

set -e
set -o pipefail

count_changes=$(git status --porcelain | wc -l)
if [[ $count_changes -gt 0 ]]; then
  git branch -C browserslist
  git checkout browserslist

  git add -u
  echo "$GITHUB_TOKEN" | gh auth login --with-token
  gh pr view || gh pr create --title "Update browserslist database" --label browserslist --body "Automatic upgrade of the database"
  git commit -m "Upgrade the browserslist database"
  git push --force
fi
