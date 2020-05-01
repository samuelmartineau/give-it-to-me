HERE=`pwd`

export GITM_FILE_DIRECTORY=$HERE/e2e/tmp/files
export GITM_DB_FILE=$HERE/e2e/fake_db.db

set -e

echo "Clear previous DB"
rm -f $GITM_DB_FILE

echo "Create empty new DB"
node scripts/init.js --dbPath=$GITM_DB_FILE

echo "Build the client"
NODE_ENV=production npm run build

echo "Run the server"
NODE_ENV=production node index.js &

echo "Expose on entry URL"
node scripts/reverse-proxy/index.js