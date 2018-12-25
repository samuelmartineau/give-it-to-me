PROXY_PORT=3005

node scripts/nginx.js &

nodemon server/index.js --watch server
