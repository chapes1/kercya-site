const router = require("express").Router();
const requireAuth = require("../middlewares/auth");

router.use("/v1", requireAuth, require("./api/v1"));
router.use("/auth", require("./auth"));

module.exports = router;
