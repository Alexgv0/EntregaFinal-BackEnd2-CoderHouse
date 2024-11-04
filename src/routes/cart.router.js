import express from "express";
const router = express.Router();

import { addProductToCart, createCart, deleteAllProductsFromCart, deleteProductFromCart, searchCart, updateAllProductsFromCart, updateProductQuantityFormCart } from "../controllers/cartController.js";
import { validateCartCid, validateCartProducts } from "./../middlewares/validators/cart.validator.js";
import { validateProductPid } from "./../middlewares/validators/product.validator.js";
import validateFields from "./../middlewares/validateFields.js"

// Lista los productos que pertenezcan al carrito con el parámetro cid proporcionados
router.get("/:cid", validateCartCid, validateFields, searchCart);

// Crea un nuevo carrito con un Id y un arreglo de productos:
router.post("/", validateCartProducts, validateFields, createCart);

// Agrega el producto al arreglo “products” del carrito seleccionado
router.post("/:cid/product/:pid", validateCartCid, validateProductPid, validateFields, addProductToCart);

// Deberá eliminar del carrito el producto seleccionado.
router.delete("/:cid/products/:pid", validateCartCid, validateProductPid, validateFields, deleteProductFromCart);

// Deberá actualizar todos los productos del carrito con un arreglo de productos.
router.put("/:cid", validateCartCid, validateCartProducts, validateFields, updateAllProductsFromCart);

// Deberá poder actualizar SÓLO la cantidad de ejemplares del producto por cualquier cantidad pasada desde req.body
router.put("/:cid/products/:pid", validateCartCid, validateProductPid, validateFields, updateProductQuantityFormCart);

// Deberá eliminar todos los productos del carrito
router.delete("/:cid", validateCartCid, validateFields, deleteAllProductsFromCart);

export default router;
