import express from "express";
const router = express.Router();

import { deleteProduct, updateProduct, createProduct, findProductById, listAllProducts } from "../controllers/productController.js";
import { validateCreateProduct, validateProductPid, validateUpdateProduct } from "../middlewares/validators/product.validator.js";
import { errorVerifier } from "../middlewares/validators/validationMiddlewares.js";

// Lista de todos los productos
router.get("/", listAllProducts);

// Muestra el producto con el pid proporcionado
router.get("/:pid", validateProductPid, errorVerifier, findProductById);

// Crea un nuevo producto
router.post("/", validateCreateProduct, errorVerifier, createProduct);

// Toma un producto y actualiza los campos enviados desde body sin modificar el id
router.put("/:pid", validateProductPid, validateUpdateProduct, errorVerifier, updateProduct);

// Elimina el producto con el pid indicado
router.delete("/:pid", validateProductPid, errorVerifier, deleteProduct);

export default router;
