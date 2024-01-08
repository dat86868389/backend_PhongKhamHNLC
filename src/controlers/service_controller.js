const serviceModel = require("../models/service_model");

exports.getPage = function (req, res) {
  serviceModel.getPage(req.body, function (data) {
    res.status(200).send(data);
  });
};

exports.getAll = function (req, res) {
  serviceModel.getAll(function (data) {
    res.status(200).send(data);
  });
};

exports.getById = function (req, res) {
  serviceModel.getById(req.params.serviceId, function (data) {
    res.status(200).send(data);
  });
};

exports.create = function (req, res) {
  const serviceDto = req.body;
  serviceDto.CurrentUserId = req.currentUser.userId;
  serviceModel.create(serviceDto, function (data) {
    res.status(200).send(data);
  });
};

exports.update = function (req, res) {
  const serviceDto = req.body;
  serviceDto.CurrentUserId = req.currentUser.userId;
  serviceModel.update(serviceDto, function (data) {
    res.status(200).send(data);
  });
};

exports.delete = function (req, res) {
  serviceModel.delete(req.params.serviceId, function (data) {
    res.status(200).send(data);
  });
};
