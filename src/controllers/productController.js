import Controllers from "./classController.js";
import ProductServices from "./../services/productServices.js";

const PS = new ProductServices();

export default class ProductController extends Controllers {
    constructor() {
        super(PS);
    }

    /**
     * Lista de todos los productos
     * @param {Object} req - HTTP Request
     * @param {Object} res - HTTP Response
     * @returns {Object} - HTTP Response
     */
    async listAllProducts(req, res) {
        try {
            const products = await PS.getAll();
            if (!products || products.length === 0) {
                return res.status(404).json({ message: "No se encontraron productos" });
            }
            res.status(200).json(products);
        } catch (error) {
            console.error("Error al listar productos: ", error);
            return res.status(500).json({ message: "Error al listar productos" });
        }
    }

    /**
     * Muestra el producto con el pid proporcionado
     * @param {Object} req - HTTP Request
     * @param {Object} res - HTTP Response
     * @returns {Object} - HTTP Response
     */
    async findProductById(req, res) {
        try {
            const pid = req.params.pid;
            const product = await PS.getById(pid);
            return res.status(200).json(product);
        } catch (error) {
            console.error("Error al buscar producto: ", error);
            return res.status(500).json({ message: "Error al buscar producto" });
        }
    }

    /* 
        Agrega un nuevo producto con los campos: 
    {
        id: Number/String, (autogenerado, asegurando que no se repetirán los ids en el archivo)
        title : String,
        description : String,
        code : String,
        price : Number,
        status : Boolean,
        stock : Number,
        category : String,
        thumbnails : Array de Strings (que contengan las rutas donde están almacenadas las imágenes referentes a dicho producto)
    }
    */
    /**
     * Crea un producto con los datos proporcionados
     * @param {Object} req - HTTP Request
     * @param {Object} res - HTTP Response
     * @returns {Object} - HTTP Response
     */
    async createProduct(req, res) {
        try {
            const { title, description, code, price, status, stock, category, thumbnails } = req.body;
            const newProduct = await PS.create({ title, description, code, price, status, stock, category, thumbnails });
            return res.status(201).json({ message: "Producto agregado a la lista de productos satisfactoriamente.", payload: newProduct });
        } catch (error) {
            console.error("Error desde router al guardar el producto: ", error);
            if (error.code == "11000") {
                return res.status(400).json({ error: "Error: El valor de 'code' ya existe en la base de datos" });
            }
            return res.status(500).json({ error: "Error al agregar el producto" });
        }
    }

    /**
     * Toma un producto y actualiza los campos enviados desde body sin modificar el id
     * @param {Object} req - HTTP Request
     * @param {Object} res - HTTP Response
     * @returns {Object} - HTTP Response
     */
    async updateProduct(req, res) {
        try {
            const pid = req.params.pid;
            const body = req.body;
            const changes = PS.validateChanges(body);
            const payload = await PS.updateProduct(pid, changes);

            if (!payload) {
                console.error(`Error al actualizar producto: producto con id ${pid} no encontrado.`);
                return res.status(404).json({ message: `Producto con id ${pid} no encontrado.` });
            }

            if (payload?.modifiedCount === 0) {
                return res.status(200).json({ message: "No se ha podido modificar el producto. Tal vez ya tenia estos valores" });
            }

            return res.status(200).json({ message: "Producto actualizado exitosamente.", changes, payload });
        } catch (error) {
            console.error("Error desde el router al actualizar producto: ", error);
            return res.status(500).json({ message: "Error al actualizar el producto" });
        }
    }

    /**
     * Elimina el producto con el pid indicado
     * @param {Object} req - HTTP Request
     * @param {Object} res - HTTP Response
     * @returns {Object} - HTTP Response
     */
    async deleteProduct(req, res) {
        try {
            const pid = req.params.pid;
            const payload = await PS.delete(pid);
            if (payload.deletedCount === 0) {
                return res.status(404).json({ message: "Producto no encontrado" });
            }
            res.status(200).json({ message: "Producto eliminado exitosamente.", payload });
        } catch (error) {
            console.error("Error al eliminar producto: ", error);
            return res.status(500).json({ message: "Error al eliminar el producto." });
        }
    }
}
