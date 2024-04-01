#!/bin/bash

set -e

HERE=`pwd`

export GITM_FILE_DIRECTORY=$HERE/e2e/tmp/files
export GITM_DB_FILE=$HERE/e2e/fake_db.db

export NODE_ENV=production 

echo create E2E folder 
mkdir -p $HERE/e2e/tmp/files

echo "Clear previous DB"
rm -f $GITM_DB_FILE

echo "Create empty new DB"
node scripts/init.js --dbPath=$GITM_DB_FILE

echo "Build the client"
npm run build:front-server

concurrently "node server/server.js" "next start"

