#!/bin/bash

set -e

HERE=`pwd`

export GITM_FILE_DIRECTORY=$HERE/e2e/tmp/files
export GITM_DB_FILE=$HERE/e2e/fake_db.db
export GITM_SERVER_PORT=4000

export NODE_ENV=production 

echo create E2E folder 
mkdir -p $HERE/e2e/tmp/files

echo "Clear previous DB"
rm -f $GITM_DB_FILE

echo "Create empty new DB"
node scripts/init.js --dbPath=$GITM_DB_FILE

echo "Build the client"
npm run build


concurrently "serve $GITM_FILE_DIRECTORY -p 3005" "node server/server.js" "npm run preview" &
