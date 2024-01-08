const uploadSingle = require("../common/uploadSingle");
const uploadArray = require("../common/uploadArray");
const Upload = {};

Upload.uploadThumbnail = function (req, res, result) {
  uploadSingle.single("thumnnail_blog")(req, res, function (err) {
    if (err) {
      result("faild");
    }

    result("success");
  });
};

Upload.uploadSlides = function (req, res, result) {
  uploadArray.array("slide")(req, res, function (err) {
    if (err) {
      result("faild");
    }

    result("success");
  });
};

module.exports = Upload;
