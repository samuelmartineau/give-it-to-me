HERE=`pwd`

export GITM_FILE_DIRECTORY=$HERE/files
export GITM_DB_FILE=$HERE/'db_v1.db'

node scripts/reverse-proxy/index.js &

nodemon index.js --watch server
