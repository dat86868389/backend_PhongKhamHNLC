const menuController = require("../controlers/menu_controller");
module.exports = function(router){
    router.get("/api/menu/get-all-by-category/:categoryCode", menuController.getAllByCategory);
}