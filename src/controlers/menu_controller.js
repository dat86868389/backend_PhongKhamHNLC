const menuModel = require("../models/menu_model");

exports.getMenuById = function(req, res) {
    const {id, name} = req.query;
    const body = req.body;
    const path = req.params;
    menuModel.getMenuById(id, function(data){
        res.status(200).send({result: data});
    })
}