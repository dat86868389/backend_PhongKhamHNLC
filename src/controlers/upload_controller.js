const uploadModel = require("../models/upload_model");
exports.upload = function(req, res) {
    uploadModel.uploadThumbnail(req,res, function(message){
        if (message === "faild") {
            res.status(400).send("Tải ảnh lên không thành công");
        }
        else {
            res.status(200).send("Tải ảnh lên thành công");
        }
    });
}