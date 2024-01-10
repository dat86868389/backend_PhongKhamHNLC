const database = require("../common/mysql");

const contact = function (_contact) {};

contact.getPage = function (request, callback) {
  const sqlBody = `where Contact.IsDeleted = 0 and (? = '' or Contact.Name like concat('%', ? ,'%')) `;
  const sqlPage =
    `select Contact.Id, Contact.Name, Contact.Email, Contact.PhoneNumber, Contact.Subject, Contact.Message, DATE_FORMAT(Contact.CreatedAt, "%d-%m-%Y") as CreatedAt ` +
    `from Contact ` +
    sqlBody +
    `order by Contact.Id desc ` +
    `limit ? offset ?`;
  const sqlCount = `select count(1) as total from Contact ` + sqlBody;
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

contact.getAll = function (callback) {
  const sql =
    "select Id, Name, Email, PhoneNumber, Subject, Message from Contact where IsDeleted = 0 order by Id desc";
  database.query(sql, [], function (err, result) {
    if (err) {
      callback(err);
      return;
    }
    callback(result);
  });
};

contact.getById = function (contactId, callback) {
  const sql =
    "select Id, Name, Email, PhoneNumber, Subject, Message from Contact where IsDeleted = 0 and Id = ?";
  database.query(sql, [contactId], function (err, result) {
    if (err) {
      callback(err);
      return;
    }
    callback(result[0]);
  });
};

contact.create = function (contactDto, callback) {
  const sql =
    "insert into Contact(Name, Email, PhoneNumber, Subject, Message) values (?, ?, ?, ?, ?)";
  database.query(
    sql,
    [
      contactDto.Name,
      contactDto.Email,
      contactDto.PhoneNumber,
      contactDto.Subject,
      contactDto.Message,
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

contact.delete = function (contactId, callback) {
  const sqlDelete = "Update Contact set IsDeleted = 1 where Id = ?";
  database.query(sqlDelete, [contactId], function (err, resultUpdate) {
    if (err) {
      callback(err);
      return;
    }
    callback(resultUpdate);
  });
};

module.exports = contact;
