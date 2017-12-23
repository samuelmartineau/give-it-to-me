PROJECT_ROOT=$(pwd)
echo "Run client"
cd $PROJECT_ROOT'/packages/give-it-to-me-client'
npm run dev &
echo "Run server"
cd $PROJECT_ROOT'/packages/give-it-to-me-server'
npm run dev &

wait
echo "Client and Server are running"