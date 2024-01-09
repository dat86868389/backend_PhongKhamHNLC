const sliderModel = require("../models/slider_model");

exports.getAll = function (req, res) {
  sliderModel.getAll(function (data) {
    res.status(200).send(data);
  });
};

exports.update = function (req, res) {
  const sliderDto = req.body;
  sliderModel.update(sliderDto, function (data) {
    res.status(200).send(data);
  });
};
