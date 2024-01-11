const userController = require("../controlers/user_controller");
const verifyToken = require("../middlewares/jwt_middle");

module.exports = function (router) {
  router.post("/api/user/login", userController.login);

  router.post("/api/user/get-page", verifyToken, userController.getPage);

  router.get("/api/user/get-info", verifyToken, userController.getInfo);

  router.get(
    "/api/user/get-detail/:userId",
    verifyToken,
    userController.getById
  );

  router.post("/api/user/create", verifyToken, userController.create);
};
