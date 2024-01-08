const departmentController = require("../controlers/department_controller");
const verifyToken = require("../middlewares/jwt_middle");

module.exports = function (router) {
  router.post(
    "/api/department/get-page",
    verifyToken,
    departmentController.getPage
  );

  router.get(
    "/api/department/get-all",
    verifyToken,
    departmentController.getAll
  );

  router.get(
    "/api/department/get-detail/:departmentId",
    verifyToken,
    departmentController.getById
  );

  router.post(
    "/api/department/create",
    verifyToken,
    departmentController.create
  );

  router.put(
    "/api/department/update",
    verifyToken,
    departmentController.update
  );

  router.delete(
    "/api/department/delete/:departmentId",
    verifyToken,
    departmentController.delete
  );
};
