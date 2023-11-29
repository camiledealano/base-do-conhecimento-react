const router = require("express").Router();

const usersController = require("../controllers/authController");

router.route("/authenticate").post((req,res) => usersController.authenticate(req,res));

module.exports = router;