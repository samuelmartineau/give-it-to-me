# Give It To Me

## Dependencies

### imagemagick

[imagemagick!](http://www.imagemagick.org)

### graphicsmagick

[graphicsmagick!](http://www.graphicsmagick.org/)

## Developpement

### Requirements

#### nginx

[install](https://www.nginx.com/)

## Installation

Init db tables

```
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

```

```
npm start
```

will build the client + launch the server
