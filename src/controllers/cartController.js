import CartService from "../services/cartServices.js";
import Controllers from "./classController.js";

const CS = new CartService();

export default class CartController extends Controllers {
    constructor() {
        super(CS);
    }
    
    /**
     * Busca el carrito por su cid que es ingresado por params, luego lo retorna con su informacion de producto completa
     * @param {Object} req - HTTP Request
     * @param {Object} res - HTTP Response
     */
    async searchCart(req, res) {
        try {
            const cid = req.params.cid;
            const cart = await CS.searchAndPopulateCart(cid);
            res.status(200).json(cart);
        } catch (error) {
            console.error("Error al buscar productos: ", error.message);
            res.status(500).json({ message: "Error al buscar productos en los carritos" });
        }
    };
    
    /*
        Crea un nuevo carrito con la siguiente estructura:
    {
        Id : Number/String, (autogenerado, asegurando que no se repetirán los ids en el archivo)
        products: Array que contendrá objetos que representen cada producto
    }
    */
    /**
     * Crea un carrito con los datos obtenidos por body
     * @param {Object} req - HTTP Request
     * @param {Object} res - HTTP Response
     */
    async createCart(req, res) {
        try {
            const { products } = req.body;
            const cart = await CS.createCartService({products});
            res.status(201).json({ message: "carrito agregado correctamente", payload: cart });
        } catch (error) {
            console.error("Error al agregar carrito: ", error.message);
            res.status(500).json({ message: "Error al agregar carrito a los carritos" });
        }
    };
    
    /*
        Agrega el producto al arreglo “products” del carrito seleccionado, agregándose como un objeto bajo el siguiente formato:
        
        product: SÓLO DEBE CONTENER EL ID DEL PRODUCTO (Es crucial que no agregues el producto completo)
        quantity: debe contener el número de ejemplares de dicho producto. El producto, de momento, se agregará de uno en uno.
    
        Además, si un producto ya existente intenta agregarse al producto, incrementar el campo quantity de dicho producto. 
    */
    /**
     * Agrega un producto al carrito con el cid y pid pasados por params.
     * @param {Object} req - HTTP Request
     * @param {Object} res - HTTP Response
     */
    async addProductToCart(req, res) {
        try {
            const { cid, pid } = req.params;
            const product = await CS.addProductToCart(cid, pid);
            
            res.status(201).json({
                message: "Producto agregado al carrito correctamente",
                payload: product,
            });
        } catch (error) {
            console.error("Error desde router al agregar producto al carrito: ", error.message);
            res.status(500).json({ message: "No se pudo agregar el producto al carrito" });
        }
    };
    
    // Deberá eliminar del carrito el producto seleccionado.
    /**
     * Agrega un producto al carrito con el cid y pid pasados por params.
     * @param {Object} req - HTTP Request
     * @param {Object} res - HTTP Response
     */
    async deleteProductFromCart(req, res) {
        try {
            const { cid, pid } = req.params;
            const productInCart = await CS.searchProductInCart(cid, pid);
            if (!productInCart) {
                return res.status(200).json({ message: "El producto que se intenta eliminar no existe en el carrito."})
            }
            const payload = await CS.removeProductFromCart(cid, pid);
            return res.status(200).json({ message: "Producto eliminado del carrito correctamente", payload });
        } catch (error) {
            console.error("Error al eliminar producto del carrito:", error.message);
            res.status(500).json({ message: "Error al eliminar el producto del carrito" });
        }
    };
    
    // Deberá actualizar todos los productos del carrito con un arreglo de productos.
    /**
     * Agrega un producto al carrito con el cid y pid pasados por params.
     * @param {Object} req - HTTP Request
     * @param {Object} res - HTTP Response
     */
    async updateAllProductsFromCart(req, res) {
        try {
            const { cid } = req.params;
            const { products } = req.body;
            const payload = await CS.changeAllProductsFromCart(cid, products);
            if (payload.modifiedCount === 0) {
                return res.status(200).json({ message: "Producto no modificado. Puede que ya se haya cambiado anteriormente" });
            }
            return res.status(200).json({ message: "El carrito fue actualizado correctamente", payload });
        } catch (error) {
            console.error(`Error al intentar actualizar los productos del carrito: ${error.message}`);
            return res.status(500).json({ error: "Error al intentar actualizar los productos del carrito" });
        }
    };
    
    // Deberá poder actualizar SÓLO la cantidad de ejemplares del producto por cualquier cantidad pasada desde req.body
    /**
     * Agrega un producto al carrito con el cid y pid pasados por params.
     * @param {Object} req - HTTP Request
     * @param {Object} res - HTTP Response
     */
    async updateProductQuantityFormCart(req, res) {
        try {
            const { cid, pid } = req.params;
            const { quantity } = req.body;
            const payload = await CS.changeProductQuantityFromCart(cid, pid, quantity);
            if (!payload || payload?.status === 404) {
                return res.status(404).json({
                    error: `Producto no modificado. ${payload.message}`,
                });
            }
            if (payload?.status === 200) {
                return res.status(200).json({error: `Producto no modificado. ${payload.message}`})
            }
            return res.status(200).json({
                message: `La cantidad del producto con el id = ${pid} en el carrito con el id = ${cid} fue actualizada correctamente`,
                payload,
            });
        } catch (error) {
            console.log(error.status);
            console.error(`Error al intentar actualizar la cantidad del producto en el carrito especificado: ${error.message}`);
            if (error.status === 404) {
                return res.status(404).json({ error: "El producto que se intenta actualizar no existe en el carrito"})
            }
            return res.status(500).json({ error: `Error al intentar actualizar la cantidad del producto en el carrito especificado` });
        }
    };
    
    // Deberá eliminar todos los productos del carrito
    /**
     * Agrega un producto al carrito con el cid y pid pasados por params.
     * @param {Object} req - HTTP Request
     * @param {Object} res - HTTP Response
     */
    async deleteAllProductsFromCart(req, res) {
        try {
            const { cid } = req.params;
            const payload = await CS.emptyCart(cid);
            return res.status(200).json({ message: "Carrito vaciado correctamente", payload });
        } catch (error) {
            console.error("Error al intentar vaciar el carrito: ", error);
            return res.status(500).json({ error: "Error al intentar vaciar el carrito" });
        }
    };    
}

