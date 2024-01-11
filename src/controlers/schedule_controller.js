const scheduleModel = require("../models/schedule_model");

exports.getPage = function (req, res) {
  scheduleModel.getPage(req.body, function (data) {
    res.status(200).send(data);
  });
};

exports.create = function (req, res) {
  const scheduleDto = req.body;
  scheduleModel.create(scheduleDto, function (data) {
    res.status(200).send(data);
  });
};

exports.delete = function (req, res) {
  scheduleModel.delete(req.params.scheduleId, function (data) {
    res.status(200).send(data);
  });
};
