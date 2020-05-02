# Give It To Me

## Dependencies

### imagemagick

[imagemagick!](http://www.imagemagick.org)

### graphicsmagick

[graphicsmagick!](http://www.graphicsmagick.org/)

## Developpement

## Installation

Init db tables with sampling data

```
npm run proxy
npm run init
```

### Run

```
npm run dev
```

will start API server + client dev server

## Production

Env variables

```
GITM_PORT=3000 # server port
GITM_FILE_DIRECTORY=/gitm/files # location where pictures are stored
GITM_OWNER=Samuel # Cellar user
GITM_DB_FILE=/db_v1.db # DB filename
```

```
npm start
```

will build the client + launch the server
