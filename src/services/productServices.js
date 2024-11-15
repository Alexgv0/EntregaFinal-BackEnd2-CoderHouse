import Services from "./classServices.js";
import persistence from "../daos/persistence.js";
import productsRepository from "../repositories/ProductsRepository.js";

const prodRepository = new productsRepository();
const prodDao = persistence.prodDao;

export default class ProductServices extends Services {
    constructor() {
        super(prodDao);
    }

    /**
     * Valida si los campos pasados son los correctos para el modelo
     * @param {Object} body - Objeto body de HTTP Request
     * @returns {Object} - Objeto de campos
     */
    validateChanges(body) {
        const allowedFields = ["title", "description", "code", "price", "status", "stock", "category", "thumbnails"];
        const validFields = {};

        allowedFields.forEach(field => {
            if (body[field] !== undefined) {
                validFields[field] = body[field];
            }
        });

        return validFields;
    }

    /**
     * Modifica un producto de la base de datos.
     * @param {String} pid - Id del producto
     * @param {Object} changes - Cambios a realizar
     * @returns {Object|null} - Informacion de modificacion o null
     */
    async updateProduct(pid, changes) {
        return await prodDao.update({ _id: pid }, { $set: changes }, true);
    }
}
