const router = require("express").Router();
const CategoryController = require("../../../controllers/CategoryController");

router.get("/", CategoryController.all)
router.get("/:id", CategoryController.find)
router.post("/", CategoryController.create)
router.put("/:id", CategoryController.update)
router.delete("/:id", CategoryController.destroy)

module.exports = router;
