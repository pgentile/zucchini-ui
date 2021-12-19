#!/bin/bash

set -x
set -e
set -o pipefail

git branch -C browserslist
git checkout browserslist

(cd zucchini-ui-frontend && npx browserslist@latest --update-db)
(cd zucchini-ui-e2e-tests && npx browserslist@latest --update-db)

git branch
git status

count_changes=$(git status --porcelain | wc -l)
if [[ $count_changes -gt 0 ]]; then

  git config user.name "Browserslist Bot"
  git config user.email "browserslist@pgentile.example.org"

  git remote -v

  git add -u
  git status
  git commit -m "Upgrade the browserslist database"
  git push --force --set-upstream browserslist origin
  gh pr view || gh pr create --title "Update browserslist database" --label browserslist --body "Automatic upgrade of the database"
fi
