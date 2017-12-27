PROJECT_ROOT=$(pwd)
cd $PROJECT_ROOT'/packages/give-it-to-me-client'
NODE_ENV=production npm run build
cd $PROJECT_ROOT'/packages/give-it-to-me-server'
NODE_ENV=production npm start