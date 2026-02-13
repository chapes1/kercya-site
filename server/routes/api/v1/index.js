const router = require("express").Router();

router.get("/", (req, res) => {
  res.json({ message: "Welcome to the API!" });
});

router.use('/tags', require("./Tag.js"))
router.use('/categories', require("./Category.js"))
router.use('/', require("./User.js"))

module.exports = router;
