import MongoDao from "./MongoDao.js";
import { Cart } from "../../models/mongo/Carts.js";

export default class CartsDaoMongo extends MongoDao {
    constructor() {
        super(Cart);
    }

    /**
     * Obtiene los productos del carrito
     * @param {String} cartId - Id del carrito
     * @returns {Array} - Productos del carrito
     */
    async getProducts(cartId) {
        try {
            return await this.model.findById(cartId).populate("products.product");
        } catch (error) {
            throw new Error(error.message);
        }
    }

    /**
     * Obtiene un producto del carrito
     * @param {String} cartId - Id de carrito
     * @param {String} prodId - Id de producto
     * @returns {Object} - Producto del carrito
     */
    async getProduct(cartId, prodId) {
        try {
            return await this.model.findOne({
                _id: cartId,
                products: { $elemMatch: { product: prodId } },
            });
        } catch (error) {
            throw new Error(error.message);
        }
    }

    /**
     * Agrega un producto al carrito o si ya existe le suma 1 a su cantidad
     * @param {String} cartId - Id del carrito
     * @param {String} prodId - Id del producto
     * @returns {Object} - Informacion del cambio
     */
    async addProduct(cartId, prodId) {
        try {
            const cartProduct = await this.getProduct(cartId, prodId);
            if (cartProduct) {
                return await this.model.findOneAndUpdate(
                    { _id: cartId, "products.product": prodId },
                    { $inc: { "products.$.quantity": 1 } },
                    { new: true }
                );
            } else {
                return await this.model.findByIdAndUpdate(cartId, { $push: { products: { product: prodId, quantity: 1} } }, { new: true });
            }
        } catch (error) {
            throw new Error(error.message);
        }
    }

    /**
     * Elimina un producto del carrito
     * @param {String} cartId - Id de carrito
     * @param {String} prodId - Id de producto
     * @returns {Array} - Carrito despues de borrar
     */
    async removeProduct(cartId, prodId) {
        try {
            return await this.update(
                { _id: cartId }, 
                { $pull: { products: { product: prodId } } }, 
                true
            );
        } catch (error) {
            throw new Error(error.message);
        }
    }

    /**
     * Cambia la cantidad de un producto del carrito
     * @param {String} cartId - Id de carrito
     * @param {String } prodId - Id de producto
     * @param {Number} quantity - Cantidad de producto
     * @returns {Object} - Informacion del cambio
     */
    async updateProductQuantity(cartId, prodId, quantity) {
        try {
            return console.log(await this.model.findOneAndUpdate(
                { _id: cartId, "products.product": prodId },
                { $set: { "products.$.quantity": quantity } },
                { new: true }
            ));
        } catch (error) {
            throw new Error(error.message);
        }
    }

    /**
     * Vacia el carrito cambiando el arreglo de productos con uno vacio
     * @param {String} cartId 
     * @returns {Object} - Carrito actual
     */
    async clearCart(cartId) {
        try {
            return await this.model.findByIdAndUpdate(cartId, { $set: { products: [] } }, { new: true });
        } catch (error) {
            throw new Error(error.message);
        }
    }
}
