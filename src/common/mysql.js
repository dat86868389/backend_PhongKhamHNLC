const mysql = require('mysql2');
var connection = mysql.createConnection({
  host: "localhost",
  user: "phongkham_admin",
  password: "zxcVbnm123@@#qweasdghj",
  database: "phongkham_dkhnlc",
});


connection.connect(function (err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }

  console.log("MYSQL connected as id " + connection.threadId);
});

module.exports = connection;