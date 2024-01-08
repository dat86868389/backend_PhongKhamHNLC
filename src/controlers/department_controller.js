const departmentModel = require("../models/department_model");

exports.getPage = function (req, res) {
  departmentModel.getPage(req.body, function (data) {
    res.status(200).send(data);
  });
};

exports.getAll = function (req, res) {
  departmentModel.getAll(function (data) {
    res.status(200).send(data);
  });
};

exports.getById = function (req, res) {
  departmentModel.getById(req.params.departmentId, function (data) {
    res.status(200).send(data);
  });
};

exports.create = function (req, res) {
  const departmentDto = req.body;
  departmentDto.CurrentUserId = req.currentUser.userId;
  departmentModel.create(departmentDto, function (data) {
    res.status(200).send(data);
  });
};

exports.update = function (req, res) {
  const departmentDto = req.body;
  departmentDto.CurrentUserId = req.currentUser.userId;
  departmentModel.update(departmentDto, function (data) {
    res.status(200).send(data);
  });
};

exports.delete = function (req, res) {
  departmentModel.delete(req.params.departmentId, function (data) {
    res.status(200).send(data);
  });
};
