PROXY_PORT=3005

HERE=`pwd`

sed -e "s;\$HERE;$HERE;g" -e "s;\$PROXY_PORT;$PROXY_PORT;g" ./scripts/nginx.config.template > ./scripts/nginx.config 

sudo nginx -s stop
sudo nginx -c $HERE/scripts/nginx.config 

echo "Everything running on http://localhost:$PROXY_PORT"

nodemon server/index.js --watch server
