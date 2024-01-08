const upload = require("../common/upload");
const Upload = {};

Upload.uploadThumbnail = function (req, res, result) {
  upload.single("thumnnail_blog")(req, res, function (err) {
    if (err) {
      result("faild");
    }
    
    result("success");
  });
};

module.exports = Upload;
