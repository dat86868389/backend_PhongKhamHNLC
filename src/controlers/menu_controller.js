const menuModel = require("../models/menu_model");

exports.getAllByCategory = function (req, res) {
  const categoryCode = req.params.categoryCode;
  menuModel.getAllByCategory(categoryCode, function (data) {
    res.status(200).send(data);
  });
};
