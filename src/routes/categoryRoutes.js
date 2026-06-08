const express = require("express");
const router = express.Router();



const categoryController = require("../controllers/categoryController");

// GET /categories
router.get("/", categoryController.getAll);

// GET /categories/:id
router.get("/:id", categoryController.getById);

// POST /categories
router.post("/", categoryController.create);

// PUT /categories/:id
router.put("/:id", categoryController.update);

// DELETE /categories/:id
router.delete("/:id", categoryController.remove);

module.exports = router;