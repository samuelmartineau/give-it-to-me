const cellar = require("./cellar");
const wineTypes = require("./wineTypes");
const wineFamilies = require("./wineFamilies");
const bottleTypes = require("./bottleTypes");
const utils = require("./utils");
const defaultPort = process.env.PORT || 4000;

const environment = {
  development: {
    isProduction: false
  },
  production: {
    isProduction: true
  }
}[process.env.NODE_ENV || "development"];

module.exports = {
  DB: {
    user: process.env.USER,
    password: process.env.PASSWORD,
    host: process.env.HOST,
    database: process.env.DATABASE,
    timeout: 5,
    filename: "gitm-5-11-2017.db",
    tables: {
      WINE: {
        name: "wine"
      },
      BOTTLE: {
        name: "bottle",
        indexes: ["wine_id"]
      },
      TRANSACTION: {
        name: "transaction"
      }
    }
  },
  debug: !process.env.DEBUG,
  PORT: defaultPort,
  DEV_PORT: defaultPort + 1,
  LOGGER_INFO_FILE_PATH: "info-logs.log",
  LOGGER_ERROR_FILE_PATH: "error-logs.log",
  DIST: "dist",
  UPLOADS_PERM: "uploads",
  UPLOADS_TMP_DIRECTORY: "temp_uploads/",
  BUNDLE_FILENAME: "bundle.js",
  ROUTES: {
    PICTURE: "/picture",
    WINE: "/wine",
    FAVORITE: "/favorite",
    BOTTLE: "/bottle"
  },
  PICTURE_UPLOAD: {
    FILE_NAME: "winePicture",
    THUMBNAIL: {
      WIDTH: 300,
      HEIGHT: 400,
      QUALITY: 30
    }
  },
  API_BASE_URL: "/api",
  API_URL:
    process.env.NODE_ENV === "production"
      ? ""
      : `http://localhost:${defaultPort}`,
  cellar,
  wineTypes,
  wineFamilies,
  utils,
  bottleTypes,
  environment
};
