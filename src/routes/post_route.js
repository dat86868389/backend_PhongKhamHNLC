const postController = require("../controlers/post_controller");
const verifyToken = require("../middlewares/jwt_middle");

module.exports = function (router) {
  router.post(
    "/api/post/get-page",
    verifyToken,
    postController.getPage
  );

  router.get(
    "/api/post/get-all",
    verifyToken,
    postController.getAll
  );

  router.get(
    "/api/post/get-detail/:postId",
    verifyToken,
    postController.getById
  );

  router.post(
    "/api/post/create",
    verifyToken,
    postController.create
  );

  router.put(
    "/api/post/update",
    verifyToken,
    postController.update
  );

  router.delete(
    "/api/post/delete/:postId",
    verifyToken,
    postController.delete
  );
};
