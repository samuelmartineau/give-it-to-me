# Give It To Me

A wine cellar manager: a React client (Vite) and an Express + SQLite API server.

## Requirements

Node.js 26 (see `.nvmrc`). Image processing uses [sharp](https://sharp.pixelplumbing.com/), which ships its own prebuilt binaries, so ImageMagick and GraphicsMagick are no longer needed.

## Project layout

| Folder     | Content                                         |
| ---------- | ----------------------------------------------- |
| `client/`  | React + Vite front end                          |
| `server/`  | Express API server (SQLite, sharp)              |
| `scripts/` | Database init and sample data scripts           |
| `config/`  | Shared cellar, wine and bottle type definitions |
| `data/`    | SQL schema and seed data                        |
| `e2e/`     | Cypress end-to-end tests                        |

Each folder has its own `package.json`, so install them separately:

```
npm install
npm install --prefix client
npm install --prefix server
npm install --prefix scripts
npm install --prefix e2e   # only needed for end-to-end tests
```

## Development

### Database

Create the `db_v1.db` tables, then optionally fill them with sample data:

```
npm run init
npm run sample
```

### Run

```
npm run dev
```

starts, in parallel:

- the API server on port 4000 (`nodemon`, restarts on change)
- a static file server for pictures on port 3005 (serves `files/`)
- the Vite client dev server on http://localhost:3000, which proxies `/api` and `/sse` to the API server and `/files` to the picture server

The dev environment (`GITM_SERVER_PORT`, `GITM_DB_FILE`, `GITM_FILE_DIRECTORY`) is set by `scripts/set_dev.sh`.

### Scripts

Root:

| Script            | Description                                            |
| ----------------- | ------------------------------------------------------ |
| `npm run dev`     | Start API server, picture server and client dev server |
| `npm run dev:cdn` | Serve `files/` on port 3005 only                       |
| `npm run init`    | Create the database tables in `db_v1.db`               |
| `npm run sample`  | Insert sample data into `db_v1.db`                     |

Client (`npm run <script> --prefix client`):

| Script    | Description                             |
| --------- | --------------------------------------- |
| `dev`     | Vite dev server                         |
| `build`   | Type check and build into `client/dist` |
| `preview` | Preview the production build            |
| `lint`    | ESLint                                  |

Server (`npm run <script> --prefix server`):

| Script  | Description             |
| ------- | ----------------------- |
| `dev`   | API server with nodemon |
| `start` | API server              |
| `test`  | Jest tests              |
| `lint`  | ESLint                  |

### End-to-end tests

```
npm run start --prefix e2e   # creates a fresh test DB and starts the app (runs in CI)
npm run open --prefix e2e    # opens the Cypress UI
```

## Production

The client and the server are built and deployed separately: CI builds the client (`npm run build --prefix client`) and `deploy.sh` copies `client/dist`, the server and `config/` to the VPS, then restarts the `cave` pm2 process.

Server env variables:

```
GITM_SERVER_PORT=3000 # server port
GITM_FILE_DIRECTORY=/gitm/files # location where pictures are stored
GITM_DB_FILE=/db_v1.db # DB filename
GITM_API_SENTRY_DSN= # optional, Sentry DSN for the API
```

Client build env variables (read by Vite from the environment or a `.env` file in `client/`):

```
GITM_OWNER=Samuel # Cellar owner name shown in the UI
SENTRY_DSN= # optional, Sentry DSN for the client
SENTRY_ORG= SENTRY_PROJECT= SENTRY_AUTH_TOKEN= # optional, upload source maps
```
