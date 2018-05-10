PROJECT_ROOT=$(pwd)

echo "Run client"
npx next &

# echo "Run storybook"
# npx start-storybook -p 6006 --static-dir client --config-dir client/.storybook

echo "Run server"
cd $PROJECT_ROOT'/server'
npx nodemon index.js

wait
echo "Client and Server are running"

    # "flow": "flow",
    # "dev": "npm-run-all -p dev:**",
    # "dev:next": "next",
    # "dev:storybook": "start-storybook -p 6006",
    # "build": "next build",
    # "start": "next start",
    # "storybook": "start-storybook -p 6006",
    # "build-storybook": "build-storybook"

    # "dev": "nodemon index.js",
    # "start": "node index.js",
    # "initDb": "bin/initDb.js"
