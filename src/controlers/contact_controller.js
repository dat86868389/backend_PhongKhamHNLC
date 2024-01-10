const contactModel = require("../models/contact_model");

exports.getPage = function (req, res) {
  contactModel.getPage(req.body, function (data) {
    res.status(200).send(data);
  });
};

exports.getAll = function (req, res) {
  contactModel.getAll(function (data) {
    res.status(200).send(data);
  });
};

exports.getById = function (req, res) {
  contactModel.getById(req.params.contactId, function (data) {
    res.status(200).send(data);
  });
};

exports.create = function (req, res) {
  const contactDto = req.body;
  contactModel.create(contactDto, function (data) {
    res.status(200).send(data);
  });
};

exports.delete = function (req, res) {
  contactModel.delete(req.params.contactId, function (data) {
    res.status(200).send(data);
  });
};
