const database = require("../common/mysql");

const service = function (_service) {};

service.getPage = function (request, callback) {
  const sqlBody = `where Service.IsDeleted = 0 and (? = '' or Service.Name like concat('%', ? ,'%')) `;
  const sqlPage =
    `select Service.Id, Service.Name, Service.Description, DATE_FORMAT(Service.CreatedAt, "%d-%m-%Y") as CreatedAt, User.Name as CreatedBy ` +
    `from Service join User on Service.CreatedBy = User.Id ` +
    sqlBody +
    `order by Service.Id desc ` +
    `limit ? offset ?`;
  const sqlCount = `select count(1) as total from Service ` + sqlBody;
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
        callback(err);
        return;
      }
      // Gọi truy vấn count
      database.query(
        sqlCount,
        [request.KeySearch, request.KeySearch],
        function (err, resultCount) {
          if (err) {
            callback(err);
            return;
          }
          callback({ TotalRecord: resultCount[0].total, Data: resultPage });
        }
      );
    }
  );
};

service.getAll = function (callback) {
  const sql =
    "select Id, Name, Description from Service where IsDeleted = 0 order by Id desc";
  database.query(sql, [], function (err, result) {
    if (err) {
      callback(err);
      return;
    }
    callback(result);
  });
};

service.getById = function (serviceId, callback) {
  const sql =
    "select Id, Name, Description from Service where IsDeleted = 0 and Id = ?";
  database.query(sql, [serviceId], function (err, result) {
    if (err) {
      callback(err);
      return;
    }
    callback(result[0]);
  });
};

service.create = function (serviceDto, callback) {
  const sql =
    "insert into Service(Name, Description, CreatedBy) values (?, ?, ?)";
  database.query(
    sql,
    [serviceDto.Name, serviceDto.Description, serviceDto.CurrentUserId],
    function (err, result) {
      if (err) {
        callback(err);
        return;
      }
      callback({ Id: result.insertId });
    }
  );
};

service.update = function (serviceDto, callback) {
  const sql =
    "update Service " +
    "set Name = ?, Description = ?, UpdatedBy = ?, UpdatedAt = CURRENT_TIMESTAMP " +
    "where Id = ?";
  database.query(
    sql,
    [
      serviceDto.Name,
      serviceDto.Description,
      serviceDto.CurrentUserId,
      serviceDto.Id,
    ],
    function (err, result) {
      if (err) {
        callback(err);
        return;
      }
      callback(result);
    }
  );
};

service.delete = function (serviceId, callback) {
  const sql = "update Service set IsDeleted = 1 where Id = ?";
  database.query(sql, [serviceId], function (err, result) {
    if (err) {
      callback(err);
      return;
    }
    callback(result);
  });
};

module.exports = service;
