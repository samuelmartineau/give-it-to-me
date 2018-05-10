PROJECT_ROOT=$(pwd)
export NODE_ENV=production

echo "Run client"
npx next build
npx next start &

echo "Run server"
cd $PROJECT_ROOT'/server'
node index.js
