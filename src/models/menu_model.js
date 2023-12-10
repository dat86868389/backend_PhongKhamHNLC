const database = require("../common/mysql");

const menu = function (_menu) {
  this.id = _menu.id;
  this.name = _menu.name;
  this.categoryId = _menu.categoryId;
  this.description = _menu.description;
  this.link = _menu.link;
  this.target = _menu.target;
  this.index = _menu.index;
  this.parentId = _menu.parentId;
};

menu.getAllByCategory = function (categoryCode, callback) {
  const sql =
    "select Menu.* from Menu join Category on " +
    "Menu.CategoryId = Category.Id where Menu.IsDeleted = 0 and Category.Code = ?";
  database.query(sql, [categoryCode], function (err, result) {
    if (err) {
      callback(err);
      return;
    }
    callback(result);
  });
};

module.exports = menu;
