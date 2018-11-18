PROJECT_ROOT=$(pwd)

echo "Run client"
npx next &

echo "Run server"
cd $PROJECT_ROOT'/server'
npx nodemon index.js

wait
echo "Client and Server are running"
