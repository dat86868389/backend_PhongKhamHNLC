const database = require("../common/mysql");

const category = function (_category) {
  this.id = _category.id;
  this.name = _category.name;
  this.code = _category.code;
};

category.getAll = function (callback) {
  const sql = "Select * from Category";
  database.query(sql, [], function (err, result) {
    if (err) {
      callback("server error");
      return;
    }
    callback(result);
  });
};

module.exports = category;
