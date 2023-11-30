const router = require("express").Router();

const usersRouter = require("./users");
const articlesRouter = require("./articles");
const authRouter = require("./auth");

router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  
router.use("/", usersRouter);
router.use("/", articlesRouter);
router.use("/", authRouter);

module.exports = router;