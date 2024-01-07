const jwt = require("jsonwebtoken");

const verifyToken = function (req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token) {
    jwt.verify(token, req.app.locals.SECRET_KEY, (err, decoded) => {
      if (err) {
        res.status(401).json({ Message: "Unauthorized" });
      } else {
        req.currentUser = decoded;
        next();
      }
    });
  } else {
    res.status(401).json({ Message: "Unauthorized" });
  }
};

module.exports = verifyToken;
