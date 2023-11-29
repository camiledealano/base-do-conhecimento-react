const router = require("express").Router();

const articlesController = require("../controllers/articlesController");
const authMiddlewares =  require("../middlewares/auth")

router.route('/articles').post(authMiddlewares, (req, res) => articlesController.create(req, res));

router.route("/articles").get((req,res) => articlesController.getAll(req,res));

router.route("/articles/:id").get((req,res) => articlesController.get(req,res));

router.route("/articles/:id").delete(authMiddlewares, (req,res) => articlesController.delete(req,res));

router.route("/articles/:id").put(authMiddlewares, (req,res) => articlesController.update(req,res));

router.route("/articles/like/:id").put((req,res) => articlesController.like(req,res));

module.exports = router;