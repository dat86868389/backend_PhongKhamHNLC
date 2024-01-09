const categoryModel = require("../models/category_model");

exports.getPage = function (req, res) {
  categoryModel.getPage(req.body, function (data) {
    res.status(200).send(data);
  });
};

exports.getAll = function (req, res) {
  categoryModel.getAll(function (data) {
    res.status(200).send(data);
  });
};

exports.getById = function (req, res) {
  categoryModel.getById(req.params.categoryId, function (data) {
    res.status(200).send(data);
  });
};

exports.create = function (req, res) {
  const categoryDto = req.body;
  categoryDto.CurrentUserId = req.currentUser.userId;
  categoryModel.create(categoryDto, function (data) {
    res.status(200).send(data);
  });
};

exports.update = function (req, res) {
  const categoryDto = req.body;
  categoryDto.CurrentUserId = req.currentUser.userId;
  categoryModel.update(categoryDto, function (data) {
    res.status(200).send(data);
  });
};

exports.delete = function (req, res) {
  categoryModel.delete(req.params.categoryId, function (data) {
    if (data == true) {
      res.status(200).send({});
    } else {
      res.status(400).send({ Message: "Can not delete this category" });
    }
  });
};
