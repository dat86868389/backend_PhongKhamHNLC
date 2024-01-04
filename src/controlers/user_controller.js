const userModel = require("../models/user_model");

exports.login = function (req, res) {
  const loginRequest = req.body;
  userModel.getUserByAccount(loginRequest, function (data) {
    res.status(200).send(data);
  });
};
