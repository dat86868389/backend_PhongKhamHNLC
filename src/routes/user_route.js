const userController = require("../controlers/user_controller");

module.exports = function (router) {
  router.post("/api/user/login", userController.login);
};
