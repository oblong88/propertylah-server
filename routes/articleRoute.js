const express = require("express");

const ArticleController = require("../controllers/articleController");

const articleController = new ArticleController();

const router = express.Router();

router
  .route("/")
  .post(articleController.createArticle)
  .get(articleController.getAllArticles);

router
  .route("/:id")
  .get(articleController.getArticle)
  .patch(articleController.updateArticle)
  .delete(articleController.deleteArticle);

module.exports = router;
