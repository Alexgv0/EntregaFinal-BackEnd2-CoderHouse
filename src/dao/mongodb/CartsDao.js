import MongoDao from "./MongoDao.js";
import { Cart } from "../../models/mongo/Carts.js";

export class CartsDaoMongo extends MongoDao {
    constructor() {
        super(Cart);
    }
    async createCart() {
        try {
            return await this.model.create({
                products: [],
            });
        } catch (error) {
            throw new Error(error);
        }
    }

    async getProducts(cartId) {
        try {
            return await this.model.findById(cartId).populate("products.product");
        } catch (error) {
            throw new Error(error);
        }
    }

    async getProduct(cartId, prodId) {
        try {
            return await this.model.findOne({
                _id: cartId,
                products: { $elemMatch: { product: prodId } },
            });
        } catch (error) {
            throw new Error(error);
        }
    }

    /**
     * 
     * @param {String} cartId - Id del carrito
     * @param {String} prodId - Id del producto
     * @returns {Object}
     */
    async addProduct(cartId, prodId) {
        try {
            const cartProduct = await this.getProduct(cartId, prodId);
            if (cartProduct) {
                return await this.model.findOneAndUpdate(
                    { _id: cartId, "products.product": prodId },
                    {
                        $set: {
                            "products.$.quantity": cartProduct.products[0].quantity + 1,
                        },
                    },
                    { new: true }
                );
            } else {
                return await this.model.findByIdAndUpdate(cartId, { $push: { products: { product: prodId } } }, { new: true });
            }
        } catch (error) {
            throw new Error(error);
        }
    }

    /**
     * Cambia el array productos del carrito por el array productos
     * @param {String} cartId - Id del carrito
     * @param {Array} products - Productos
     * @returns {Object} - Informacion del cambio
     */
    async updateProducts(cartId, products) {
        try {
            return await Cart.updateOne(
                { _id: cartId },
                { $set: { products } },
                { new: true }
            );
        } catch (error) {
            throw new Error(error);
        }
    }

    /**
     * Elimina un producto del carrito
     * @param {String} cartId - Id de carrito
     * @param {String} prodId - Id de producto
     * @returns {Object} -Informacion del cambio
     */
    async removeProduct(cartId, prodId) {
        try {
            return await this.model.findOneAndUpdate({ _id: cartId }, { $pull: { products: { product: prodId } } }, { new: true });
        } catch (error) {
            throw new Error(error);
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
            return await this.model.findOneAndUpdate(
                { _id: cartId, "products.product": prodId },
                { $set: { "products.$.quantity": quantity } },
                { new: true }
            );
        } catch (error) {
            throw new Error(error);
        }
    }

    /**
     * Vacia el carrito cambiando el arreglo de productos con uno vacio
     * @param {String} cartId 
     * @returns {Object} - Informacion del cambio
     */
    async clearCart(cartId) {
        try {
            return await this.model.findByIdAndUpdate(cartId, { $set: { products: [] } }, { new: true });
        } catch (error) {
            throw new Error(error);
        }
    }
}
