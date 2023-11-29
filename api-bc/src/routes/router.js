const router = require("express").Router();

const usersRouter = require("./users");
const articlesRouter = require("./articles");
const authRouter = require("./auth");

router.use("/", usersRouter);
router.use("/", articlesRouter);
router.use("/", authRouter);

module.exports = router;