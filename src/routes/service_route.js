const serviceController = require("../controlers/service_controller");
const verifyToken = require("../middlewares/jwt_middle");

module.exports = function (router) {
  router.post("/api/service/get-page", serviceController.getPage);

  router.get("/api/service/get-all", serviceController.getAll);

  router.get("/api/service/get-detail/:serviceId", serviceController.getById);

  router.post("/api/service/create", verifyToken, serviceController.create);

  router.put("/api/service/update", verifyToken, serviceController.update);

  router.delete(
    "/api/service/delete/:serviceId",
    verifyToken,
    serviceController.delete
  );
};
