const contactController = require("../controlers/contact_controller");
const verifyToken = require("../middlewares/jwt_middle");

module.exports = function (router) {
  router.post("/api/contact/get-page", contactController.getPage);

  router.get("/api/contact/get-all", contactController.getAll);

  router.get(
    "/api/contact/get-detail/:contactId",
    contactController.getById
  );

  router.post("/api/contact/create", contactController.create);

  router.delete(
    "/api/contact/delete/:contactId",
    verifyToken,
    contactController.delete
  );
};
