const router = require("express").Router();
const TagController = require("../../../controllers/TagController");

router.get("/", TagController.all)
router.get("/:id", TagController.find)
router.post("/", TagController.create)
router.put("/:id", TagController.update)
router.delete("/:id", TagController.destroy)

module.exports = router;
