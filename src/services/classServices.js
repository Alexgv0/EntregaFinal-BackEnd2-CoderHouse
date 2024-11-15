export default class Services {
    constructor(dao) {
        this.dao = dao;
    }

    /**
     * Devuelve todos los items disponibles para cada dao.
     * @returns {Array0} - Array de productos
     */
    getAll = async () =>{
        try {
            return await this.dao.getAll();
        } catch (error) {
            throw new Error(error.message);
        }
    }

    /**
     * Devuelve el item buscado por id.
     * @param {String} id - Id de item 
     * @returns {Object} - Item
     */
    getById = async (id) => {
        try {
            return await this.dao.getById(id);
        } catch (error) {
            throw new Error(error.message);
        }
    }

    /**
     * Crea un item y lo guadra en la base de datos.
     * @param {Object} obj - Objeto de creacion
     * @returns {Object} - Informacion de creacion
     */
    create = async (obj) => {
        try {
            return await this.dao.create(obj);
        } catch (error) {
            throw new Error(error.message);
        }
    }

    /**
     * Modifica del item de la base de datos.
     * @param {String} id - Id del item
     * @param {Object} obj - Objeto de modificaciones 
     * @returns {Object} - Informacion de la modificacion
     */
    update = async (id, obj) => {
        try {
            return await this.dao.update(id, obj);
        } catch (error) {
            throw new Error(error.message);
        }
    }

    /**
     * Elimina un item de la base de datos.
     * @param {String} id - Id de item
     * @returns {Object} - Informacion de la eliminacion
     */
    delete = async (id) => {
        try {
            return await this.dao.delete(id);
        } catch (error) {
            throw new Error(error.message);
        }
    }
}
