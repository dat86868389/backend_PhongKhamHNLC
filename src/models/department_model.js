const database = require("../common/mysql");

const department = function (_department) {};

department.getPage = function (request, callback) {
  const sqlBody = `where Department.IsDeleted = 0 and (? = '' or Department.Name like concat('%', ? ,'%')) `;
  const sqlPage =
    `select Department.Id, Department.Name, Department.Description, DATE_FORMAT(Department.CreatedAt, "%d-%m-%Y") as CreatedAt, User.Name as CreatedBy ` +
    `from Department join User on Department.CreatedBy = User.Id ` +
    sqlBody +
    `order by Department.Id desc ` +
    `limit ? offset ?`;
  const sqlCount = `select count(1) as total from Department ` + sqlBody;
  database.query(
    sqlPage,
    [
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
        [request.KeySearch, request.KeySearch],
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

department.getAll = function (callback) {
  const sql =
    "select Id, Name, Description from Department where IsDeleted = 0 order by Id desc";
  database.query(sql, [], function (err, result) {
    if (err) {
      callback([]);
      return;
    }
    callback(result);
  });
};

department.getById = function (departmentId, callback) {
  const sql =
    "select Id, Name, Description from Department where IsDeleted = 0 and Id = ?";
  database.query(sql, [departmentId], function (err, result) {
    if (err) {
      callback([]);
      return;
    }
    callback(result[0]);
  });
};

department.create = function (departmentDto, callback) {
  const sql =
    "insert into Department(Name, Description, CreatedBy) values (?, ?, ?)";
  database.query(
    sql,
    [
      departmentDto.Name,
      departmentDto.Description,
      departmentDto.CurrentUserId,
    ],
    function (err, result) {
      if (err) {
        callback([]);
        return;
      }
      callback({ Id: result.insertId });
    }
  );
};

department.update = function (departmentDto, callback) {
  const sql =
    "update Department " +
    "set Name = ?, Description = ?, UpdatedBy = ?, UpdatedAt = CURRENT_TIMESTAMP " +
    "where Id = ?";
  database.query(
    sql,
    [
      departmentDto.Name,
      departmentDto.Description,
      departmentDto.CurrentUserId,
      departmentDto.Id,
    ],
    function (err, result) {
      if (err) {
        callback([]);
        return;
      }
      callback(result);
    }
  );
};

department.delete = function (departmentId, callback) {
  const sql = "update Department set IsDeleted = 1 where Id = ?";
  database.query(sql, [departmentId], function (err, result) {
    if (err) {
      callback([]);
      return;
    }
    callback(result);
  });
};

module.exports = department;
