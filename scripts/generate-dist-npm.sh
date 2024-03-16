#!/bin/sh

mkdir -p dist-npm
cp -rf dist dist-npm/
cp -f package*.json dist-npm/
cp -f .npmrc dist-npm/
cp -f LICENSE dist-npm/
cp -f README.md dist-npm/

echo "\n//registry.npmjs.org/:_authToken=\${NPM_REGISTRY_TOKEN}" >> dist-npm/.npmrc
sed -i.bak 's!@wandeber\/quara!quara!g' dist-npm/package*.json

rm -f dist-npm/package*.json.bak
