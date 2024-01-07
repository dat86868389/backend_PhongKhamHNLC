const menuController = require("../controlers/menu_controller");
const verifyToken = require("../middlewares/jwt_middle");

module.exports = function (router) {
  router.get(
    "/api/menu/get-all-by-category/:categoryCode",
    verifyToken,
    menuController.getAllByCategory
  );
};
