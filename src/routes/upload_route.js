const uploadController = require("../controlers/upload_controller");
const upload = require("../common/uploadSingle");

module.exports = function (router) {
  router.post("/api/upload/thumbnail", uploadController.uploadThumbnail);

  router.post("/api/upload/slides", uploadController.uploadSlides);
};
