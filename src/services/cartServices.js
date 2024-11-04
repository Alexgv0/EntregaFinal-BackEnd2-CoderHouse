import { cartDao } from "./../dao/persistence.js"

export default class CartServices {
    constructor() {}

    /**
     * Busca un carrito con el cid y lo retorna.
     * @param {String} cid - Id del carrito
     * @returns {Object} - Carrito
     */
    async getCartById(cid) {
        try {
            return await cartDao.get(cid);
        } catch (error) {
            console.error(error);
            return null;
        }
    };

    /**
     * Busca un carrito por su cid y lo devuelve monstrando tambien sus productos con populate
     * @param {String} cid - Id de mongo del carrito
     * @returns {Object} - Carrito con sus productos
     */
    async searchAndPopulateCart(cid) {
        try {
            return await cartDao.getProducts(cid);
        } catch (error) {
            console.error(error);
            return null;
        }
    };
    
    /**
     * Crea un carrito en la base de datos con la informacion de data.
     * @param {Object} data - Informacion necesaria para crear el carrito
     * @returns - Informacion de creacion del carrito
     */
    async createCartService(data) {
        try {
            return await cartDao.create({ data });
        } catch (error) {
            console.error(error);
            return null;
        }
    };

    /**
     * Dados un cid y un pid devuelve el producto si esta dentro de el carrito
     * @param {String} cid - Id del carrito
     * @param {String} pid - Id del producto
     * @returns {Object} - Producto dentro del carrito
     */
    async searchProductInCart(cid, pid) {
        try {
            const cart = this.getCartById(cid);
            return cart.products.find(item => item.product.equals(pid));
        } catch (error) {
            console.error(error);
            return null;
        }
    };

    /**
     * Dado un cid y un pid se agrega un producto al carrito o se aumenta su cantidad en uno.
     * @param {String} cid - Id del carrito
     * @param {String} pid - Id del producto
     * @returns {Object} - Producto del carrito
     */
    async addProductToCart(cid, pid) {
        try {
            const change = await cartDao.addProduct(cid, pid);
            if (change.modifiedCount === 0) {
                throw new Error("No se pudo agregar el producto al carrito");
            } else return await cartDao.getProduct(cid, pid);
        } catch (error) {
            console.error(error);
            return null;
        }
    };

    /**
     * Dados un cid y pid remueve el producto del carrito o le baja la cantidad en uno.
     * @param {String} cid - Id de carrito
     * @param {String} pid - Id de producto
     * @returns {Object} - Respuesta de la eliminacion
     */
    async removeProductFromCart(cid, pid) {
        try {
            return await cartDao.removeProduct(cid, pid);
        } catch (error) {
            console.error(error);
            return null;
        }
    };

    /**
     * Dado un cid y un products intercambia todos los productos del carrito por los productos del arreglo products.
     * @param {String} cid - Id del carrito
     * @param {Array} products - Arreglo de productos
     * @returns {Object} - Respuesta de la actualizacion
     */
    async changeAllProductsFromCart(cid, products) {
        try {
            return await cartDao.updateProducts(cid,products);
        } catch (error) {
            console.error(error);
            return null;
        }
    };

    /**
     * Dados un cid y un pid la cantidad del producto con pid dentro del carrito con cid se cambia por el valor de quantity.
     * @param {String} cid - Id del carrito
     * @param {String} pid - Id del producto
     * @param {Number} quantity - Cantidad de el producto
     * @returns {Object} - Respuesta de la actualizacion
     */
    async changeProductQuantityFromCart(cid, pid, quantity) {
        try {
            return await cartDao.updateProductQuantity(cid, pid, quantity);
        } catch (error) {
            console.error(error);
            return null;
        }
    };

    /**
     * Dado un cid se intercambia el arreglo de productos de el carrito con ese id por un arreglo vacio.
     * @param {String} cid - Id del carrito
     * @returns {Object} - Respuesta de la actualizacion
     */
    async emptyCart(cid) {
        try {
            return await cartDao.clearCart(cid);
        } catch (error) {
            console.error(error);
            return null;
        }
    }
}
