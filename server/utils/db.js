const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const config = require('../../config');

const db = new sqlite3.Database(path.resolve(__dirname, config.DB.filename));

if (!process.env.NODE_ENV) {
  db.on('trace', (message) => {
    console.log(message);
  });
}

db.getAsync = function (...args) {
  const that = this;
  return new Promise(function (resolve, reject) {
    that.get(...args, function (err, row) {
      if (err) reject(err);
      else resolve(row);
    });
  });
};

db.allAsync = function (...args) {
  const that = this;
  return new Promise(function (resolve, reject) {
    that.all(...args, function (err, rows) {
      if (err) reject(err);
      else resolve(rows);
    });
  });
};

db.runAsync = function (...args) {
  const that = this;
  return new Promise(function (resolve, reject) {
    that.run(...args, function (err, res) {
      if (err) reject(err);
      else resolve(res);
    });
  });
};

db.insertAsync = function (...args) {
  const that = this;
  return new Promise(function (resolve, reject) {
    that.run(...args, function (err) {
      if (err) reject(err);
      else resolve(this.lastID);
    });
  });
};

db.execAsync = function (...args) {
  const that = this;
  return new Promise(function (resolve, reject) {
    that.exec(...args, function (err, res) {
      if (err) reject(err);
      else resolve(res);
    });
  });
};

module.exports = {
  db,
};
