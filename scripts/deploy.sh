#!/usr/bin/env sh

set -e

yarn build

cd dist

git init
git add -A
git commit -m ':rocket: GH-Pages deploy'

git push -f git@github.com:castilh0s/School-Web.git master:gh-pages

cd -