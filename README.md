# Give It To Me

## Requirements

Node.js 26 (see `.nvmrc`). Image processing uses [sharp](https://sharp.pixelplumbing.com/), which ships its own prebuilt binaries, so ImageMagick and GraphicsMagick are no longer needed.

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
GITM_SERVER_PORT=3000 # server port
GITM_FILE_DIRECTORY=/gitm/files # location where pictures are stored
GITM_OWNER=Samuel # Cellar user
GITM_DB_FILE=/db_v1.db # DB filename
```

```
npm start
```

will build the client + launch the server
