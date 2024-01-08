const categoryController = require("../controlers/category_controller");
const verifyToken = require("../middlewares/jwt_middle");

module.exports = function (router) {
  router.post(
    "/api/category/get-page",
    verifyToken,
    categoryController.getPage
  );

  router.get(
    "/api/category/get-all",
    verifyToken,
    categoryController.getAll
  );

  router.get(
    "/api/category/get-detail/:categoryId",
    verifyToken,
    categoryController.getById
  );

  router.post(
    "/api/category/create",
    verifyToken,
    categoryController.create
  );

  router.put(
    "/api/category/update",
    verifyToken,
    categoryController.update
  );

  router.delete(
    "/api/category/delete/:categoryId",
    verifyToken,
    categoryController.delete
  );
};
