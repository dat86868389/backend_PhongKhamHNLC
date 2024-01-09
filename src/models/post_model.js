const database = require("../common/mysql");

const post = function (_post) {};

post.getPage = function (request, callback) {
  if (request.CategoryId == undefined) {
    request.CategoryId = -1;
  }
  let sqlBody = `where Post.IsDeleted = 0 and (? = '' or Post.Title like concat('%', ? ,'%')) and (? = -1 or Post.CategoryId = ?) `;
  const sqlPage =
    `select Post.Id, Post.Title, Post.Description, ` +
    `Post.Content, Post.ImagePath, Post.CategoryId, ` +
    `Category.Name as CategoryName, Post.CreatedBy as AuthorId, ` +
    `User.Name as AuthorName, DATE_FORMAT(Post.CreatedAt, "%d-%m-%Y") as CreatedAt ` +
    `from Post join Category on Post.CategoryId = Category.Id join User on Post.CreatedBy = User.Id ` +
    sqlBody +
    `order by Post.Id desc ` +
    `limit ? offset ?`;
  const sqlCount =
    `select count(1) as total from Post join Category on Post.CategoryId = Category.Id ` +
    sqlBody;
  database.query(
    sqlPage,
    [
      request.KeySearch,
      request.KeySearch,
      request.CategoryId,
      request.CategoryId,
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
        [
          request.KeySearch,
          request.KeySearch,
          request.CategoryId,
          request.CategoryId,
        ],
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
  const sql =
    `select Post.Id, Post.Title, Post.Description, ` +
    `Post.Content, Post.ImagePath, Post.CategoryId, ` +
    `Category.Name as CategoryName, Post.CreatedBy as AuthorId, ` +
    `User.Name as AuthorName, DATE_FORMAT(Post.CreatedAt, "%d-%m-%Y") as CreatedAt ` +
    `from Post join Category on Post.CategoryId = Category.Id join User on Post.CreatedBy = User.Id ` +
    `where Post.IsDeleted = 0 Order by Post.Id desc`;
  database.query(sql, [], function (err, result) {
    if (err) {
      callback(err);
      return;
    }
    callback(result);
  });
};

post.getById = function (postId, callback) {
  const sql =
    `select Post.Id, Post.Title, Post.Description, ` +
    `Post.Content, Post.ImagePath, Post.CategoryId, ` +
    `Category.Name as CategoryName, Post.CreatedBy as AuthorId, ` +
    `User.Name as AuthorName, DATE_FORMAT(Post.CreatedAt, "%d-%m-%Y") as CreatedAt ` +
    `from Post join Category on Post.CategoryId = Category.Id join User on Post.CreatedBy = User.Id ` +
    `where Post.Id = ?`;
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
    "insert into Post(Title, Description, Content, ImagePath, CategoryId, CreatedBy) values (?, ?, ?, ?, ?, ?)";
  database.query(
    sql,
    [
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
    "set Title = ?, Description = ?, Content = ?, ImagePath = ?, CategoryId = ?, UpdatedBy = ?, UpdatedAt = CURRENT_TIMESTAMP " +
    "where Id = ?";
  database.query(
    sql,
    [
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
