const categoryController = require("../controlers/category_controller");
const verifyToken = require("../middlewares/jwt_middle");

module.exports = function (router) {
  router.get("/api/category/get-all", verifyToken, categoryController.getAll);
};
