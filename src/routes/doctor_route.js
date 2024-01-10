const doctorController = require("../controlers/doctor_controller");
const verifyToken = require("../middlewares/jwt_middle");

module.exports = function (router) {
  router.post("/api/doctor/get-page", doctorController.getPage);

  router.get("/api/doctor/get-all", doctorController.getAll);

  router.get("/api/doctor/get-detail/:doctorId", doctorController.getById);

  router.post("/api/doctor/create", verifyToken, doctorController.create);

  router.put("/api/doctor/update", verifyToken, doctorController.update);

  router.delete(
    "/api/doctor/delete/:doctorId",
    verifyToken,
    doctorController.delete
  );
};
