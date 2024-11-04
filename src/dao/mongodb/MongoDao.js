export default class MongoDao {
    constructor(model) {
        this.model = model;
    }

    /**
     * Busca un elemento por su ID y lo devuelve
     * @param {String} ID - ID del elemento.
     * @returns {Object|null} - Elemento si se encuentra, o null si no es encontrado.
    */
   async get(id) {
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
     * @param {String} ID - ID del elemento.
     * @returns {Object|null} - Informacion del cambio realizado.
    */
   async update(id, obj) {
       try {
           return await this.model.findByIdAndUpdate({ _id: id }, { obj }, { new: true });
        } catch (error) {
            throw new Error(error.message);
        }
    }
    
    /**
     * Elimina un elemento buscado por su ID
     * @param {String} ID - ID del elemento.
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
