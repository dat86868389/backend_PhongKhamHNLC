const database = require("../common/mysql");

const category = function (_category) {};

category.getPage = function (request, callback) {
  const sqlBody = `where Category.IsDeleted = 0 and (? = '' or Category.Name like concat('%', ? ,'%')) `;
  const sqlPage =
    `select Category.Id, Category.Name, DATE_FORMAT(Category.CreatedAt, "%d-%m-%Y") as CreatedAt, User.Name as CreatedBy ` +
    `from Category join User on Category.CreatedBy = User.Id ` +
    sqlBody +
    `order by Category.Id desc ` +
    `limit ? offset ?`;
  const sqlCount = `select count(1) as total from Category ` + sqlBody;
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

category.getAll = function (callback) {
  const sql =
    "select Id, Name from Category where IsDeleted = 0 order by Id desc";
  database.query(sql, [], function (err, result) {
    if (err) {
      callback(err);
      return;
    }
    callback(result);
  });
};

category.getById = function (categoryId, callback) {
  const sql = "select Id, Name from Category where IsDeleted = 0 and Id = ?";
  database.query(sql, [categoryId], function (err, result) {
    if (err) {
      callback(err);
      return;
    }
    callback(result[0]);
  });
};

category.create = function (categoryDto, callback) {
  const sql = "insert into Category(Name, CreatedBy) values (?, ?)";
  database.query(
    sql,
    [categoryDto.Name, categoryDto.CurrentUserId],
    function (err, result) {
      if (err) {
        callback(err);
        return;
      }
      callback({ Id: result.insertId });
    }
  );
};

category.update = function (categoryDto, callback) {
  const sql =
    "update Category " +
    "set Name = ?, UpdatedBy = ?, UpdatedAt = CURRENT_TIMESTAMP " +
    "where Id = ?";
  database.query(
    sql,
    [categoryDto.Name, categoryDto.CurrentUserId, categoryDto.Id],
    function (err, result) {
      if (err) {
        callback(err);
        return;
      }
      callback(result);
    }
  );
};

category.delete = function (categoryId, callback) {
  const sqlCheck = "select Id from Post where CategoryId = ?";
  database.query(sqlCheck, [categoryId], function (err, result) {
    if (err) {
      callback(err);
      return;
    }
    // Đã có bài viết thuộc thể loại này thì không cho xoá
    if (result.length != 0) {
      callback(false);
    } else {
      // Chưa có bài viết thuộc thể loại này thì cho xoá
      const sqlDelete = "update Category set IsDeleted = 1 where Id = ?";
      database.query(sqlDelete, [categoryId], function (err, resultUpdate) {
        if (err) {
          callback(err);
          return;
        }
        callback(true);
      });
    }
  });
};

module.exports = category;
