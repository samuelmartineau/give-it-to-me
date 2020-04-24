PROXY_PORT=3005

HERE=`pwd`

export GITM_FILE_DIRECTORY=$HERE/files
export GITM_DB_FILE=$HERE/'db_v1.db'

sed -e "s;\$HERE;$HERE;g" -e "s;\$PROXY_PORT;$PROXY_PORT;g" -e "s;\$GITM_FILE_DIRECTORY;$GITM_FILE_DIRECTORY;g" ./scripts/nginx.config.template > ./scripts/nginx.config 

sudo nginx -s stop
sudo nginx -c $HERE/scripts/nginx.config 

echo "Everything running on http://localhost:$PROXY_PORT"

nodemon server/index.js --watch server
