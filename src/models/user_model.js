const database = require("../common/mysql");
const hashPassword = require("../common/password_util");

const user = function (_user) {
  this.id = _user.id;
  this.name = _user.name;
  this.account = _user.account;
};

user.getUserByAccount = function (loginRequest, callback) {
  const sql = "select * from User Where Account = ? and HashPassword = ? and IsDeleted = 0";
  database.query(
    sql,
    [loginRequest.account, hashPassword(loginRequest.password)],
    function (err, result) {
      if (err) {
        callback(err);
        return;
      }
      callback(result);
    }
  );
};

module.exports = user;
