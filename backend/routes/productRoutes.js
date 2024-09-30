const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

router.post("/", productController.createProduct);
router.get("/", productController.getAllProduct);
router.put("/:id", productController.updateOneProduct);
router.delete("/", productController.deleteAllProduct);
router.delete("/:id", productController.deleteOneProduct);

module.exports = router;
