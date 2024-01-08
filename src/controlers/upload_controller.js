const uploadModel = require("../models/upload_model");
exports.uploadThumbnail = function (req, res) {
  uploadModel.uploadThumbnail(req, res, function (message) {
    if (message === "faild") {
      res.status(400).send("Tải ảnh lên không thành công");
    } else {
      res.status(200).send(`thumbnail/${res.req.file.filename}`);
    }
  });
};

exports.uploadSlides = function (req, res) {
  uploadModel.uploadSlides(req, res, function (message) {
    if (message === "faild") {
      res.status(400).send("Tải ảnh lên không thành công");
    } else {
        let filesUploaded = []
        req.files.map((e, i)=> {
            filesUploaded.push({name: `slides/${e.filename}`, index: i});
        })
      res.status(200).send(filesUploaded);
    }
  });
};
