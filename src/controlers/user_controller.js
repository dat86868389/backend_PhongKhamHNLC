const userModel = require("../models/user_model");
const jwt = require("jsonwebtoken");

exports.login = function (req, res) {
  const loginRequest = req.body;
  userModel.getUserByAccount(loginRequest, function (data) {
    // Sai thông tin đăng nhập
    if (data.length == 0) {
      res.status(400).send({ Message: "Unauthorized" });
    } else {
      // Đúng thông tin đăng nhập
      const userLogin = data[0];
      const token = jwt.sign(
        {
          userId: userLogin.Id,
          name: userLogin.Name,
          avatar: userLogin.Avatar,
        },
        req.app.locals.SECRET_KEY,
        { expiresIn: "10h" }
      );
      res.status(200).send({ Token: token });
    }
  });
};
