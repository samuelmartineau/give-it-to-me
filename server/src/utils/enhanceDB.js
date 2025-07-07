function enhanceDB(db) {
  db.getAsync = function (...args) {
    const that = this;
    return new Promise((resolve, reject) => {
      that.get(...args, (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });
  };

  db.allAsync = function (...args) {
    const that = this;
    return new Promise((resolve, reject) => {
      that.all(...args, (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  };

  db.runAsync = function (...args) {
    const that = this;
    return new Promise((resolve, reject) => {
      that.run(...args, (err, res) => {
        if (err) reject(err);
        else resolve(res);
      });
    });
  };

  db.insertAsync = function (...args) {
    const that = this;
    return new Promise((resolve, reject) => {
      that.run(...args, function (err) {
        if (err) reject(err);
        else resolve(this.lastID);
      });
    });
  };

  db.execAsync = function (...args) {
    const that = this;
    return new Promise((resolve, reject) => {
      that.exec(...args, (err, res) => {
        if (err) reject(err);
        else resolve(res);
      });
    });
  };

  return db;
}

export { enhanceDB };
