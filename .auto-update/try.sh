#!/bin/bash
set -e

export CI=true # run 'yarn test' without prompt

echo "TEST without update"
yarn test

echo "TEST with update react-scripts"
yarn upgrade --latest react-scripts
yarn test

echo "TEST with update removed workaround"
git apply .auto-update/rm-workaround.patch --directory=src
yarn test
