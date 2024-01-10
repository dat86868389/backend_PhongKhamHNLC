const doctorModel = require("../models/doctor_model");

exports.getPage = function (req, res) {
  doctorModel.getPage(req.body, function (data) {
    res.status(200).send(data);
  });
};

exports.getAll = function (req, res) {
  doctorModel.getAll(function (data) {
    res.status(200).send(data);
  });
};

exports.getById = function (req, res) {
  doctorModel.getById(req.params.doctorId, function (data) {
    res.status(200).send(data);
  });
};

exports.create = function (req, res) {
  const doctorDto = req.body;
  doctorDto.CurrentUserId = req.currentUser.userId;
  doctorModel.create(doctorDto, function (data) {
    res.status(200).send(data);
  });
};

exports.update = function (req, res) {
  const doctorDto = req.body;
  doctorDto.CurrentUserId = req.currentUser.userId;
  doctorModel.update(doctorDto, function (data) {
    res.status(200).send(data);
  });
};

exports.delete = function (req, res) {
  doctorModel.delete(req.params.doctorId, function (data) {
    res.status(200).send(data);
  });
};
