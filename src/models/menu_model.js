const database = require("../common/mysql");

const menu = function (_menu) {
  this.id = _menu.id;
  this.name = _menu.name;
};

menu.getMenuById = function(id, callback) {
    const sql = "Select * from Menu where id = ?";
    database.query(sql, [id], function(err, result){
        if (err) {
            callback("server error");
            return;
        }
        callback(result);
    })
}

module.exports = menu;
