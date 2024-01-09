const uploadController = require("../controlers/upload_controller");
const upload = require("../common/uploadSingle");
const verifyToken = require("../middlewares/jwt_middle");

module.exports = function (router) {
  router.post(
    "/api/upload/thumbnail",
    verifyToken,
    uploadController.uploadThumbnail
  );

  router.post("/api/upload/slides", verifyToken, uploadController.uploadSlides);
};
