export default class MongoDao {
    constructor(model) {
        this.model = model;
    }

    /**
     * Busca un elemento por su ID y lo devuelve
     * @param {Object} cond - Condiciones de busqueda.
     * @returns {Array} - Array de elementos encontrados.
    */
   async get(cond) {
       try {
           return await this.model.find(cond);
        } catch (error) {
            throw new Error(error.message);
        }
    }

    /**
     * Busca un elemento por su ID y lo devuelve
     * @param {String} Id - Id del elemento.
     * @returns {Object|null} - Elemento si se encuentra, o null si no es encontrado.
    */
    async getById(id) {
        try {
            return await this.model.findById(id);
         } catch (error) {
             throw new Error(error.message);
         }
     }
    
    /**
     * Crea un elemento con sus datos
     * @param {Object} data - Datos del elemento.
     * @returns {Object|null} - Informacion del elemento creado.
    */
   async create(data) {
       try {
           return await this.model.create(data);
        } catch (error) {
            throw new Error(error.message);
        }
    }
    
    /**
     * Modifica un elemento buscado por su ID
     * @param {String} id - Id del elemento.
     * @param {Object} obj - Objeto de modificaciones
     * @param {Boolean} newItem - Opcion de devolver el item nuevo
     * @returns {Object|null} - Informacion del cambio realizado.
    */
   async update(conditions, obj, newItem = true) {
       try {
           return await this.model.updateOne(conditions, obj, { new: newItem });
        } catch (error) {
            throw new Error(error.message);
        }
    }
    
    /**
     * Elimina un elemento buscado por su ID
     * @param {String} id - Id del elemento.
     * @returns {Object} - Informacion del cambio realizado.
    */
   async delete(id) {
       try {
           return await this.model.findByIdAndDelete(id);
        } catch (error) {
            throw new Error(error.message);
        }
    }

    /**
     * Devuelve todos los elementos
     * @returns {Array} - Arreglo con los elementos, o vacio si no se encuentra ninguno.
     */
    async getAll() {
        try {
            return await this.model.find({});
        } catch (error) {
            throw new Error(error.message);
        }
    }
}
