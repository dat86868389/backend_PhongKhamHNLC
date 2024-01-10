const database = require("../common/mysql");

const doctor = function (_doctor) {};

doctor.getPage = function (request, callback) {
  const sqlBody = `where Doctor.IsDeleted = 0 and (? = '' or Doctor.Name like concat('%', ? ,'%')) `;
  const sqlPage =
    `select Doctor.Id, Doctor.Name, Doctor.ImagePath, Doctor.Position, DATE_FORMAT(Doctor.CreatedAt, "%d-%m-%Y") as CreatedAt, User.Name as CreatedBy ` +
    `from Doctor join User on Doctor.CreatedBy = User.Id ` +
    sqlBody +
    `order by Doctor.Id desc ` +
    `limit ? offset ?`;
  const sqlCount = `select count(1) as total from Doctor ` + sqlBody;
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

doctor.getAll = function (callback) {
  const sql =
    "select Id, Name, ImagePath, Position from Doctor where IsDeleted = 0 order by Id desc";
  database.query(sql, [], function (err, result) {
    if (err) {
      callback(err);
      return;
    }
    callback(result);
  });
};

doctor.getById = function (doctorId, callback) {
  const sql =
    "select Id, Name, ImagePath, Position from Doctor where IsDeleted = 0 and Id = ?";
  database.query(sql, [doctorId], function (err, result) {
    if (err) {
      callback(err);
      return;
    }
    callback(result[0]);
  });
};

doctor.create = function (doctorDto, callback) {
  const sql =
    "insert into Doctor(Name, ImagePath, Position, CreatedBy) values (?, ?, ?, ?)";
  database.query(
    sql,
    [
      doctorDto.Name,
      doctorDto.ImagePath,
      doctorDto.Position,
      doctorDto.CurrentUserId,
    ],
    function (err, result) {
      if (err) {
        callback(err);
        return;
      }
      callback({ Id: result.insertId });
    }
  );
};

doctor.update = function (doctorDto, callback) {
  const sql =
    "update Doctor " +
    "set Name = ?, ImagePath = ?, Position = ?, UpdatedBy = ?, UpdatedAt = CURRENT_TIMESTAMP " +
    "where Id = ?";
  database.query(
    sql,
    [
      doctorDto.Name,
      doctorDto.ImagePath,
      doctorDto.Position,
      doctorDto.CurrentUserId,
      doctorDto.Id,
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

doctor.delete = function (doctorId, callback) {
  const sqlDelete = "update Doctor set IsDeleted = 1 where Id = ?";
  database.query(sqlDelete, [doctorId], function (err, resultUpdate) {
    if (err) {
      callback(err);
      return;
    }
    callback(resultUpdate);
  });
};

module.exports = doctor;
