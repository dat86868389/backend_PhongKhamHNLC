const database = require("../common/mysql");
const hashPassword = require("../common/password_util");

const user = function (_user) {
  this.id = _user.id;
  this.name = _user.name;
  this.account = _user.account;
};

user.getUserByAccount = function (loginRequest, callback) {
  const sql =
    "select * from User Where Account = ? and HashPassword = ? and Status = 1 and IsDeleted = 0";
  database.query(
    sql,
    [loginRequest.account, hashPassword(loginRequest.password)],
    function (err, result) {
      if (err) {
        callback([]);
        return;
      }
      callback(result);
    }
  );
};

user.getPage = function (request, callback) {
  const sqlBody = `where u.IsDeleted = 0 and (? = '' or u.Name like concat('%', ? ,'%') or u.Account like concat('%', ? ,'%')) `;
  const sqlPage =
    `select u.Id, u.Name, u.Account, DATE_FORMAT(u.CreatedAt, '%d-%m-%Y') as CreatedAt, r.Id as RoleId, r.Name as RoleName ` +
    "from `User` u join `Role` r on u.RoleId = r.Id " +
    sqlBody +
    `order by u.Id desc ` +
    `limit ? offset ?`;
  const sqlCount = "select count(1) as total from `User` u " + sqlBody;
  database.query(
    sqlPage,
    [
      request.KeySearch,
      request.KeySearch,
      request.KeySearch,
      request.Size,
      (request.Page - 1) * request.Size,
    ],
    function (err, resultPage) {
      if (err) {
        callback([]);
        return;
      }
      // Gọi truy vấn count
      database.query(
        sqlCount,
        [request.KeySearch, request.KeySearch, request.KeySearch],
        function (err, resultCount) {
          if (err) {
            callback([]);
            return;
          }
          callback({ TotalRecord: resultCount[0].total, Data: resultPage });
        }
      );
    }
  );
};

user.getById = function (userId, callback) {
  const sql =
    "select u.Id, u.Name, u.Account, DATE_FORMAT(u.CreatedAt, '%d-%m-%Y') as CreatedAt, r.Id as RoleId, r.Name as RoleName from `User` u join `Role` r on u.RoleId = r.Id where u.IsDeleted = 0 and u.Id = ?";
  database.query(sql, [userId], function (err, result) {
    if (err) {
      callback([]);
      return;
    }
    callback(result[0]);
  });
};

user.create = function (userDto, callback) {
  const sqlCheck = "select Id from `User` where Account = ?";
  database.query(sqlCheck, [userDto.Account], function (err, result) {
    if (err) {
      callback([]);
      return;
    }
    // Trùng tên tài khoản
    if (result.length != 0) {
      callback({ Id: null });
    } else {
      // Không bị trùng tên tài khoản từ
      const sqlInsert =
        "insert into `User`(Name, RoleId, Account, HashPassword, Status) values (?, ?, ?, ?, ?)";
      database.query(
        sqlInsert,
        [
          userDto.Name,
          1, //Role Admin
          userDto.Account,
          hashPassword(userDto.HashPassword),
          1,
        ],
        function (err, resultInsert) {
          if (err) {
            callback([]);
            return;
          }
          callback({ Id: resultInsert.insertId });
        }
      );
    }
  });
};

module.exports = user;
