import { prodDao } from "../dao/persistence.js";

export default class ProductServices {
    constructor() {}

    /**
     * Busca un producto con el pid y lo retorna.
     * @param {String} pid - Id del producto
     * @returns {Object} - Producto 
     */
    async getProductById (pid) {
        try {
            return await prodDao.get(pid);
        } catch (error) {
            console.error(error);
        }
    }

    async getAllProducts () {
        try {
            prodDao.getAll()
        } catch (error) {
            console.error(error);
            return null;
        }
    }


}
