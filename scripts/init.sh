PROJECT_ROOT=$(pwd)
echo "Init db schemas"
cd $PROJECT_ROOT'/packages/give-it-to-me-server'
npm run initDb &

wait
echo "Client and Server are running"