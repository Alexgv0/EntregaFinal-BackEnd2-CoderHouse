import express from "express";
const router = express.Router();

import CartController from "../controllers/cartController.js";
import { validateCartCidAndExistence, validateCartProducts } from "./../middlewares/validators/cart.validator.js";
import { validateProductPidAndExistence } from "./../middlewares/validators/product.validator.js";
import validateFields from "./../middlewares/validateFields.js"

const cartController = new CartController();
const { searchCart, createCart, addProductToCart, deleteProductFromCart, updateAllProductsFromCart, updateProductQuantityFormCart, deleteAllProductsFromCart } = cartController;

// Lista los productos que pertenezcan al carrito con el parámetro cid proporcionados
router.get("/:cid", validateCartCidAndExistence, validateFields, searchCart);

// Crea un nuevo carrito con un Id y un arreglo de productos:
router.post("/", validateCartProducts, validateFields, createCart);

// Agrega el producto al arreglo “products” del carrito seleccionado
router.post("/:cid/product/:pid", validateCartCidAndExistence, validateProductPidAndExistence, validateFields, addProductToCart);

// Deberá eliminar del carrito el producto seleccionado.
router.delete("/:cid/products/:pid", validateCartCidAndExistence, validateProductPidAndExistence, validateFields, deleteProductFromCart);

// Deberá actualizar todos los productos del carrito con un arreglo de productos.
router.put("/:cid", validateCartCidAndExistence, validateCartProducts, validateFields, updateAllProductsFromCart);

// Deberá poder actualizar SÓLO la cantidad de ejemplares del producto por cualquier cantidad pasada desde req.body
router.put("/:cid/products/:pid", validateCartCidAndExistence, validateProductPidAndExistence, validateFields, updateProductQuantityFormCart);

// Deberá eliminar todos los productos del carrito
router.delete("/:cid", validateCartCidAndExistence, validateFields, deleteAllProductsFromCart);

export default router;
