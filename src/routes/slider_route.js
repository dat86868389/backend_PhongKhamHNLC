const sliderController = require("../controlers/slider_controller");
const verifyToken = require("../middlewares/jwt_middle");

module.exports = function (router) {
  router.get("/api/slider/get-all", verifyToken, sliderController.getAll);

  router.put("/api/slider/update", verifyToken, sliderController.update);
};
