HERE=`pwd`

export GITM_FILE_DIRECTORY=$HERE/e2e/tmp/files
export GITM_DB_FILE=$HERE/e2e/fake_db.db

set -e

rm -f $GITM_DB_FILE

node scripts/init.js --dbPath=$GITM_DB_FILE

NODE_ENV=production npm run build

NODE_ENV=production node index.js &

node scripts/reverse-proxy/index.js