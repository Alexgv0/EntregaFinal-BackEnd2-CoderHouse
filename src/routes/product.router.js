import express from "express";
const router = express.Router();

import ProductController from "../controllers/productController.js";
import { validateCreateProduct, validateProductPidAndExistence, validateUpdateProduct } from "../middlewares/validators/product.validator.js";
import { validateFields } from "./../middlewares/validateFields.js";

const productController = new ProductController();
const { deleteProduct, updateProduct, createProduct, findProductById, listAllProducts } = productController;

// Lista de todos los productos
router.get("/", listAllProducts);

// Muestra el producto con el pid proporcionado
router.get("/:pid", validateProductPidAndExistence, validateFields, findProductById);

// Crea un nuevo producto
router.post("/", validateCreateProduct, validateFields, createProduct);

// Toma un producto y actualiza los campos enviados desde body sin modificar el id
router.put("/:pid", validateProductPidAndExistence, validateUpdateProduct, validateFields, updateProduct);

// Elimina el producto con el pid indicado
router.delete("/:pid", validateProductPidAndExistence, validateFields, deleteProduct);

export default router;
