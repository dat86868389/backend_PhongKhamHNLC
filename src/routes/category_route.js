const categoryController = require("../controlers/category_controller");
const verifyToken = require("../middlewares/jwt_middle");

module.exports = function (router) {
  router.post("/api/category/get-page", categoryController.getPage);

  router.get("/api/category/get-all", categoryController.getAll);

  router.get(
    "/api/category/get-detail/:categoryId",
    categoryController.getById
  );

  router.post("/api/category/create", verifyToken, categoryController.create);

  router.put("/api/category/update", verifyToken, categoryController.update);

  router.delete(
    "/api/category/delete/:categoryId",
    verifyToken,
    categoryController.delete
  );
};
