const postModel = require("../models/post_model");

exports.getPage = function (req, res) {
  postModel.getPage(req.body, function (data) {
    res.status(200).send(data);
  });
};

exports.getAll = function (req, res) {
  postModel.getAll(function (data) {
    res.status(200).send(data);
  });
};

exports.getById = function (req, res) {
  postModel.getById(req.params.postId, function (data) {
    res.status(200).send(data);
  });
};

exports.create = function (req, res) {
  const postDto = req.body;
  postDto.CurrentUserId = req.currentUser.userId;
  postModel.create(postDto, function (data) {
    res.status(200).send(data);
  });
};

exports.update = function (req, res) {
  const postDto = req.body;
  postDto.CurrentUserId = req.currentUser.userId;
  postModel.update(postDto, function (data) {
    res.status(200).send(data);
  });
};

exports.delete = function (req, res) {
  postModel.delete(req.params.postId, function (data) {
    res.status(200).send(data);
  });
};
