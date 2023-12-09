var mysql = require("mysql");
var connection = mysql.createConnection({
  host: "localhost",
  user: "admin_phongkhamhnlc",
  password: "lrxz874kfAOuHBLECI5S43x8Buou",
  port: 3306,
  database: "phongkhamhnlc",
});

connection.connect(function (err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }

  console.log("MYSQL connected as id " + connection.threadId);
});

module.exports = connection;