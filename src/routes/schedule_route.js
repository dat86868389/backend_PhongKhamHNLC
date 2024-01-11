const scheduleController = require("../controlers/schedule_controller");
const verifyToken = require("../middlewares/jwt_middle");

module.exports = function (router) {
  router.post("/api/schedule/get-page", scheduleController.getPage);

  router.post("/api/schedule/create", scheduleController.create);

  router.delete(
    "/api/schedule/delete/:scheduleId",
    verifyToken,
    scheduleController.delete
  );
};
