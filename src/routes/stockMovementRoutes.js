const express = require("express");
const router = express.Router();

const stockMovementController = require("../controllers/stockMovementController");

router.get("/", stockMovementController.getAll);

router.get("/product/:productId", stockMovementController.getByProduct);

router.get("/:id", stockMovementController.getById);

router.post("/", stockMovementController.create);

module.exports = router;