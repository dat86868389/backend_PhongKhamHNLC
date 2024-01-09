const express = require("express");
const app = express();
const port = 3017;
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
app.locals.SECRET_KEY = "8OsZyFK0gP";

// Cookie Parser
app.use(cookieParser("PJVQuYspNUZGJeo"));

// Body Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// CORS
const allowlist = ["http://localhost:3000"];
const corsOptionsDelegate = function (req, callback) {
  var corsOptions;
  if (allowlist.indexOf(req.header("Origin")) !== -1) {
    corsOptions = { origin: true }; // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false }; // disable CORS for this request
  }
  callback(null, corsOptions); // callback expects two parameters: error and options
};
app.use(cors(corsOptionsDelegate));

// make "public" folder is public
// get any files in folder public
// ex: http://localhost:3017/thumbnail/abc.png
app.use(express.static('public'))

// Apis
require("./src/routes/category_route")(app);
require("./src/routes/user_route")(app);
require("./src/routes/service_route")(app);
require("./src/routes/department_route")(app);
require("./src/routes/upload_route")(app);
require("./src/routes/post_route")(app);

app.listen(port, () => {
  console.log(`App listening on http://localhost:${port}`);
});
