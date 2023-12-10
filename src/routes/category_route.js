const categoryController = require("../controlers/category_controller");

module.exports = function(router){
    router.get("/api/category/get-all", categoryController.getAll);
}