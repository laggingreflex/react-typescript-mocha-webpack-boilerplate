#!/bin/sh

# This script is used by the local dev environment setup, (see provision.sh in the top level of the project)
# Initial working directory should be one level above this script, i.e. the ui folder.

npm install --save-dev
npm run build
cp dist/* package/src/main/webapp/
cd package
mvn clean install