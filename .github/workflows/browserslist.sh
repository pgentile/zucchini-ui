#!/bin/bash

set -x
set -e
set -o pipefail

function open_pr() {
  gh pr create --title "Update browserslist database" --label browserslist --body "Update of the browserslist database"
}

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
  git push --force --set-upstream origin browserslist

  if gh pr view; then
    # PR already exists
    if [[ $(gh pr view --json state | jq -r .state) == MERGED ]]; then
      # Reopen PR
      open_pr
    fi
  else
    # PR doesn't exist, open new one
    open_pr
  fi

  if gh pr view; then
      gh workflow run Build --ref browserslist
  fi
fi
