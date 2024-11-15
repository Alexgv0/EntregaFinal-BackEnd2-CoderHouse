import { cartDao } from "../daos/persistence.js";

export default class CartsRepository {
    constructor() {
        this.dao = cartDao;
    }

    /**
     * Cambia el array productos del carrito por el array productos
     * @param {String} cartId - Id del carrito
     * @param {Array} products - Productos
     * @returns {Object} - Informacion del cambio
     */
    async updateProducts(cartId, products) {
        try {
            return await this.dao.update({ _id: cartId }, { $set: { products } }, true);
        } catch (error) {
            throw new Error(error.message);
        }
    }
}
