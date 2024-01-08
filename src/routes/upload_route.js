const uploadController = require("../controlers/upload_controller");
const upload = require("../common/upload");
module.exports = function (router) {
  router.post(
    "/api/upload/thumbnail",
    uploadController.upload
  );
};
