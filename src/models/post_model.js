const database = require("../common/mysql");

const post = function (_post) {};

post.getPage = function (request, callback) {
  const sqlBody = `where post.IsDeleted = 0 and (? = '' or post.Name like concat('%', ? ,'%')) `;
  const sqlPage =
    `select post.Id, post.Name, DATE_FORMAT(post.CreatedAt, "%d-%m-%Y") as CreatedAt, User.Name as CreatedBy ` +
    `from post join User on post.CreatedBy = User.Id ` +
    sqlBody +
    `order by post.Id desc ` +
    `limit ? offset ?`;
  const sqlCount = `select count(1) as total from post ` + sqlBody;
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

post.getAll = function (callback) {
  const sql = "select Id, Name from post where IsDeleted = 0 order by Id desc";
  database.query(sql, [], function (err, result) {
    if (err) {
      callback(err);
      return;
    }
    callback(result);
  });
};

post.getById = function (postId, callback) {
  const sql = "select Id, Name from post where IsDeleted = 0 and Id = ?";
  database.query(sql, [postId], function (err, result) {
    if (err) {
      callback(err);
      return;
    }
    callback(result[0]);
  });
};

post.create = function (postDto, callback) {
  const sql =
    "insert into Post(Name, Title, Description, Content, ImagePath, CategoryId, CreatedBy) values (?, ?, ?, ?, ?, ?, ?)";
  database.query(
    sql,
    [
      postDto.Name,
      postDto.Title,
      postDto.Description,
      postDto.Content,
      postDto.ImagePath,
      postDto.CategoryId,
      postDto.CurrentUserId,
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

post.update = function (postDto, callback) {
  const sql =
    "update Post " +
    "set Name = ?, Title = ?, Description = ?, Content = ?, ImagePath = ?, CategoryId = ?, UpdatedBy = ?, UpdatedAt = CURRENT_TIMESTAMP " +
    "where Id = ?";
  database.query(
    sql,
    [
      postDto.Name,
      postDto.Title,
      postDto.Description,
      postDto.Content,
      postDto.ImagePath,
      postDto.CategoryId,
      postDto.CurrentUserId,
      postDto.Id,
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

post.delete = function (postId, callback) {
  const sql = "update Post set IsDeleted = 1 where Id = ?";
  database.query(sql, [postId], function (err, result) {
    if (err) {
      callback(err);
      return;
    }
    callback(result);
  });
};

module.exports = post;
