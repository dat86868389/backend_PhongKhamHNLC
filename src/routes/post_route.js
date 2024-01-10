const postController = require("../controlers/post_controller");
const verifyToken = require("../middlewares/jwt_middle");

module.exports = function (router) {
  router.post("/api/post/get-page", postController.getPage);

  router.get("/api/post/get-all", postController.getAll);

  router.get("/api/post/get-detail/:postId", postController.getById);

  router.post("/api/post/create", verifyToken, postController.create);

  router.put("/api/post/update", verifyToken, postController.update);

  router.delete("/api/post/delete/:postId", verifyToken, postController.delete);
};
