function enhanceDB(db) {
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

  return db;
}

module.exports = {
  enhanceDB,
};
