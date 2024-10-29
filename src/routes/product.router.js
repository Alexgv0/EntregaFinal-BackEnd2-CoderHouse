import express from "express";
const router = express.Router();

import { deleteProduct, updateProduct, createProduct, findProductById, listAllProducts } from "../controllers/productController.js";
import { validateCreateProduct, validatePid, validateUpdateProduct } from "../middlewares/validationMiddlewares.js";

// Lista de todos los productos
router.get("/", listAllProducts);

// Muestra el producto con el pid proporcionado
router.get("/:pid", validatePid, findProductById);

// Crea un nuevo producto
router.post("/", validateCreateProduct, createProduct);

// Toma un producto y actualiza los campos enviados desde body sin modificar el id
router.put("/:pid", validatePid, validateUpdateProduct, updateProduct);

// Elimina el producto con el pid indicado
router.delete("/:pid", validatePid, deleteProduct);

export default router;
