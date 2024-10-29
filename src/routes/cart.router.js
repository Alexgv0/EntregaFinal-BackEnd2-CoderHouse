import express from "express";
const router = express.Router();

import { addProductToCart, createCart, deleteAllProductsFromCart, deleteProductFromCart, searchCart, updateAllProductsFromCart, updateProductQuantityFormCart } from "../controllers/cartController.js";
import { validateCid, validatePid, validateCartProducts, validateCart, validateQuantity} from "../middlewares/validationMiddlewares.js";

// Lista los productos que pertenezcan al carrito con el parámetro cid proporcionados
router.get("/:cid", validateCid, searchCart);

// Crea un nuevo carrito con un Id y un arreglo de productos:
router.post("/", validateCartProducts, createCart);

// Agrega el producto al arreglo “products” del carrito seleccionado
router.post("/:cid/product/:pid", validateCid, validatePid, validateCart, addProductToCart);

// Deberá eliminar del carrito el producto seleccionado.
router.delete("/:cid/products/:pid", validateCid, validatePid, deleteProductFromCart);

// Deberá actualizar todos los productos del carrito con un arreglo de productos.
router.put("/:cid", validateCid, validateCartProducts, updateAllProductsFromCart);

// Deberá poder actualizar SÓLO la cantidad de ejemplares del producto por cualquier cantidad pasada desde req.body
router.put("/:cid/products/:pid", validateCid, validatePid, validateQuantity, updateProductQuantityFormCart);

// Deberá eliminar todos los productos del carrito
router.delete("/:cid", validateCid, deleteAllProductsFromCart);

export default router;
