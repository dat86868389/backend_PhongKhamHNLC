const categoryModel = require("../models/category_model");

exports.getAll = function (req, res) {
  categoryModel.getAll(function (data) {
    res.status(200).send(data);
  });
};
