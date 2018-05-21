PROJECT_ROOT=$(pwd)

echo "Run client"
npx next &

echo "Run storybook"
npx start-storybook -p 6006 --static-dir client --config-dir client/.storybook &

echo "Run server"
cd $PROJECT_ROOT'/server'
npx nodemon index.js

wait
echo "Client and Server are running"
