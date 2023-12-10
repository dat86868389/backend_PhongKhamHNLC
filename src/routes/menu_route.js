const menuController = require("../controlers/menu_controller");
module.exports = function(router){
    router.get("/api/get_menu", menuController.getMenuById);
}