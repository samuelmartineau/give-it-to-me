# Give It To Me

## Description

Give-it-to-me is an app which simplifies my father's life on managing his cellar.

## Teachers

[Full-Stack Redux Tutorial](http://teropa.info/blog/2015/09/10/full-stack-redux-tutorial.html)

[react-redux-socketio-chat](https://github.com/raineroviir/react-redux-socketio-chat)

[Gaearon](https://github.com/gaearon)

[Kombucha](https://github.com/kombucha)

### Docker

```
docker run -p 27017:27017 --restart=always --name gitm-mongo -d mongo --auth

docker exec -it gitm-mongo mongo admin
db.createUser({ user: 'root', pwd: 'root', roles: [ { role: "userAdminAnyDatabase", db: "admin" } ] });
db.auth('root', 'root')
use gitm
db.createUser({ user: 'Vin', pwd: 'Diesel', roles: [ { role: "readWrite", db: "gitm" } ] });
```

### Development

```
npm run dev
```

### Production

TODO

## Todos
* include reset less file render server side
* gzip production mode
* display devices already connected on welcomePage (useragent)
* lazy-load-your-images-with-coloor [lazy-load](http://krasimirtsonev.com/blog/article/lazy-load-your-images-with-coloor)
* match mistake in query (ie: aoc) [Levenshtein distance](https://en.wikipedia.org/wiki/Levenshtein_distance)
