const { Router } = require("express");
const {
  createProduct,
  getProducts,
  getProductById,
  updateProductById,
  deleteProductById,
} = require("../controllers/products.controllers");

const { verifyToken, isModerator, isAdmin } = require("../middlewares/authjwt");

const router = Router();

router.post("/products", verifyToken, isModerator, isAdmin, createProduct);
router.get("/products", getProducts);
router.get("/products/:productId", getProductById);
router.put("/products/:productId", verifyToken, isAdmin, updateProductById);
router.delete("/products/:productId", verifyToken, isAdmin, deleteProductById);

module.exports = router;
