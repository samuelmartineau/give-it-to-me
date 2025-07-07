#!/bin/bash

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

export GITM_FILE_DIRECTORY=$SCRIPT_DIR/tmp/files
export GITM_CLIENT_DIRECTORY=$SCRIPT_DIR/../client/dist
export GITM_DB_FILE=$SCRIPT_DIR/fake_db.db
export GITM_SERVER_PORT=4000

export NODE_ENV=production 

echo create E2E folder 
mkdir -p $SCRIPT_DIR/tmp/files

echo "Clear previous DB"
rm -f $GITM_DB_FILE

cd "$SCRIPT_DIR/.."

echo "Create empty new DB"
node ./scripts/init.js --dbPath=$GITM_DB_FILE

echo "Build the client"
concurrently "npm run dev --prefix client " "serve -p 3005 $GITM_FILE_DIRECTORY" "node server/src/server.js" &
